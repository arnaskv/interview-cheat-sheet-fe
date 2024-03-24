import React from 'react';
import Categories from '../../components/categories/Categories';
import styles from '../../components/categories/Categories.module.css';

const CategoriesPage: React.FC = () => {
    return (
        <div className={styles.PageContainer}>
            <h2>Categories</h2>
            <Categories/>
        </div>
    );
};

export default CategoriesPage;