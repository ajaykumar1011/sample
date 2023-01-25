import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editProfile } from "../../store/actions/index.js";
import { formatPayload, validateFormWithErrors } from "../../utils";

const EditEmployee = (props) => {
  const state = {
    name: {
      value: props.name,
      isRequired: true,
      errored: false,
      errorMsg: ""
    },
    designation: {
      value: props.designation,
      isRequired: true,
      errored: false,
      errorMsg: ""
    },
    experience: {
      isRequired: true,
      value: props.experience,
      errored: false,
      errorMsg: ""
    },
    ssn1: { isRequired: true, value: props.ssn.substring(0, 3), errored: false, errorMsg: "" },
    ssn2: { isRequired: true, value: props.ssn.substring(3, 5), errored: false, errorMsg: "" },
    ssn3: { isRequired: true, value: props.ssn.substring(5, props.ssn.length), errored: false, errorMsg: "" },
    ctc: {
      isRequired: true,
      value: props.salary,
      errored: false,
      errorMsg: ""
    }
  };
  const [values, setValues] = useState(state);
  const [formattedCTC, setFormattedCTC] = useState(Number(values.ctc.value).toLocaleString("en-US"));
  const dispatch = useDispatch();
  const onCancel = () => {
    props.onCancel();
  };
  const updateValues = (key, value) => {
    if (["experience", "ctc"].includes(key)) {
      const valid = /^[0-9]\d*(\d+)?$/i.test(value);
      if (key === "ctc") {
        setFormattedCTC(valid ? Number(value || 0).toLocaleString("en-US") : "");
      }
      if (!valid) {
        setValues({ ...values, [key]: { ...values[key], value: "", errored: true, errorMsg: "Only number allowed" } });
        return;
      }
    }
    setValues({ ...values, [key]: { ...values[key], value, errored: false, errorMsg: "" } });
  };
  const onAdd = async () => {
    const validations = validateFormWithErrors(values);
    if (validations.errorExists) {
      setValues({ ...values, ...validations.upatedErrors });
    } else {
      const payload = formatPayload(values);
      const resp = await dispatch(
        editProfile({ ...payload, id: props.id, ssn: payload.ssn1.concat(payload.ssn2).concat(payload.ssn3) })
      );
      if (resp && !resp.isError) {
        props.onCancel();
      }
    }
  };
  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          fullWidth
          error={values.name.errored}
          required={values.name.isRequired}
          helperText={values.name.errorMsg}
          margin="normal"
          label="Name"
          value={values.name.value}
          onChange={(e) => updateValues("name", e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          error={values.designation.errored}
          required={values.designation.isRequired}
          helperText={values.designation.errorMsg}
          margin="normal"
          label="Designation"
          value={values.designation.value}
          onChange={(e) => updateValues("designation", e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          error={values.experience.errored}
          required={values.experience.isRequired}
          helperText={values.experience.errorMsg}
          InputProps={{
            endAdornment: <InputAdornment position="end">Years</InputAdornment>
          }}
          margin="normal"
          label="Experience"
          value={values.experience.value}
          onChange={(e) => updateValues("experience", e.target.value)}
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
            onChange={(e) => updateValues("ssn1", e.target.value)}
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
            onChange={(e) => updateValues("ssn2", e.target.value)}
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
            onChange={(e) => updateValues("ssn3", e.target.value)}
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
          onChange={(e) => updateValues("ctc", e.target.value)}
        />
        <span style={{ fontSize: 12 }}>{formattedCTC}</span>
      </DialogContent>
      <DialogActions style={{ padding: "0px 25px 25px 0px" }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" onClick={onAdd}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployee;
