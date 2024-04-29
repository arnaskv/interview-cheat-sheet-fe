import React, { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import TextArea from '../textArea/TextArea';
import { Category } from '../../interfaces/Category';
import { StyledDialogActions } from './DialogStyles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { categorySchema } from '../../validation/category';
import ActionDialog from './ActionDialog';

type CategoryAddDialogProps = {
  onSubmit: (category: Category) => void;
  category?: Category;
  action: 'Add Category' | 'Edit Category';
};

const CategoryFormDialog: React.FC<CategoryAddDialogProps> = ({ onSubmit, category, action }) => {
  const [open, setOpen] = useState<boolean>(false);
  const initialValues = {
    title: category ? category.title : '',
  };

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleSubmit = (values: Category) => {
    onSubmit(values);
    toggleDialog();
  };

  return (
    <>
      <ActionButton onClick={toggleDialog} startIcon={<AddIcon />} variant="contained" color="primary">
        {action}
      </ActionButton>
      <ActionDialog title={action} open={open} handleClose={toggleDialog}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={categorySchema}>
          {({ values, handleChange, errors, touched, isSubmitting }) => (
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
                  value={values.title}
                  onChange={handleChange}
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
                  {action}
                </ActionButton>
              </StyledDialogActions>
            </Form>
          )}
        </Formik>
      </ActionDialog>
    </>
  );
};

export default CategoryFormDialog;
