import React from 'react';
import { IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  open?: boolean;
  onClick(): void;
  showBorder?: boolean;
  buttonClassName?: string; // ClassName for the IconButton
  iconClassName?: string; // ClassName for the expand icon
};

const ChevronButton: React.FC<Props> = ({ open, onClick, showBorder = true, buttonClassName, iconClassName }) => {
  return (
    <IconButton
      onClick={onClick}
      className={buttonClassName}
      sx={{ border: showBorder ? '1px solid #DDDDDD' : 'none', borderRadius: '12px', height: '32px', width: '32px' }}
    >
      {open ? (
        <ExpandLessIcon sx={{ color: '#000048', fontSize: '20px' }} className={iconClassName} /> // Apply iconClassName here
      ) : (
        <ExpandMoreIcon sx={{ color: '#000048', fontSize: '20px' }} className={iconClassName} /> // Apply iconClassName here
      )}
    </IconButton>
  );
};

export default ChevronButton;
