import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import TextArea from './TextArea';
import CreateButton from '../buttons/CreateButton';
import CancelButton from '../buttons/CancelButton';
import CloseButton from '../buttons/CloseButton';

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
    //later useQuery would be added
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
          <CloseButton onClick={handleClose} />
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '40px' }}>
          <TextArea contentType={contentType} multiline onChange={handleTextFieldChange} />
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #DDD', padding: '15px' }}>
          <CancelButton onClick={handleClose} />
          <CreateButton contentType={contentType} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateDialog;
