import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/actions/index.js";
import { formatPayload, validateFormWithErrors } from "../../utils";

const AddEmployee = (props) => {
  const state = {
    name: { isRequired: true, value: "", errored: false, errorMsg: "" },
    designation: { isRequired: true, value: "", errored: false, errorMsg: "" },
    experience: { isRequired: true, value: "", errored: false, errorMsg: "" },
    ssn1: { isRequired: true, value: "", errored: false, errorMsg: "" },
    ssn2: { isRequired: true, value: "", errored: false, errorMsg: "" },
    ssn3: { isRequired: true, value: "", errored: false, errorMsg: "" },
    ctc: { isRequired: true, value: "", errored: false, errorMsg: "" }
  };
  const [values, setValues] = useState(state);
  const [formattedCTC, setFormattedCTC] = useState("");
  const dispatch = useDispatch();
  const onCancel = () => {
    props.onCancel();
  };
  const onAdd = async () => {
    const validations = validateFormWithErrors(values);
    if (validations.errorExists) {
      setValues({ ...validations.upatedErrors });
    } else {
      const payload = formatPayload(values);
      const resp = await dispatch(
        addEmployee({ ...payload, ssn: payload.ssn1.concat(payload.ssn2).concat(payload.ssn3) })
      );
      if (resp && !resp.isError) {
        props.onCancel();
      }
    }
  };
  const onInputChange = (key, value) => {
    if (["experience", "ctc"].includes(key)) {
      const valid = /^[1-9]\d*(\.\d+)?$/.test(parseFloat(value));
      if (key === "ctc") {
        setFormattedCTC(valid ? Number(value || 0).toLocaleString("en-US") : "");
      }
      if (!valid) {
        setValues({
          ...values,
          [key]: { ...values[key], value: "", errored: true, errorMsg: "Only numbers are allowed" }
        });
        return;
      }
    }
    setValues({ ...values, [key]: { ...values[key], value, errored: false, errorMsg: "" } });
  };
  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          fullWidth
          error={values.name.errored}
          helperText={values.name.errorMsg}
          margin="normal"
          label="Name"
          value={values.name.value}
          onChange={(e) => onInputChange("name", e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          error={values.designation.errored}
          helperText={values.designation.errorMsg}
          margin="normal"
          label="Designation"
          value={values.designation.value}
          onChange={(e) => onInputChange("designation", e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          error={values.experience.errored}
          helperText={values.experience.errorMsg}
          margin="normal"
          label="Experience"
          inputProps={{ maxLength: 3 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">Years</InputAdornment>
          }}
          value={values.experience.value}
          onChange={(e) => onInputChange("experience", e.target.value)}
        />
        <div style={{ display: "flex" }}>
          <TextField
            size="small"
            fullWidth
            error={values.ssn1.errored}
            helperText={values.ssn1.errorMsg}
            margin="normal"
            label="SSN"
            inputProps={{ maxLength: 3 }}
            value={values.ssn1.value}
            onChange={(e) => onInputChange("ssn1", e.target.value)}
          />
          <div style={{ padding: "20px 5px", opacity: 0.7 }}>{"-"}</div>
          <TextField
            size="small"
            fullWidth
            error={values.ssn2.errored}
            helperText={values.ssn2.errorMsg}
            margin="normal"
            label="SSN"
            inputProps={{ maxLength: 2 }}
            value={values.ssn2.value}
            onChange={(e) => onInputChange("ssn2", e.target.value)}
          />
          <div style={{ padding: "20px 5px", opacity: 0.7 }}>{"-"}</div>
          <TextField
            size="small"
            fullWidth
            error={values.ssn3.errored}
            helperText={values.ssn3.errorMsg}
            margin="normal"
            label="SSN"
            inputProps={{ maxLength: 4 }}
            value={values.ssn3.value}
            onChange={(e) => onInputChange("ssn3", e.target.value)}
          />
        </div>
        <TextField
          size="small"
          fullWidth
          error={values.ctc.errored}
          helperText={values.ctc.errorMsg}
          margin="normal"
          label="Yearly CTC"
          value={values.ctc.value}
          onChange={(e) => onInputChange("ctc", e.target.value)}
        />
        <span style={{ fontSize: 12 }}>{formattedCTC}</span>
      </DialogContent>
      <DialogActions style={{ padding: "0px 25px 25px 0px" }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" onClick={onAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployee;
