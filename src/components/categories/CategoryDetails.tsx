import React, { useEffect, useState } from 'react';
import { Category } from '../../interfaces/Category';
import { fetchCategory } from '../../services/categoryService';
import styles from './Categories.module.css';
import Loader from '../shared/Loader';

interface CategoryDetailsProps {
    categoryId: string;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ categoryId }) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (categoryId) {
            setLoading(true);

            fetchCategory(parseInt(categoryId, 10))
                .then(data => {
                    setCategory(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [categoryId]);

    if (loading) return <Loader />;
    if (error) return <div className={styles.Error}>{error}</div>;
    if (!category) return <div>No category found</div>

    return (
        <div>
            <h2>{category.title}</h2>
        </div>
    );
};

export default CategoryDetails;