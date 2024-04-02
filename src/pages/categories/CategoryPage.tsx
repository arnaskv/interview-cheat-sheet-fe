import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryDetails from '../../components/categories/CategoryDetails';
import styles from '../../components/categories/Categories.module.css';

const CategoryPage: React.FC = () => {
    const { id } = useParams();

    return (
        <div className={styles.PageContainer}>
            {id && <CategoryDetails categoryId={id} />}
        </div>
    );
}

export default CategoryPage;
