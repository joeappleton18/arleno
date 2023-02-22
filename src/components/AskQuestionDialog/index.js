import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';




export default function FormDialog(props) {

    const { open, onClose, onSave, textValue, highlight } = props;
    const [question, setQuestion] = useState();


    useEffect(() => {
        if (textValue) {
            setQuestion(textValue);
        }
    }, [textValue, setQuestion]);

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{textValue ? "Update your question" : "Add a question to the highlight"}</DialogTitle>
                <DialogContent>
                    <DialogContentText color="secondary">
                        "{highlight}"
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={question}
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

