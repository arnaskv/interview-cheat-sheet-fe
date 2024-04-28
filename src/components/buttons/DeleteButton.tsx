import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';

type Props = {
  id: string;
  onClick(id: string): void;
};

const DeleteButton: React.FC<Props> = ({ id, onClick }) => {
  return (
    <IconButton onClick={() => onClick(id)} sx={{ border: '1px solid #DDDDDD', height: '32px', width: '32px' }}>
      <DeleteOutlineIcon sx={{ color: '#999999', height: '16px', width: '16px' }} />
    </IconButton>
  );
};

export default DeleteButton;
