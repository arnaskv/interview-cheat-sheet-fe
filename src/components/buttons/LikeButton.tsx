import React from 'react';
import { IconButton } from '@mui/material';
import { ThumbUpOutlined } from '@mui/icons-material';

type Props = {
  onClick(): void;
};

const LikeButton: React.FC<Props> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <ThumbUpOutlined sx={{ fill: '#999999', height: '16px', width: '16px' }} />
    </IconButton>
  );
};

export default LikeButton;
