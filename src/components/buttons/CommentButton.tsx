import React from 'react';
import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type Props = {
  onClick(): void;
};

const CommentButton: React.FC<Props> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <ChatBubbleOutlineOutlined sx={{ fill: '#999999', height: '16px', width: '16px' }} />
    </IconButton>
  );
};

export default CommentButton;
