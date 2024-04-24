import { Box } from '@mui/material';
import SideBar from '../sideBar/SideBar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout = () => {
  return (
    <Box className={styles.FlexAround}>
      <Header />
      <Box flexGrow="1" display="flex">
        <SideBar />
        <Box component="main" flexGrow="1">
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
