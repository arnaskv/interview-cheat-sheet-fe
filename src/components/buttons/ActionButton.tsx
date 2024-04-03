import React from 'react';
import { StyledButton } from './CustomButtonStyles';
import { ButtonProps } from '@mui/material/Button';

const ActionButton: React.FC<ButtonProps> = ({ children, ...muiButtonProps }) => {
  return <StyledButton {...muiButtonProps}>{children}</StyledButton>;
};

export default ActionButton;
