import styles from './Header.module.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    return (
        <header className={styles.HeaderBox}>
            <div className={styles.ButtonsBox}>
                <NotificationsIcon className={styles.Notification}/>
                <AccountCircleIcon className={styles.Profile}/>
            </div>
        </header>
    );
    
}

export default Header;