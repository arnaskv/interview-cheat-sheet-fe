import React, { useCallback } from 'react';
import useQuery from '../../hooks/useQuery';
import { HTTP_METHODS } from '../../constants/http';
import ActionDialog from './ActionDialog';
import Loader from '../shared/Loader';

type DeleteProps = {
  itemId: string;
  deleteEndpoint: (id: string) => string;
  dialogTitle: string;
  dialogDescription?: string | React.ReactNode;
  refreshData?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DeleteDialog: React.FC<DeleteProps> = ({ 
  itemId, 
  deleteEndpoint, 
  dialogTitle, 
  dialogDescription, 
  refreshData, 
  open, 
  setOpen 
}) => {

  const onSuccess = () => {
    refreshData && refreshData();
  };

  const { sendData, isLoading, errors } = useQuery({
    url: deleteEndpoint(itemId),
    httpMethod: HTTP_METHODS.DELETE,
    onSuccess,
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

export default DeleteDialog;
