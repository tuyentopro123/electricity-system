import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { grey } from '@mui/material/colors';

const DialogComponent = (props) => {
    const handleCancel = () => {
        props.setVisible(false);
    };

    const handleAccess = () => {
        props.callBackFunc();
    };
    return (
        <div>
            <Dialog
                open={props.visible}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: 30, color: grey[800] }}>
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: 20, color: grey[800] }}>
                        {props.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontSize: 20, color: grey[800] }} onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button sx={{ fontSize: 20, color: grey[800] }} onClick={handleAccess} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogComponent;
