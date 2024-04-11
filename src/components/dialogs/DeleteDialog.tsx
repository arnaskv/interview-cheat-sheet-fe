import React, { useCallback, useState } from 'react';
import useQuery from '../../hooks/useQuery';
import { HTTP_METHODS } from '../../constants/http';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import ActionDialog from './ActionDialog';
import Loader from '../shared/Loader';

type DeleteProps = {
  itemId: string;
  deleteEndpoint: (id: string) => string;
  dialogTitle: string;
  dialogDescription: string | React.ReactNode;
};

const CategoryDeleteDialog: React.FC<DeleteProps> = ({ itemId, deleteEndpoint, dialogTitle, dialogDescription }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { sendData, isLoading, errors } = useQuery({
    url: deleteEndpoint(itemId),
    httpMethod: HTTP_METHODS.DELETE,
  });

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleSubmit = useCallback(async () => {
    if (itemId) {
      await sendData({ id: itemId });
      toggleDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, sendData]);

  return (
    <>
      <ActionButton onClick={toggleDialog} startIcon={<DeleteIcon />} variant="contained" color="error">
        Delete
      </ActionButton>
      <ActionDialog
        title={dialogTitle}
        open={open}
        handleClose={toggleDialog}
        submitButtonLabel="Delete"
        onSubmit={() => handleSubmit()}
      >
        {isLoading ? <Loader /> : <>{dialogDescription}</>}
      </ActionDialog>
      {errors && <div style={{ color: '#c70014', textAlign: 'center' }}>{errors.join(', ')}</div>}
    </>
  );
};

export default CategoryDeleteDialog;
