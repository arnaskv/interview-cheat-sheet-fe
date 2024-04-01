import React from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const AddCommentButton: React.FC<Props> = ({ disabled, onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <SendIcon color={disabled ? 'disabled' : 'primary'} />
    </IconButton>
  );
};

export default AddCommentButton;
