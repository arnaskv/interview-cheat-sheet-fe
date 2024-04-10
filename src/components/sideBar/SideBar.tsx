import { Drawer, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import Logo from './Logo';
import ClassIcon from '@mui/icons-material/Class';
import NotesSharpIcon from '@mui/icons-material/NotesSharp';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';

const SideBar = () => {
  const icons = [<ClassIcon />, <NotesSharpIcon />, <CategoryIcon />, <PersonIcon />];

  return (
    <Drawer
      sx={{ width: '100px', flexShrink: 0, '& .MuiDrawer-paper': { width: '100px', boxSizing: 'border-box' } }}
      variant="permanent"
      anchor="left"
    >
      <IconButton disabled aria-label="logo">
        <Logo />
      </IconButton>
      <List>
        {['Questions bank', 'Interviews', 'Category', 'My Profile'].map((text, index) => (
          <ListItem
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            key={text}
          >
            <IconButton>{icons[index]}</IconButton>
            <ListItemText disableTypography primary={<Typography variant="body2">{text}</Typography>} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
