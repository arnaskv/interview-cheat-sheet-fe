import { CustomCancelButton } from './CustomButtonStyles';
import React from 'react';

type Props = {
  onClick: () => void;
};

const CancelButton: React.FC<Props> = ({ onClick }) => {
  return (
    <CustomCancelButton type="button" variant="contained" onClick={onClick}>
      Cancel
    </CustomCancelButton>
  );
};

export default CancelButton;
