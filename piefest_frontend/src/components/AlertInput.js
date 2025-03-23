import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function AlertInput({ open, handleClose, onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = () => {
    onSubmit({ firstName, lastName });
    handleClose();
    setFirstName("");
    setLastName("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Your Name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mb: 2 }}  // adds margin bottom
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          disabled={!firstName.trim() || !lastName.trim()} // Disables button if fields are empty
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertInput;
