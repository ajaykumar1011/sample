import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_LOGOUT_SUCCESS } from "../store/types";
export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch({ type: USER_LOGOUT_SUCCESS });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ boxShadow: "none" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Employee Management
          </Typography>
          <div style={{ position: "fixed", right: 10, display: "flex" }}>
            <div style={{ padding: 10, cursor: "pointer" }} onClick={() => navigate(`/employees`)}>
              <Typography>Home</Typography>
            </div>
            <div style={{ padding: 10, cursor: "pointer" }} onClick={onLogout}>
              <Typography>Logout</Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
