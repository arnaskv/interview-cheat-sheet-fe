import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import { ENDPOINTS } from '../../../constants/endpoints';
import { HTTP_METHODS } from '../../../constants/http';
import useQuery from '../../../hooks/useQuery';
import Question from '../../../interfaces/Question';
import { Form, Formik } from 'formik';
import { questionSchema } from '../../../validation/question';
import CloseIcon from '@mui/icons-material/Close';
import style from './Question.module.css';

type QuestionCreateDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSubmit: () => void;
};

const QuestionCreateDialog = ({ open, setOpen, handleSubmit }: QuestionCreateDialogProps) => {
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
    await createQuestionCommand.sendData(values).then(handleSubmit);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
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
              <Button onClick={() => setOpen(false)} className={style.CancleButton}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className={style.SubmitButton}>
                Add Question
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default QuestionCreateDialog;
