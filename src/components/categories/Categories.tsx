import React, { useState, useEffect } from 'react';
import { Category } from '../../interfaces/Category';
import { fetchCategories } from '../../services/categoryService';
import styles from './Categories.module.css';
import Loader from '../shared/Loader';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        fetchCategories()
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className={styles.Error}>{error}</div>;

    return (
        <div className={styles.ListOfCategories}>
            {categories.map(category => (
                <div className={styles.CategoryItem} key={category.id}>
                    {category.name}
                </div>
            ))}
        </div>

    );
};

export default Categories;