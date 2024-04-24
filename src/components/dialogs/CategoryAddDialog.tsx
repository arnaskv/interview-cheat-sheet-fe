import React, { useCallback, useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import ActionDialog from './ActionDialog';
import TextArea from '../textArea/TextArea';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import useQuery from '../../hooks/useQuery';
import Loader from '../shared/Loader';
import { Category } from '../../interfaces/Category';


interface CategoryAddDialogProps {
  setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>;
}

const CategoryAddDialog: React.FC<CategoryAddDialogProps> = ({ setCategories }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string | null>(null);
  const { sendData, isLoading, errors } = useQuery<Category>({
    url: ENDPOINTS.CATEGORY.CREATE,
    httpMethod: HTTP_METHODS.POST,
  });

  const toggleDialog = () => {
    setOpen(!open);
    if (!open) {
      setCategoryTitle(null);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (categoryTitle) {
      const formattedCategoryData = { title: categoryTitle };
      const response = await sendData(formattedCategoryData);
      if (response && 'data' in response && !('message' in response)) {
        setCategories(prevCategories => {
          const categoriesArray = prevCategories || [];
          const newCategory = response.data as Category;
          return [newCategory, ...categoriesArray];
        });
      }
      toggleDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryTitle, sendData, setCategories]);

  return (
    <>
      <ActionButton onClick={toggleDialog} startIcon={<AddIcon />} variant="contained" color="primary">
        Add Category
      </ActionButton>
      <ActionDialog
        title="Add Category"
        open={open}
        handleClose={toggleDialog}
        submitButtonLabel="Add Category"
        onSubmit={() => handleSubmit()}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <TextArea
            margin="dense"
            contentType="Category"
            variant="outlined"
            required
            fullWidth
            multiline
            rows={4}
            value={categoryTitle || ''}
            onChange={e => setCategoryTitle(e.target.value)}
          />
        )}
      </ActionDialog>
      {errors && <div style={{ color: '#c70014', textAlign: 'center' }}>{errors.join(', ')}</div>}
    </>
  );
};

export default CategoryAddDialog;
