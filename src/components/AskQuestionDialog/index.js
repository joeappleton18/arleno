import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';




export default function FormDialog(props) {

    const { open, onClose, onSave, highlight } = props;
    const [question, setQuestion] = useState();

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a question to the highlight</DialogTitle>
                <DialogContent>
                    <DialogContentText color="secondary">
                        "{highlight}"
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Question"
                        type="email"
                        fullWidth
                        onChange={e => setQuestion(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => onSave(question)} color="primary">
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

