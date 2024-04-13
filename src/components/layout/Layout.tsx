import { Box } from '@mui/material';
import SideBar from '../sideBar/SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box component="main" flexGrow="1">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
