import React from 'react';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles['loader-container']}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
