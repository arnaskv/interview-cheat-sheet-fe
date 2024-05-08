import React from 'react';
import { IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  open?: boolean;
  onClick(): void;
};

const ChevronButton: React.FC<Props> = ({ open, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{ border: '1px solid #DDDDDD', borderRadius: '12px', height: '32px', width: '32px' }}
    >
      {open ? (
        <ExpandLessIcon sx={{ color: '#000048', fontSize: '20px' }} />
      ) : (
        <ExpandMoreIcon sx={{ color: '#000048', fontSize: '20px' }} />
      )}
    </IconButton>
  );
};

export default ChevronButton;
