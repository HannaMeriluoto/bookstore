import React from 'react;
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Textfield'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddBook() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return ( 
        <div>
            <Button variant="outlined" color="primary">
                Add book
            </Button>
            <Dialog open={open}>
                <DialogTitle>New Book</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
     );
}

export default AddBook;