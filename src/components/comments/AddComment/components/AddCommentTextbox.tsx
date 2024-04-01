import React from 'react';
import { TextField } from '@mui/material';
import AddCommentButton from './AddCommentButton';

export default function AddCommentTextbox() {
  return (
    <TextField
      id="new-comment"
      placeholder="Add a note on candidate answer"
      multiline
      fullWidth
      variant="outlined"
      rows={4}
      inputProps={{ maxLength: 255 }}
      InputProps={{ endAdornment: <AddCommentButton /> }}
    />
  );
}
