import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { dbQuery } from "../db";
import { APIError, getFormattedError } from "../utils/errorHandler";
import { MONTHLY_SALARIES_TABLE, YEARLY_SALARIES_TABLE } from "../utils/messages";
const { OK } = StatusCodes;
/**
 * Yearly = 12,00,000
 * Monthly = Yearly/12 -> 1,00,000
 * Basic -> 50% of monthly CTC -> 50,000
 * HRA -> 50% of Basic -> 25,000
 * Other allowances -> Monthly - Basic - HRA -> 25,000
 * PF (Employer) -> 12% of Basic -> 6000
 * PF (Employee) -> 12% of Basic -> 6000
 * Leave Deduction -> (Basic/30) * leavedays -> (50000/30) * 2 = 3333.33
 * Net = Basic+HRA+Other-PF-Leaves
 *       50000+25000+25000-6000-6000-3333 = 90667
 */

async function breakdownSalary(leaves: number, emp_id: number) {
  const { resp, success, error } = await dbQuery(`SELECT * FROM ${YEARLY_SALARIES_TABLE} WHERE emp_id=${emp_id}`);
  if (error) {
    throw new APIError(error);
  }
  let yearlySalary = resp[0];
  const total_sal = parseFloat((yearlySalary.current_salary / 12).toFixed(2));
  const basic = parseFloat((total_sal * (50 / 100)).toFixed(2));
  const hra = parseFloat((basic * (50 / 100)).toFixed(2));
  const allowances = total_sal - basic - hra;
  const employer_pf = parseFloat((basic * (12 / 100)).toFixed(2)); // 12 of basic%
  const employee_pf = parseFloat((basic * (12 / 100)).toFixed(2)); // 12 of basic%
  const deductions = parseFloat(((basic / 30) * leaves).toFixed(2));

  return {
    total_sal,
    basic,
    hra,
    allowances,
    employer_pf,
    employee_pf,
    deductions,
    net: basic + hra + allowances - employer_pf - employee_pf - deductions
  };
}

export async function addSalary(req: Request, res: Response, next: NextFunction) {
  try {
    const { leaves, month } = req.body;
    const { allowances, basic, deductions, employee_pf, employer_pf, hra, net, total_sal } = await breakdownSalary(
      leaves,
      parseInt(req.params.id)
    );
    const formattedDate = `${new Date(month).getFullYear()}-${new Date().getMonth() + 1}-${new Date(month).getDate()}`;
    const { success, error } = await dbQuery(
      `INSERT INTO ${MONTHLY_SALARIES_TABLE} (emp_id, basic, hra, allowances, employer_pf, employee_pf, net, total_sal, leaves, month, deductions) VALUES (${req.params.id},'${basic}','${hra}','${allowances}','${employer_pf}','${employee_pf}','${net}','${total_sal}','${leaves}','${formattedDate}', '${deductions}')`
    );
    if (success) {
      res.status(OK).send({ success });
    } else {
      throw new APIError(error);
    }
  } catch (error) {
    next(getFormattedError(error));
  }
}

export async function getSalaries(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, resp } = await dbQuery(
      `SELECT * FROM ${MONTHLY_SALARIES_TABLE} WHERE emp_id=${req.params.id}`
    );
    if (success) {
      res.status(OK).send({ data: resp });
    } else {
      throw new APIError(error);
    }
  } catch (error) {
    next(getFormattedError(error));
  }
}
