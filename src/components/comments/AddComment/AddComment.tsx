import React from 'react';
import AddCommentTextField from './AddCommentTextField';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export default function AddComment() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar />
      <AddCommentTextField />
    </Stack>
  );
}
