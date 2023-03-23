import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/Table";
import { deleteEvent } from "../../redux/eventReducer";
import EventForm from "./eventForm";

export default function Home() {
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState();
  const navigate = useNavigate();

  function handlePopUp() {
    setOpen((state) => !state);
    setEditId(null);
  }

  function handleEdit(id) {
    setEditId(id);
    setOpen((state) => !state);
  }

  function handleDelete(id) {
    dispatch(deleteEvent(id));
  }

  function hanldeLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const currentUser = localStorage.getItem("user");
  const eventList = events.filter((item) => item.userId == currentUser);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "right", padding: 16 }}>
        {!open && (
          <Button variant="contained" onClick={handlePopUp}>
            Add New Activity
          </Button>
        )}
        <Button onClick={hanldeLogout}>Logout</Button>
      </div>

      {open && (
        <EventForm
          open={open}
          editId={editId}
          handleOpenAddForm={handlePopUp}
          handlePopUp={handlePopUp}
        />
      )}
      <CustomTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        rows={eventList}
      />
    </div>
  );
}
