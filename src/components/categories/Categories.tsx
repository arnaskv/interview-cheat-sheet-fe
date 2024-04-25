import React, { useEffect, useState } from 'react';
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
import { ButtonContainer, HeaderContainer } from '../shared/PageTitleStyles';
import PageTitle from '../shared/PageTitle';

const Categories: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const {
    data: categories,
    isLoading,
    errors,
    getData,
  } = useQuery<Category[]>({
    url: ENDPOINTS.CATEGORY.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  const addCategory = (category: Category) => {
    setCategoryList(currentCategories => {
      return [category, ...currentCategories];
    });
  };

  useEffect(() => {
    if (!categories) {
      getData();
    }

    categoryList.length === 0 && categories && setCategoryList(categories);
    // eslint-disable-next-line
  }, [categories, getData]);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  if (isLoading) return <Loader />;
  if (errors) return <div className={styles.Error}>{errors.join(', ')}</div>;

  return (
    <>
      <HeaderContainer width="100%" marginTop="20px">
        <PageTitle title="Category bank" subTitle="Discover, create and improve existing interview categories" />
        <ButtonContainer>
          <CategoryAddDialog addCategory={addCategory} />
        </ButtonContainer>
      </HeaderContainer>

      <List component="nav" aria-label="categories">
        {!categoryList || categoryList.length === 0 ? (
          <div>No categories found</div>
        ) : (
          categoryList.map(category => (
            <CategoryItem key={category.id} category={category} onClick={() => handleCategoryClick(category.id!)} />
          ))
        )}
      </List>
    </>
  );
};

export default Categories;
