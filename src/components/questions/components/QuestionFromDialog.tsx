import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, MenuItem, FormHelperText } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useQuery from '../../../hooks/useQuery';
import { ENDPOINTS } from '../../../constants/endpoints';
import { HTTP_METHODS } from '../../../constants/http';
import Question from '../../../interfaces/Question';
import { Form, Formik } from 'formik';
import { questionSchema } from '../../../validation/question';
import CloseIcon from '@mui/icons-material/Close';
import style from './Question.module.css';
import ActionButton from '../../buttons/ActionButton';
import { StyledDialogActions } from '../../dialogs/DialogStyles';
import { Category } from '../../../interfaces/Category';
import { useState, useEffect } from 'react';

type QuestioneFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  question?: Question;
  category?: Category; // Make sure category is defined in props
  onSubmit: (question: Question) => void;
};

const QuestionFromDialog = ({ open, setOpen, question, category, onSubmit }: QuestioneFormDialogProps) => {

  const [selectedCategory, setSelectedCategory] = useState< string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string>('');

  useEffect(() => {
    if (!open) {
      setSelectedCategory('');
    }
  }, [open]);

  const initialValues = {
    title: question ? question.title : '',
    category: category ? category : { id: 0, title: '' },
  };

  const {
    data: fetchedCategories,
    getData: fetchCategories,
  } = useQuery<Category[]>({
    url: ENDPOINTS.CATEGORY.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    } else {
      fetchCategories();
    }
  }, [fetchedCategories, fetchCategories]);

  useEffect(() => {
    if (question && question.category) {
      setSelectedCategory(String(question.category.id));
    }
  }, [question]);

  const handleSubmit = (values: Question) => {
    if (!selectedCategory) {
      setCategoryError('Please select a category');
      return;
    }
    const questionWithCategory = { ...values, categoryId: selectedCategory };
    onSubmit(questionWithCategory);
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md" disableRestoreFocus>
      <div className={style.CloseButton}>
        <IconButton>
          <CloseIcon onClick={() => setOpen(false)} />
        </IconButton>
      </div>
      <DialogTitle className={style.FormTitle}> {question ? 'Edit question' : 'Add question' } </DialogTitle>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={questionSchema}>
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6} className={style.TextTitle}>
                  Question
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    autoFocus
                    name="title"
                    className={style.TextField}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    InputProps={{
                      style: { color: '#000048' },
                    }}
                  />
                </Grid>

                <Grid item xs={6} className={style.TextTitle}>
                  Category
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    className={style.TextField}
                    name="category"
                    value={selectedCategory}
                    variant="outlined"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCategoryError('');
                    }}
                    onBlur={handleBlur}
                    error={Boolean(categoryError)}

                    SelectProps={{
                      classes: { select: style.TextField },
                      IconComponent: ExpandMore,
                    }}

                    sx={{
                      '& .MuiSvgIcon-root':{
                        color: '#000048',
                      }
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id} className={style.TextField}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </TextField>
                  {Boolean(categoryError) && <FormHelperText error>{categoryError}</FormHelperText>}
                </Grid>
              </Grid>
            </DialogContent>
            <StyledDialogActions>
              <ActionButton onClick={() => setOpen(false)} color="secondary" variant="contained">
                Cancel
              </ActionButton>
              <ActionButton type="submit" disabled={isSubmitting} color="primary" variant="contained">
                {question ? 'Update Question' : 'Add Question' }
              </ActionButton>
            </StyledDialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default QuestionFromDialog;
