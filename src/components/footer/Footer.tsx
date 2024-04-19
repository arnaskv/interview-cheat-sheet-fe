import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.FooterContainer}>
      <footer className={styles.FooterBox}>
        <div className={styles.Copyright}>Copyright © 2024 Cognizant</div>
        <div className={styles.PrivacyPolicy}>
          <a href="https://www.cognizant.com/us/en/about-cognizant/public-policy">Privacy Policy</a>{' '}
          {/* Should be a link to this page's privacy policy */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
