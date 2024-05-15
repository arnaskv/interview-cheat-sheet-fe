import { IconButton, Menu, MenuItem } from '@mui/material';
import styles from './Header.module.css';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserContext } from '../authenticationProvider/AuthenticationProvider';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useContext(UserContext);

    return (
      <div className={styles.HeaderContainer}>
        <header className={styles.HeaderBox}>
            <div className={styles.ButtonsBox}>
            {/*    <NotificationsIcon className={styles.Notification}/>*/}
            <IconButton onClick={handleClick}>
              <AccountCircleIcon style={{width: '2.5rem', height: '2.5rem'}} />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user?.isLoggedIn ? (
                <MenuItem onClick={() => {
                  user.logout();
                  navigate('/');
                  handleClose();
                }}>Log out</MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => {
                    navigate('/login');
                    handleClose();
                  }}>Log in</MenuItem>
                  <MenuItem onClick={() => {
                      navigate('/register')
                      handleClose();
                  }}>Register</MenuItem>
                </>
              )}
            </Menu>
            </div>
        </header>
      </div>
    );
    
}

export default Header;