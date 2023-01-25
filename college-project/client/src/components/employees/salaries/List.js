import { Add } from "@mui/icons-material";
import { Fab, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getEmployeeSalaries } from "../../../store/actions";
import AddSalary from "./Add";

const SalariesList = (props) => {
  const x = props?.state?.showAddNew;
  const [showAddNew, setShowAddNew] = useState();
  const salaryReducer = useSelector((state) => state.salaries.data);
  const dispatch = useDispatch();
  const onCancelAdd = () => {
    setShowAddNew(false);
    // dispatch(getEmployees());
  };
  const { id } = useParams();
  useEffect(() => {
    dispatch(getEmployeeSalaries(id));
  }, [dispatch, id]);
  useEffect(() => {
    setShowAddNew(x === true);
  }, [x]);
  return (
    <>
      {showAddNew && <AddSalary onCancel={onCancelAdd} />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Gross Salary</TableCell>
            <TableCell>Basic</TableCell>
            <TableCell>HRA</TableCell>
            <TableCell>Allowances</TableCell>
            <TableCell>Provident Fund</TableCell>
            <TableCell>Leaves</TableCell>
            <TableCell>Net Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryReducer && salaryReducer.length ? (
            salaryReducer.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{new Date(doc.month).toLocaleDateString("en-US")}</TableCell>
                <TableCell>{Number(doc.total_sal).toLocaleString("en-US")}</TableCell>
                <TableCell>{Number(doc.basic).toLocaleString("en-US")}</TableCell>
                <TableCell>{Number(doc.hra).toLocaleString("en-US")}</TableCell>
                <TableCell>{Number(doc.allowances).toLocaleString("en-US")}</TableCell>
                <TableCell>{Number(doc.employer_pf + doc.employee_pf).toLocaleString("en-US")}</TableCell>
                <TableCell>{`${Number(doc.deductions).toLocaleString("en-US")} (${doc.leaves} Days)`}</TableCell>
                <TableCell>{Number(doc.net).toLocaleString("en-US")}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} style={{ textAlign: "center" }}>
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Tooltip arrow title="Add Salary">
        <Fab style={{ position: "fixed", bottom: 25, right: 25 }} color="primary">
          <IconButton color="inherit" onClick={() => setShowAddNew(true)}>
            <Add />
          </IconButton>
        </Fab>
      </Tooltip>
    </>
  );
};

export default SalariesList;
