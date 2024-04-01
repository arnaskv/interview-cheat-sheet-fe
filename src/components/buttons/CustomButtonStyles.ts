import styled from '@emotion/styled';
import { Button, IconButton } from '@mui/material';

export const CustomCreateButton = styled(Button)`
  box-shadow: none;
  background-color: #000048;
  border: 1px solid #000048;
  border-radius: 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  text-transform: none;
  &:hover {
    box-shadow: none;
    background-color: #1a1a66;
  }
`;

export const CustomCancelButton = styled(Button)`
  box-shadow: none;
  background-color: #fff;
  border: 1px solid #dddddd;
  color: #000048;
  border-radius: 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  text-transform: none;
  &:hover {
    box-shadow: none;
    background-color: #c2c2c2;
  }
`;

export const CustomCloseButton = styled(IconButton)`
  color: #000048;
  position: absolute;
  top: 8px;
  right: 8px;
`;
