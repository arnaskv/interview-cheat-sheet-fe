import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ENDPOINTS } from '../../../constants/endpoints';
import { HTTP_METHODS } from '../../../constants/http';
import useQuery from '../../../hooks/useQuery';
import Question from '../../../interfaces/Question';
import { Form, Formik } from 'formik';
import { questionSchema } from '../../../validation/question';
import CloseIcon from '@mui/icons-material/Close';
import style from './Question.module.css';
import ActionButton from '../../buttons/ActionButton';
import { StyledDialogActions } from '../../dialogs/DialogStyles';
import { useCallback, useEffect, useState } from 'react';
import { Category } from '../../../interfaces/Category';
import SubQuestionList from './SubQuestionList';

type QuestionCreateDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  addQuestion: (question: Question) => void;
};

export interface SubQuestion {
  id: string;
  title: string;
}

const QuestionCreateDialog = ({ open, setOpen, addQuestion }: QuestionCreateDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string>('');
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([]);

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
      setSubQuestions([]);
    }
  }, [open]);

  const initialValues = {
    title: '',
    category: {
      id: 0,
      title: '',
    },
  };

  const handleAddQuestion = () => {
    setSubQuestions(currentSubQuestions => {
      return [...currentSubQuestions, { id: crypto.randomUUID().toString(), title: '' }];
    });
  };

  const handleDeleteQuestion = (id: string) => {
    setSubQuestions(subQuestions.filter(q => q.id !== id));
  };

  const handleTitleChange = useCallback((index: number, value: string) => {
    setSubQuestions(currentQuestion => {
      return currentQuestion.map((q, ind) => (ind === index ? { id: q.id, title: value } : q));
    });
  }, []);

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

    //We should not pass UUID to POST body
    const questionTitles = subQuestions.map(item => {
      return item.title && item.title;
    });
    const questionWithCategory = { ...values, categoryId: selectedCategory, subQuestions: questionTitles };
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
                  <SubQuestionList
                    questions={subQuestions}
                    handleAddQuestion={handleAddQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                    handleTitleChange={handleTitleChange}
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
