import { CustomCreateButton } from './CustomButtonStyles';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

type Props = {
  onClick?: () => void;
  contentType: string;
  isIconPresent?: boolean;
  isButtonType?: boolean;
};

const CreateButton: React.FC<Props> = ({ onClick, contentType, isIconPresent, isButtonType }) => {
  return (
    <CustomCreateButton
      type={isButtonType ? 'button' : 'submit'}
      variant="contained"
      startIcon={isIconPresent ? <AddIcon /> : null}
      onClick={onClick}
    >
      Add {contentType}
    </CustomCreateButton>
  );
};

export default CreateButton;
