import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "../Login/style.css";
import { useFormik } from "formik";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../components/PopUp";
import { eventValidation } from "../../utils/validation";
import { convertDateToDDMMYYYY } from "../../utils/format";
import { addEvent, editEvent } from "../../redux/eventReducer";

export default function EventForm(props) {
  const { editId } = props;
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState()

  useEffect(() => {
    const data = events.filter((item) => item.eventId === editId)[0];
    setEditData((state) => data);
  }, [props.editId]);

  const initialValues = {
    event_name: editId ? editData.event_name : "",
    description: editId ? editData.description : "",
    event_date: editId ? editData.event_date : "",
    price: editId ? editData.price : "",
    booking_type: editId ? editData.booking_type : "",
    tnc: false,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: eventValidation,
    onSubmit: (values) => {
      setError(null)
      if(!values.tnc){
       return setError("Please accept the tems and conditions")
      }
      const data = {
        ...values,
        event_date: convertDateToDDMMYYYY(values.event_date),
      };
      if (editId) {
        dispatch(editEvent({ id: editId, data: data }));
      } else {
        dispatch(addEvent(data));
      }
      props.handlePopUp();
    },
  });

  return (
    <>
      {props.open && (
        <PopUp open={true} handlePopUp={props.handlePopUp} title="some title">
          <div style={{ width: 500 }}>
           
            <form onSubmit={formik.handleSubmit}>
              <div className="field-container">
                <TextField
                  fullWidth
                  label="Event Name"
                  variant="outlined"
                  name="event_name"
                  value={formik.values.event_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.event_name &&
                    Boolean(formik.errors.event_name)
                  }
                  helperText={
                    formik.touched.event_name && formik.errors.event_name
                  }
                />
              </div>
              <div className="field-container">
                <TextField
                  fullWidth
                  label="Booking Price"
                  variant="outlined"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </div>
              <div className="field-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Event Data"
                      name="event_date"
                      onChange={(value) =>
                        formik.setFieldValue("event_date", value, true)
                      }
                      value={formik.values.event_date}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="field-container">
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </div>
              <div className="field-container">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Booking Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="booking_type"
                    onChange={formik.handleChange}
                    value={formik.values.booking_type}
                  >
                    <FormControlLabel
                      value="premium"
                      control={<Radio />}
                      label="Premium"
                    />
                    <FormControlLabel
                      value="normal"
                      control={<Radio />}
                      label="Normal"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="field-container">
                <FormGroup>
                  <FormControlLabel
                    name="tnc"
                    onChange={formik.handleChange}
                    control={<Checkbox />}
                    checked={formik.values.tnc}
                    label="Accept term and conditions policies"
                  />
                </FormGroup>
              </div>
              {error&& <span style={{color:"red"}}>{error}</span>}
              <div className="field-container button-container">
                <Button type="submit" variant="contained">
                  {editId ? "Update" : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </PopUp>
      )}
    </>
  );
}
