import React, { useCallback, useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import TextArea from '../textArea/TextArea';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import useQuery from '../../hooks/useQuery';
import { Category } from '../../interfaces/Category';
import { StyledDialogActions } from './DialogStyles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { categorySchema } from '../../validation/category';
import ActionDialog from './ActionDialog';

type CategoryAddDialogProps = {
  addCategory: (category: Category) => void;
};

const CategoryAddDialog: React.FC<CategoryAddDialogProps> = ({ addCategory }) => {
  const [open, setOpen] = useState<boolean>(false);
  const initialValues = {
    title: '',
  };

  const onSuccess = (response: Category) => {
    const category: Category = response;
    setOpen(false);
    addCategory(category);
  };

  const { sendData } = useQuery<Category>({
    url: ENDPOINTS.CATEGORY.CREATE,
    httpMethod: HTTP_METHODS.POST,
    onSuccess: onSuccess,
  });

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleSubmit = useCallback(async () => {
    await sendData(initialValues);
    toggleDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendData]);

  return (
    <>
      <ActionButton onClick={toggleDialog} startIcon={<AddIcon />} variant="contained" color="primary">
        Add Category
      </ActionButton>
      <ActionDialog title="Add Category" open={open} handleClose={toggleDialog}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={categorySchema}>
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div style={{ padding: '0 24px 24px 24px' }}>
                <Field
                  as={TextArea}
                  name="title"
                  margin="dense"
                  contentType="Category"
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  autoFocues
                  error={touched.title && Boolean(errors.title)}
                />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name="title" />
                </div>
              </div>
              <StyledDialogActions>
                <ActionButton onClick={toggleDialog} color="secondary" variant="contained">
                  Cancel
                </ActionButton>
                <ActionButton
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  color="primary"
                  variant="contained"
                >
                  Add Category
                </ActionButton>
              </StyledDialogActions>
            </Form>
          )}
        </Formik>
      </ActionDialog>
    </>
  );
};

export default CategoryAddDialog;
