import React, { ReactElement } from 'react';
import { useMatch, Link } from 'react-router-dom';
import { ListItem, IconButton, Typography } from '@mui/material';

type SidebarItemProps = {
  text: string;
  icon: ReactElement;
  path: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ text, icon, path }) => {
  const match = useMatch(path);

  return (
    <ListItem
      component={Link}
      to={path}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: match ? 'primary.main' : 'inherit',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <IconButton sx={{ color: match ? 'primary.main' : 'action.active' }}>
        {React.cloneElement(icon, {
          color: match ? 'primary' : 'inherit',
        })}
      </IconButton>
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {text}
      </Typography>
    </ListItem>
  );
};

export default SidebarItem;
