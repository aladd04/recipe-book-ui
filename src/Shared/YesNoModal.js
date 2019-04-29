import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import PropTypes from "prop-types";

function YesNoModal({ isOpen, onYes, onNo, title, question, ...props}) {
  return (
    <Dialog open={isOpen} onClose={onNo} {...props}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {question}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="small" color="secondary" onClick={onYes}>
          Yes
        </Button>
        <Button size="small" color="primary" onClick={onNo}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

YesNoModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog({breakpoint: "sm"})(YesNoModal);
