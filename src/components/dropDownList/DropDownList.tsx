import React, { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import './DropDownList.css';
import ChevronButton from '../buttons/ChevronButton';

type Option = {
  value: string;
  label: string;
}

type DropDownListProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  variant?: 'primary' | 'secondary';
  }

const DropDownList: React.FC<DropDownListProps> = ({ value, onChange, options, variant = 'primary'}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
    handleClose();
  };

  return (
    <div className={`sorting-select-container ${variant === 'secondary' ? 'secondary-variant' : 'primary-variant'}`}>
      <Select
        value={value}
        onChange={handleChange}
        MenuProps={{ disablePortal: true, open, onClose: handleClose, PaperProps: { style: { width: 'max-content' } } }}
        className={`select-input ${variant === 'secondary' ? 'secondary-variant' : 'primary-variant'}`}
        IconComponent={() => (
          <ChevronButton
            open={open}
            onClick={() => setOpen(!open)}
            showBorder={false}
            buttonClassName="chevron-button"
            iconClassName="chevron-icon"
          />
        )}
        sx={{ width: '100%'}}
        onOpen={handleOpen}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DropDownList;
