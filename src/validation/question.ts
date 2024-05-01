import * as yup from 'yup';

export const questionSchema = yup.object({
  title: yup.string().required('Title is required').max(255, 'Title is too long'),
  subQuestions: yup.array().of(yup.string().max(255, 'Title is too long')),
});
