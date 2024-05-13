import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List } from '@mui/material';
import { Category } from '../../interfaces/Category';
import styles from './Categories.module.css';
import Loader from '../shared/Loader';
import CategoryItem from './CategoryItem';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import CategoryFormDialog from '../dialogs/CategoryFormDialog';
import { HTTP_METHODS } from '../../constants/http';
import { ButtonContainer, HeaderContainer } from '../shared/PageTitleStyles';
import PageTitle from '../shared/PageTitle';
import CategoryDetails from './CategoryDetails';

const Categories: React.FC = () => {
  const { id } = useParams();
  const [categoryDetailedId, setCategoryDetailedId] = useState<number | null>(id ? Number(id) : null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const navigate = useNavigate();

  const {
    data: categories,
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

    categoryList.length === 0 && categories && setCategoryList(categories);
    // eslint-disable-next-line
  }, [categories, getData]);

  const updateCategory = (category: Category) => {
    setCategoryList(currentCategory => {
      return currentCategory.map(c => (c.id === category.id ? category : c));
    });
  };

  const onCreateSuccess = (response: Category) => {
    const category: Category = response;
    setCategoryList(currentCategories => {
      return [category, ...currentCategories];
    });
  };

  const createCategoryCommand = useQuery({
    url: ENDPOINTS.CATEGORY.CREATE,
    httpMethod: HTTP_METHODS.POST,
    onSuccess: onCreateSuccess,
  });

  const handleCreateSubmit = async (values: Category) => {
    await createCategoryCommand.sendData(values);
  };

  const handleCategoryClick = (categoryId: number | null) => {
    navigate(`/category/${categoryId}`);
    setCategoryDetailedId(categoryId);
  };

  const deleteCategory = (id: number) => {
    setCategoryList(currentCategories => {
      return currentCategories.filter(c => c.id !== id);
    });
    setCategoryDetailedId(null);
  };

  if (isLoading) return <Loader />;
  if (errors) return <div className={styles.Error}>{errors.join(', ')}</div>;

  return (
    <>
      {categoryDetailedId !== null && (
        <CategoryDetails
          categoryId={categoryDetailedId}
          setCategoryId={setCategoryDetailedId}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
        />
      )}

      <HeaderContainer width="100%">
        <PageTitle title="Category bank" subTitle="Discover, create and improve existing interview categories" />
        <ButtonContainer>
          <CategoryFormDialog onSubmit={handleCreateSubmit} action="Add Category" />
        </ButtonContainer>
      </HeaderContainer>

      <List component="nav" aria-label="categories">
        {!categoryList || categoryList.length === 0 ? (
          <div>No categories found</div>
        ) : (
          categoryList.map(category => (
            <CategoryItem key={category.id} category={category} handleCategoryClick={handleCategoryClick} />
          ))
        )}
      </List>
    </>
  );
};

export default Categories;
