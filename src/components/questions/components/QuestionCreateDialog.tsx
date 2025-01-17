import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import { ENDPOINTS } from '../../../constants/endpoints';
import { HTTP_METHODS } from '../../../constants/http';
import useQuery from '../../../hooks/useQuery';
import Question from '../../../interfaces/Question';
import { Form, Formik } from 'formik';
import { questionSchema } from '../../../validation/question';
import CloseIcon from '@mui/icons-material/Close';
import style from './Question.module.css';
import ActionButton from '../../buttons/ActionButton';

type QuestionCreateDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const QuestionCreateDialog = ({ open, setOpen }: QuestionCreateDialogProps) => {
  const onSuccess = () => {
    setOpen(false);
  };

  const createQuestionCommand = useQuery({
    url: ENDPOINTS.QUESTION.CREATE,
    httpMethod: HTTP_METHODS.POST,
    onSuccess: onSuccess,
  });

  const initialValues = {
    title: '',
  };

  const onSubmit = async (values: Question) => {
    await createQuestionCommand.sendData(values);
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)} 
      fullWidth 
      maxWidth="md" 
      disableRestoreFocus
    >
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
              </Grid>
            </DialogContent>
            <div className={style.BlankLine}></div>
            <DialogActions>
              <ActionButton onClick={() => setOpen(false)} color="secondary" variant="contained">
                Cancel
              </ActionButton>
              <ActionButton type="submit" disabled={isSubmitting} color="primary" variant="contained">
                Add Question
              </ActionButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default QuestionCreateDialog;
