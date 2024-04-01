import React from 'react';
import AddCommentTextbox from './components/AddCommentTextbox';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export default function AddComment() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>AK</Avatar>
      <AddCommentTextbox />
    </Stack>
  );
}
