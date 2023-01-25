import { Add, EditOutlined, HistoryOutlined } from "@mui/icons-material";
import { Fab, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../../store/actions/index.js";
import AddEmployee from "./Add";
import EditEmployee from "./Edit";
const EmployeeList = () => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [showAddNew, setShowAddNew] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const employeeReducer = useSelector((state) => state.employees.data);
  const dispatch = useDispatch();
  const onEditClick = (doc) => {
    setEditEmployee(true);
    setSelectedEmployee(doc);
  };
  const onCancelEdit = () => {
    setEditEmployee(false);
  };
  const onCancelAdd = () => {
    setShowAddNew(false);
    dispatch(getEmployees());
  };
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);
  return (
    <>
      {showAddNew && <AddEmployee onCancel={onCancelAdd} />}
      {editEmployee && <EditEmployee onCancel={onCancelEdit} {...selectedEmployee} ssn="123ab4567" />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.no</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>CTC</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeReducer && employeeReducer.length ? (
            employeeReducer.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.designation}</TableCell>
                <TableCell>{`${doc.experience} Years`}</TableCell>
                <TableCell>{`$${Number(doc.salary).toLocaleString("en-US")}`}</TableCell>
                <TableCell>
                  <Tooltip arrow title="Edit">
                    <IconButton color="inherit" onClick={(e) => onEditClick(doc)}>
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow title="Salary History">
                    <IconButton color="inherit" onClick={(e) => navigate(`/employees/${doc.id}/salaries`)}>
                      <HistoryOutlined />
                    </IconButton>
                  </Tooltip>
                </TableCell>
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
      <Tooltip arrow title="Add Employee">
        <Fab style={{ position: "fixed", bottom: 25, right: 25 }} color="primary">
          <IconButton color="inherit" onClick={() => setShowAddNew(true)}>
            <Add />
          </IconButton>
        </Fab>
      </Tooltip>
    </>
  );
};

export default EmployeeList;
