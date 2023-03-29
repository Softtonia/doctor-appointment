import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';


function CustomAlertMui({ onConfirm, onCancel, message }) {
  const [open, setOpen] = useState(true);

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <div>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{message}</DialogTitle>
        <DialogContent>
          {/* Custom content can be added here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomAlertMui;