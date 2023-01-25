import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "../store/actions/index.js";

const Login = () => {
  const state = {
    email: { value: "", errored: false, errorMsg: "" },
    password: { value: "", errored: false, errorMsg: "" }
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState(state);
  const onSubmit = () => {
    const [email, password] = [values.email.value, values.password.value];
    dispatch(adminLogin({ email, password }));
  };
  return (
    <Card sx={{ maxWidth: 450, margin: "auto", marginTop: 15, padding: 5 }}>
      {/* <CardHeader
        style={{ display: "flex", justifyContent: "center" }}
        avatar={
          <Avatar sx={{ width: 75, height: 75 }}>
            <Lock fontSize="large" />
          </Avatar>
        }
      /> */}
      <CardContent>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          label="Email"
          value={values.email.value}
          onChange={(e) => setValues({ ...values, email: { ...values.email, value: e.target.value } })}
        />
        <TextField
          variant="outlined"
          size="small"
          type={"password"}
          fullWidth
          margin="normal"
          label="Password"
          value={values.password.value}
          onChange={(e) => setValues({ ...values, password: { ...values.password, value: e.target.value } })}
        />
        <Button fullWidth variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};
export default Login;
