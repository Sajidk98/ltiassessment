import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function PopUp(props) {

  return (
    <Dialog
      open={props.open}
      onClose={props.handlePopUp}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title">{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handlePopUp}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
