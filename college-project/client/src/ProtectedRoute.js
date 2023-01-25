import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/employees/List";
import AddSalary from "./components/employees/salaries/Add";
import SalariesList from "./components/employees/salaries/List";
import NavBar from "./utils/AppBar";

const ProtectedRoute = (props) => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id/salaries" element={<SalariesList />} />
        <Route path="/employees/:id/salaries/add" element={<AddSalary />} />
        <Route path="*" element={<Navigate to={`/employees`} />} />
      </Routes>
    </>
  );
};
export default ProtectedRoute;
