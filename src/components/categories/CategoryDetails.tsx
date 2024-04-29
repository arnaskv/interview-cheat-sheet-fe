import React, { useEffect, useState } from 'react';
import { Category } from '../../interfaces/Category';
import styles from './Categories.module.css';
import Loader from '../shared/Loader';
import useQuery from '../../hooks/useQuery';
import DeleteDialog from '../dialogs/DeleteDialog';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import CategoryFormDialog from '../dialogs/CategoryFormDialog';

interface CategoryDetailsProps {
  categoryId: string;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ categoryId }) => {
  const [open, setOpen] = useState(false);

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

  const onUpdateSuccess = (response: Category) => {
    if (!category) {
      return;
    }

    category.title = response.title;
  };

  const updateCategoryCommand = useQuery({
    url: ENDPOINTS.CATEGORY.UPDATE,
    httpMethod: HTTP_METHODS.PATCH,
    onSuccess: onUpdateSuccess,
  });

  const handleUpdateSubmit = async (values: Category) => {
    values.id = Number(categoryId);
    await updateCategoryCommand.sendData(values);
  };

  if (isLoading) return <Loader />;
  if (errors) return <div className={styles.Error}>{errors.join(', ')}</div>;
  if (!category) return <div>No category found</div>;

  return (
    <div>
      <h2>{category.title}</h2>
      <ActionButton onClick={() => setOpen(true)} startIcon={<DeleteIcon />} variant="contained" color="primary">
        Delete
      </ActionButton>
      <CategoryFormDialog onSubmit={handleUpdateSubmit} category={category} action="Edit Category" />
      <DeleteDialog
        itemId={categoryId}
        deleteEndpoint={ENDPOINTS.CATEGORY.DELETE}
        dialogTitle="Delete this Category?"
        dialogDescription="If you delete this category, all follow up questions would be deleted. Are you sure?"
        deleteLabel="Delete Category"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default CategoryDetails;
