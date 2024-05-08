import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ENDPOINTS } from '../../../constants/endpoints';
import { HTTP_METHODS } from '../../../constants/http';
import useQuery from '../../../hooks/useQuery';
import Question from '../../../interfaces/Question';
import { FieldArray, Form, Formik } from 'formik';
import { questionSchema } from '../../../validation/question';
import CloseIcon from '@mui/icons-material/Close';
import style from './Question.module.css';
import ActionButton from '../../buttons/ActionButton';
import { StyledDialogActions } from '../../dialogs/DialogStyles';
import { useEffect, useState } from 'react';
import { Category } from '../../../interfaces/Category';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import DeleteButton from '../../buttons/DeleteButton';
import { FlexColumnContainer, AddSubquestionButton } from '../QuestionStyles';

type QuestioneFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  question?: Question;
  category?: Category; // Make sure category is defined in props
  parentId?: number;
  onSubmit: (question: Question) => void;
};

const QuestionFormDialog = ({ open, setOpen, question, category, parentId, onSubmit }: QuestioneFormDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string>('');

  const initialValues = {
    title: question ? question.title : '',
    category: question?.category || { id: 0, title: '' },
    subQuestions: [],
  };

  const { data: fetchedCategories, getData: fetchCategories } = useQuery<Category[]>({
    url: ENDPOINTS.CATEGORY.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  useEffect(() => {
    if (!open && !question) {
      setSelectedCategory('');
    }
  }, [open, question]);

  useEffect(() => {
    if (open && question && question.category) {
      setSelectedCategory(String(question.category.id));
    }
  }, [open, question]);

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

    //Filter out empty subquestions
    const filteredSubQuestions = values.subQuestions?.filter(q => String(q) !== '');

    const questionWithCategory = {
      ...values,
      categoryId: selectedCategory,
      //Formatting response so the BE can understand it, category is needed to shut up typescript
      subQuestions: filteredSubQuestions?.map(q => {
        return { title: String(q), category: { id: 0, title: '' }, subQuestions: [] };
      }),
    };

    onSubmit(questionWithCategory);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md" disableRestoreFocus>
      <div className={style.CloseButton}>
        <IconButton>
          <CloseIcon onClick={() => setOpen(false)} />
        </IconButton>
      </div>
      <DialogTitle className={style.FormTitle}> {question ? 'Edit question' : 'Add question'} </DialogTitle>
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
                    onChange={e => {
                      setSelectedCategory(e.target.value);
                      setCategoryError('');
                    }}
                    onBlur={handleBlur}
                    error={Boolean(categoryError)}
                    SelectProps={{
                      MenuProps: { disablePortal: true },
                      classes: { select: style.TextField },
                      IconComponent: ExpandMore,
                    }}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        color: '#000048',
                      },
                    }}
                  >
                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.id} className={style.TextField}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </TextField>
                  {Boolean(categoryError) && <FormHelperText error>{categoryError}</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name="subQuestions"
                    render={arrayHelpers => (
                      <FlexColumnContainer marginBottom="20px">
                        {values.subQuestions &&
                          values.subQuestions.length > 0 &&
                          values.subQuestions.map((subQuestion, index) => (
                            <FlexColumnContainer gap="4px" key={index}>
                              <Typography variant="h6" color="#666666" marginLeft="30px">
                                {`Follow up question #${index + 1}`}
                              </Typography>
                              <Box display="flex" width="100%" gap="10px">
                                <Box>
                                  <SubdirectoryArrowRightIcon
                                    sx={{ color: '#999999', height: '20px', width: '20px' }}
                                  />
                                </Box>
                                <TextField
                                  name={`subQuestions.${index}`}
                                  fullWidth
                                  multiline={true}
                                  rows={4}
                                  autoFocus
                                  className={style.TextField}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={subQuestion}
                                  error={Boolean(
                                    errors.subQuestions &&
                                      values.subQuestions &&
                                      values.subQuestions[index].toString().length > 255,
                                  )}
                                  helperText={
                                    errors.subQuestions &&
                                    values.subQuestions &&
                                    values.subQuestions[index].toString().length > 255 &&
                                    'Title is too long'
                                  }
                                  InputProps={{
                                    style: { color: '#000048' },
                                  }}
                                />
                                <DeleteButton onClick={() => arrayHelpers.remove(index)} />
                              </Box>
                            </FlexColumnContainer>
                          ))}
                        {!parentId && (
                          <AddSubquestionButton
                            startIcon={<AddIcon style={{ fontSize: '18px' }} />}
                            fullWidth
                            onClick={() => arrayHelpers.push('')}
                          >
                            Add follow up question
                          </AddSubquestionButton>
                        )}
                      </FlexColumnContainer>
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <StyledDialogActions>
              <ActionButton onClick={() => setOpen(false)} color="secondary" variant="contained">
                Cancel
              </ActionButton>
              <ActionButton type="submit" disabled={isSubmitting} color="primary" variant="contained">
                {question ? 'Update Question' : 'Add Question'}
              </ActionButton>
            </StyledDialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default QuestionFormDialog;
