import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../authorization/Authorization.module.css';
import telephone from '../../../../assets/header/telephone.svg';

export default function Authorization(): JSX.Element {
  return (
    <div className={styles.auth}>
      <img className={styles.img} src={telephone} alt='' />
      <div>
        <Link to='/'>+7 (495) 823-54-12</Link>
      </div>
    </div>
  );
}
