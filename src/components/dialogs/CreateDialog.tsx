import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import TextArea from './TextArea';
import ActionButton from '../buttons/ActionButton';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  contentType: string;
};

const CreateDialog: React.FC<Props> = ({ isOpen, handleClose, contentType }) => {
  const [textFieldValue, setTextFieldValue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(textFieldValue);
    handleClose();
    //TODO: implemet post request with useQuery
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <>
      <Dialog
        open={isOpen}
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
          Add {contentType}
          <IconButton
            sx={{ position: 'absolute', top: '8px', right: '8px', color: '#000048' }}
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '40px' }}>
          <TextArea contentType={contentType} multiline onChange={handleTextFieldChange} rows={4} />
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #DDD', padding: '15px' }}>
          <ActionButton onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </ActionButton>
          <ActionButton type="submit" color="primary" variant="contained">
            Add Category
          </ActionButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateDialog;
