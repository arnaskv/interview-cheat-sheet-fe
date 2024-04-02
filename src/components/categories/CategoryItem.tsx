import React from 'react';
import { ListItem, ListItemText, Card } from '@mui/material';
import { Category } from '../../interfaces/Category';

interface CategoryItemProps {
    category: Category;
    onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onClick }) => {
    return (
        <Card
            sx={{
                mb: 1.5,
                cursor: 'pointer',
                borderColor: '#efefef',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '4px',
                fontSize: '1rem'
            }}
            onClick={onClick}
        >
            <ListItem>
                <ListItemText
                    primary={category.title}
                />
            </ListItem>
        </Card>
    );
};

export default CategoryItem;