import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
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

type QuestioneEditDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  question: Question;
  updateQuestion: (question: Question) => void;
};

const QuestionEditDialog = ({ open, setOpen, question, updateQuestion }: QuestioneEditDialogProps) => {
  const onSuccess = (response: Question) => {
    const question: Question = response;
    setOpen(false);
    updateQuestion(question);

    question.title = response.title;
  };

  const updateQuestionCommand = useQuery({
    url: ENDPOINTS.QUESTION.UPDATE,
    httpMethod: HTTP_METHODS.PATCH,
    onSuccess: onSuccess,
  });

  const initialValues = {
    title: question.title
  };

  const onSubmit = async (values: Question) => {
    values.id = question.id;
    await updateQuestionCommand.sendData(values);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md" disableRestoreFocus>
      <div className={style.CloseButton}>
        <IconButton>
          <CloseIcon onClick={() => setOpen(false)} />
        </IconButton>
      </div>
      <DialogTitle className={style.FormTitle}>Edit question</DialogTitle>
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
              </Grid>
            </DialogContent>
            <StyledDialogActions>
              <ActionButton onClick={() => setOpen(false)} color="secondary" variant="contained">
                Cancel
              </ActionButton>
              <ActionButton type="submit" disabled={isSubmitting} color="primary" variant="contained">
                Update Question
              </ActionButton>
            </StyledDialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default QuestionEditDialog;
