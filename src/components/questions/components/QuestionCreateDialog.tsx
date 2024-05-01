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

type QuestionCreateDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  addQuestion: (question: Question) => void;
};

const QuestionCreateDialog = ({ open, setOpen, addQuestion }: QuestionCreateDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string>('');

  const onSuccess = (response: Question) => {
    const question: Question = response;
    setOpen(false);
    addQuestion(question);
  };

  const createQuestionCommand = useQuery({
    url: ENDPOINTS.QUESTION.CREATE,
    httpMethod: HTTP_METHODS.POST,
    onSuccess: onSuccess,
  });

  useEffect(() => {
    if (!open) {
      setSelectedCategory('');
    }
  }, [open]);

  const initialValues = {
    title: '',
    category: {
      id: 0,
      title: '',
    },
    subQuestions: [],
  };

  const { data: fetchedCategories, getData: fetchCategories } = useQuery<Category[]>({
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

  const onSubmit = async (values: Question) => {
    if (!selectedCategory) {
      setCategoryError('Please select a category');
      return;
    }

    const questionWithCategory = {
      ...values,
      categoryId: selectedCategory,
      //Removing empty sub questions
      subQuestions: values.subQuestions?.filter(sub => String(sub) !== ''),
    };

    await createQuestionCommand.sendData(questionWithCategory);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md" disableRestoreFocus>
      <div className={style.CloseButton}>
        <IconButton>
          <CloseIcon onClick={() => setOpen(false)} />
        </IconButton>
      </div>
      <DialogTitle className={style.FormTitle}>Add question</DialogTitle>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={questionSchema}>
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
                        <AddSubquestionButton
                          startIcon={<AddIcon style={{ fontSize: '18px' }} />}
                          fullWidth
                          onClick={() => arrayHelpers.push('')}
                        >
                          Add follow up question
                        </AddSubquestionButton>
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
                Add Question
              </ActionButton>
            </StyledDialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default QuestionCreateDialog;
