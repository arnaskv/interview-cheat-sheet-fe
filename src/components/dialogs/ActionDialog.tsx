import React from 'react';
import { Dialog, DialogTitle, IconButton, DialogProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ActionDialogProps extends DialogProps {
  title: string;
  handleClose: () => void;
  children: React.ReactNode;
}

const ActionDialog: React.FC<ActionDialogProps> = ({ title, handleClose, children, ...dialogProps }) => {
  return (
    <Dialog
      {...dialogProps}
      onClose={handleClose}
      PaperProps={{
        sx: {
          border: '1px solid #fff',
          borderRadius: '8px',
          boxShadow: 'none',
          overflowX: 'hidden',
          minWidth: '600px',
        },
      }}
    >
      <DialogTitle>
        {title}
        <IconButton
          sx={{ position: 'absolute', top: '8px', right: '8px', color: '#000048' }}
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div>{children}</div>
    </Dialog>
  );
};

export default ActionDialog;
