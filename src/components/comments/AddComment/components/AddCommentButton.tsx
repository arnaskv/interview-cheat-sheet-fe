import React from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

export default function AddCommentButton() {
  return (
    <IconButton color="primary">
      <SendIcon />
    </IconButton>
  );
}
