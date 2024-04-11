import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, DialogProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ActionButton from '../buttons/ActionButton';

interface ActionDialogProps extends DialogProps {
  title: string;
  handleClose: () => void;
  onSubmit: (data: any) => void;
  submitButtonLabel: string;
  children: React.ReactNode;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  title,
  handleClose,
  onSubmit,
  submitButtonLabel,
  children,
  ...dialogProps
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event.currentTarget);
    handleClose();
  };

  return (
    <Dialog
      {...dialogProps}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
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
      <DialogContent sx={{ paddingBottom: '40px' }}>{children}</DialogContent>
      <DialogActions sx={{ borderTop: '1px solid #DDD', padding: '15px' }}>
        <ActionButton onClick={handleClose} color="secondary" variant="contained">
          Cancel
        </ActionButton>
        <ActionButton type="submit" color="primary" variant="contained">
          {submitButtonLabel}
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
