import React from 'react';
import Categories from '../../components/categories/Categories';

const CategoriesPage: React.FC = () => {
    return (
        <div className='page-container'>
            <h2>Categories</h2>
            <Categories/>
        </div>
    );
};

export default CategoriesPage;