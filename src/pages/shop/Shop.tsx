import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import styles from './Shop.module.css';
import Collections from './CollectionsShop/CollectionsShop';
import Categories from './Categories/Categories';
import { iModels } from '../../redux/store/types/IModels';
import axios from 'axios';
import Skeleton from './CollectionsShop/SkeletonShop';
import { useDispatch } from 'react-redux';
import { modelsActionTypes } from '../../redux/store/types/model';

export default function Shop(): JSX.Element {
  const { error, loading, models } = useTypedSelector(state => state.model);
  const [currentPage, setCurrentPage] = useState(1);
  const [modelsPerPage] = useState(9);

  return (
    <main className={styles.main}>
      <div className={styles.shopDiv}>
        <h3>Магазин</h3>
        <div className={styles.shopRoutes}>
          <Link to={'/'}>Главная</Link>
          <div className={styles.line}>—</div>
          <div className={styles.shopItem}>Магазин</div>
        </div>
        <Categories currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Collections
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          modelsPerPage={modelsPerPage}
        />
      </div>
    </main>
  );
}
