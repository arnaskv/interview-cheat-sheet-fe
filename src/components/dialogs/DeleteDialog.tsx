import React, { useCallback } from 'react';
import useQuery from '../../hooks/useQuery';
import { HTTP_METHODS } from '../../constants/http';
import ActionDialog from './ActionDialog';
import Loader from '../shared/Loader';
import { StyledDialogActions } from './DialogStyles';
import ActionButton from '../buttons/ActionButton';

type DeleteProps = {
  itemId: string;
  deleteEndpoint: (id: string) => string;
  dialogTitle: string;
  dialogDescription?: string | React.ReactNode;
  refreshData?: () => void;
  deleteLabel: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DeleteDialog: React.FC<DeleteProps> = ({
  itemId,
  deleteEndpoint,
  dialogTitle,
  dialogDescription,
  refreshData,
  deleteLabel,
  open,
  setOpen,
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
      <ActionDialog title={dialogTitle} open={open} handleClose={toggleDialog} onSubmit={() => handleSubmit()}>
        {isLoading ? <Loader /> : <div style={{ padding: '24px' }}>{dialogDescription}</div>}
        <StyledDialogActions>
          <ActionButton onClick={toggleDialog} color="secondary" variant="contained">
            Cancel
          </ActionButton>
          <ActionButton type="submit" color="primary" variant="contained">
            {deleteLabel}
          </ActionButton>
        </StyledDialogActions>
      </ActionDialog>
      {errors && <div style={{ color: '#c70014', textAlign: 'center' }}>{errors.join(', ')}</div>}
    </>
  );
};

export default DeleteDialog;
