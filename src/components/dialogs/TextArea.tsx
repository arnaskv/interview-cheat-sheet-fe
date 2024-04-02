import { DialogContentText, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

type Props = TextFieldProps & {
  contentType: string;
};

const TextArea: React.FC<Props> = ({ contentType, ...textFieldProps }) => {
  return (
    <>
      <DialogContentText>
        {contentType} <span style={{ color: 'red' }}>*</span>
      </DialogContentText>
      <TextField
        name={contentType.toLowerCase()}
        variant="outlined"
        onChange={textFieldProps.onChange}
        multiline={textFieldProps.multiline}
        rows={textFieldProps.rows}
        fullWidth
        required
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
