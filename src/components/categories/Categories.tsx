import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Card, useMediaQuery, useTheme } from '@mui/material';
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
    const theme = useTheme();
    const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

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

    const getTypographyVariant = () => {
        if (isXSmallScreen) return 'subtitle1';
        if (isSmallScreen) return 'h6';
        if (isMediumScreen) return 'h5';
        return 'h5';
    }

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
                        borderRadius: '4px'
                    }}
                    onClick={() => handleCategoryClick(category.id)}
                >
                    <ListItem>
                        <ListItemText
                            primary={category.title}
                            primaryTypographyProps={{
                                variant: getTypographyVariant()
                            }}
                        />
                    </ListItem>
                </Card>
            ))}
        </List>
    );
};

export default Categories;
