import { NextFunction, Request, Response } from "express";
import { APIError, getFormattedError } from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { dbQuery } from "../db";
import { EMPLOYEE_TABLE, YEARLY_SALARIES_TABLE } from "../utils/messages";

const { OK } = StatusCodes;

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, resp } = await dbQuery(
      `INSERT INTO ${EMPLOYEE_TABLE} (name, designation, experience, ssn) VALUES 
      ('${req.body.name}', '${req.body.designation}', '${req.body.experience}', '${req.body.ssn}')`
    );
    await dbQuery(
      `INSERT INTO ${YEARLY_SALARIES_TABLE} (emp_id, current_salary) VALUES 
      ('${resp.insertId}','${req.body.ctc}')`
    );
    if (success) {
      res.status(OK).send({ success });
    } else {
      throw new APIError(error);
    }
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, resp } = await dbQuery(
      `SELECT yearly_salaries.current_salary as salary, 
      employees.name AS name, 
      employees.designation AS designation, 
      employees.experience AS experience,
      employees.ssn AS ssn,
      employees.id AS id FROM yearly_salaries
      JOIN employees ON yearly_salaries.emp_id = employees.id`
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

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, resp } = await dbQuery(`SELECT * from ${EMPLOYEE_TABLE} WHERE id=${req.params.id}`);
    if (success) {
      res.status(OK).send(resp);
    } else {
      throw new APIError(error);
    }
  } catch (error) {
    next(getFormattedError(error));
  }
}

export async function edit(req: Request, res: Response, next: NextFunction) {
  try {
    delete req.body.id;
    const { ssn1, ssn2, ssn3, ctc, ...others } = req.body;
    const keys = Object.keys(others);
    const payload = keys.reduce((p: any, c: any) => [...p, `${c}='${req.body[c]}'`], []).join();
    const { success, error } = await dbQuery(`UPDATE ${EMPLOYEE_TABLE} SET ${payload} WHERE id=${req.params.id}`);
    await dbQuery(
      `UPDATE ${YEARLY_SALARIES_TABLE} SET (current_salary) VALUES 
      ('${req.body.ctc}') WHERE emp_id=${req.params.id}`
    );
    if (success) {
      res.status(OK).send({ ...req.body, id: req.params.id });
    } else {
      throw new APIError(error);
    }
  } catch (error) {
    next(getFormattedError(error));
  }
}

export async function deleteDoc(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, resp } = await dbQuery(
      `UPDATE ${EMPLOYEE_TABLE} SET disabled='YES' WHERE id=${req.params.id}`
    );
    if (success) {
      res.status(OK).send(resp);
    } else {
      throw new APIError(error);
    }
    res.status(OK).send({ success });
  } catch (error) {
    next(getFormattedError(error));
  }
}
