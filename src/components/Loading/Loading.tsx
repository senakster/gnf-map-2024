import React from 'react';
import styles from './Loading.module.css';

const Loading = () => (
  <div className={``}>
    <div className={styles.textContainer}>
    <span className={styles.text}>{'Indhold Hentes...'}</span>
    </div>
  </div>
);

export default Loading;
