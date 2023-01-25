import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addSalary as addEmpSalary } from "../../../store/actions";
import { formatPayload, validateFormWithErrors } from "../../../utils";

const AddSalary = (props) => {
  const state = {
    leaves: { isRequired: true, value: "", errored: false, errorMsg: "" },
    month: { isRequired: true, value: new Date(), errored: false, errorMsg: "" }
  };
  const [values, setValues] = useState(state);
  const [date, setDate] = useState(dayjs(new Date()));
  const onDateChange = (newValue) => {
    setDate(newValue);
    setValues({ ...values, month: { ...values.month, value: new Date() } });
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const onCancel = () => {
    props.onCancel();
  };
  const onInputChange = (key, value) => {
    value = parseFloat(value);
    const valid = /^[1-9]\d*(\.\d+)?$/.test(parseFloat(value));
    if (!valid) {
      setValues({
        ...values,
        [key]: { ...values[key], value: "", errored: true, errorMsg: "Only numbers are allowed" }
      });
      return;
    } else {
      setValues({
        ...values,
        [key]: { ...values[key], value, errored: false, errorMsg: "" }
      });
    }
  };
  const onAdd = async () => {
    const validations = validateFormWithErrors(values);
    if (validations.errorExists) {
      setValues({ ...values, ...validations.upatedErrors });
    } else {
      const payload = formatPayload(values);
      const resp = await dispatch(addEmpSalary(payload, id));
      if (resp && !resp.isError) {
        props.onCancel();
      }
    }
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Add Salary</DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          fullWidth
          error={values.leaves.errored}
          helperText={values.leaves.errorMsg}
          margin="normal"
          label="Leaves Applied"
          InputProps={{
            inputProps: { min: 0, max: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }
          }}
          value={values.leaves.value}
          onChange={(e) => onInputChange("leaves", e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date"
            value={date}
            inputFormat="MM/dd/yyyy"
            onChange={onDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                margin="normal"
                error={values.month.errored}
                helperText={values.month.errorMsg}
                required={values.leaves.isRequired}
              />
            )}
          />
        </LocalizationProvider>
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

export default AddSalary;
