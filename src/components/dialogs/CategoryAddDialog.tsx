import React, { useCallback, useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import ActionDialog from './ActionDialog';
import TextArea from '../TextArea/TextArea';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import useQuery from '../../hooks/useQuery';
import styles from '../categories/Categories.module.css';
import Loader from '../shared/Loader';

const CategoryAddDialog: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string | null>(null);
  const { sendData, isLoading, errors } = useQuery({
    url: ENDPOINTS.CATEGORY.POST,
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
      await sendData({ body: formattedCategoryData });
      toggleDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryTitle, sendData]);

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
      {errors && <div className={styles.Error}>{errors.join(', ')}</div>}
    </>
  );
};

export default CategoryAddDialog;
