import { DialogContentText, TextField } from '@mui/material';
import React from 'react';

type Props = {
  contentType: string;
  multiline?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextArea: React.FC<Props> = ({ contentType, multiline = false, onChange }) => {
  return (
    <>
      <DialogContentText>
        {contentType} <span style={{ color: 'red' }}>*</span>
      </DialogContentText>
      <TextField
        name={contentType.toLowerCase()}
        variant="outlined"
        onChange={onChange}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        fullWidth
        margin="dense"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
    </>
  );
};

export default TextArea;
