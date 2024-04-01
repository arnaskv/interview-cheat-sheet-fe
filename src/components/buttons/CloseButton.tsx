import React from 'react';
import { CustomCloseButton } from './CustomButtonStyles';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  onClick: () => void;
};

const CloseButton: React.FC<Props> = ({ onClick }) => {
  return (
    <CustomCloseButton aria-label="close" onClick={onClick}>
      <CloseIcon />
    </CustomCloseButton>
  );
};

export default CloseButton;
