import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { Category } from '../../interfaces/Category';
import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';
import CategoryItem from './CategoryItem';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import CategoryAddDialog from '../dialogs/CategoryAddDialog';
import { HTTP_METHODS } from '../../constants/http';

const Categories: React.FC = () => {
  const {
    data: categories,
    setData: setCategories,
    isLoading,
    errors,
    getData,
  } = useQuery<Category[]>({
    url: ENDPOINTS.CATEGORY.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  useEffect(() => {
    if (!categories) {
      getData();
    }
  }, [categories, getData]);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  if (isLoading) return <Loader />;
  if (errors) return <div className={styles.Error}>{errors.join(', ')}</div>;
  if (!categories || categories.length === 0) return <div>No categories found</div>;

  return (
    <List component="nav" aria-label="categories">
      <CategoryAddDialog setCategories={setCategories} />
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} onClick={() => handleCategoryClick(category.id)} />
      ))}
    </List>
  );
};

export default Categories;
