import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Card} from '@mui/material';
import { Category } from '../../interfaces/Category';
import { fetchCategories } from '../../services/categoryService';
import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

    const handleCategoryClick = (categoryId: number) => {
        navigate(`/category/${categoryId}`);
    };

    if (loading) return <Loader />;
    if (error) return <div className={styles.Error}>{error}</div>;

    return (
        <List component="nav" aria-label="categories">
            {categories.map(category => (
                <Card
                    key={category.id}
                    sx={{
                        mb: 1.5,
                        cursor: 'pointer',
                        borderColor: 'lightgray',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }}
                    onClick={() => handleCategoryClick(category.id)}
                >
                    <ListItem>
                        <ListItemText
                            primary={category.title}
                        />
                    </ListItem>
                </Card>
            ))}
        </List>
    );
};

export default Categories;
