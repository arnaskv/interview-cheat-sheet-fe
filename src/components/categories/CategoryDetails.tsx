import React, { useEffect } from 'react';
import { Category } from '../../interfaces/Category';
import styles from './Categories.module.css';
import Loader from '../shared/Loader';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import CategoryDeleteDialog from '../dialogs/CategoryDeleteDialog';
import { HTTP_METHODS } from '../../constants/http';

interface CategoryDetailsProps {
  categoryId: string;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ categoryId }) => {
  const {
    data: category,
    isLoading,
    errors,
    getData,
  } = useQuery<Category>({
    url: ENDPOINTS.CATEGORY.GET_ONE(categoryId),
    httpMethod: HTTP_METHODS.GET,
  });

  useEffect(() => {
    if (categoryId && !category) {
      getData();
    }
  }, [categoryId, getData, category]);

  if (isLoading) return <Loader />;
  if (errors) return <div className={styles.Error}>{errors.join(', ')}</div>;
  if (!category) return <div>No category found</div>;

  return (
    <div>
      <h2>{category.title}</h2>
      <CategoryDeleteDialog categoryId={categoryId} />
    </div>
  );
};

export default CategoryDetails;
