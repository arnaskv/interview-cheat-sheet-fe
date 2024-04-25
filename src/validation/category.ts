import * as yup from 'yup';

export const categorySchema = yup.object({
  title: yup.string().required('Title is required').max(256, 'Title is too long'),
});
