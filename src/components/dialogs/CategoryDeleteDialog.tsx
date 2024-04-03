import React, { useCallback, useState } from 'react';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import ActionDialog from './ActionDialog';
import Loader from '../shared/Loader';

type CategoryDeleteProps = {
  categoryId: string;
};

const CategoryDeleteDialog: React.FC<CategoryDeleteProps> = ({ categoryId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { sendData, isLoading, errors } = useQuery({
    url: ENDPOINTS.CATEGORY.DELETE(categoryId),
    httpMethod: HTTP_METHODS.DELETE,
  });

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleSubmit = useCallback(async () => {
    if (categoryId) {
      await sendData({ id: categoryId });
      toggleDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sendData]);

  return (
    <>
      <ActionButton onClick={toggleDialog} startIcon={<DeleteIcon />} variant="contained" color="primary">
        Delete
      </ActionButton>
      <ActionDialog
        title="Delete this Category?"
        open={open}
        handleClose={toggleDialog}
        submitButtonLabel="Delete"
        onSubmit={() => handleSubmit()}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>If you delete this category, all follow up questions would be deleted. Are you sure?</>
        )}
      </ActionDialog>
      {errors && <div style={{ color: '#c70014', textAlign: 'center' }}>{errors.join(', ')}</div>}
    </>
  );
};

export default CategoryDeleteDialog;
