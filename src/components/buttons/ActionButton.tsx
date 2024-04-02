import React from 'react';
import { StyledButton } from './CustomButtonStyles';
import { ButtonProps } from '@mui/material/Button';

const ActionButton: React.FC<ButtonProps> = ({ children, ...muiButtonProps }) => {
  return (
    <StyledButton
      type={muiButtonProps.type}
      color={muiButtonProps.color}
      variant={muiButtonProps.variant}
      startIcon={muiButtonProps.startIcon}
      onClick={muiButtonProps.onClick}
    >
      {children}
    </StyledButton>
  );
};

export default ActionButton;
