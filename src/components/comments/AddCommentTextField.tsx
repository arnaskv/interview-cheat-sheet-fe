import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField, Box } from '@mui/material';
import SentButton from '../buttons/SendButton';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import Comment from '../../interfaces/Comment';
import styles from './AddCommentTextField.module.css';

type Props = {
  questionId: number;
  onSuccess: () => void;
  setCommentToEdit: (comment: Comment | null) => void;
  commentToEdit: Comment | null;
};

const AddCommentTextField: React.FC<Props> = ({ questionId, onSuccess, setCommentToEdit, commentToEdit }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (commentToEdit) {
      setContent(commentToEdit.content);
    } else {
      setContent('');
    }
  }, [commentToEdit]);

  const commentQuery = useQuery<Comment>({
    url: ENDPOINTS.COMMENT.POST(questionId),
    httpMethod: HTTP_METHODS.POST,
    onSuccess: () => {
      setContent('');
      onSuccess();
    },
  });

  const commentEditQuery = useQuery<Comment>({
    url: ENDPOINTS.COMMENT.UPDATE,
    httpMethod: HTTP_METHODS.PATCH,
    onSuccess: () => {
      setContent('');
      setCommentToEdit(null);
      onSuccess();
    },
  });

  const handleSubmit = async () => {
    if (commentToEdit) {
      await commentEditQuery.sendData({ id: commentToEdit.id, content });
      return;
    }

    await commentQuery.sendData({ content });
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <TextField
      className={styles.TextField}
      id="new-comment"
      placeholder="Add a note on candidate answer"
      multiline
      fullWidth
      variant="outlined"
      rows={4}
      value={content}
      onChange={event => setContent(event.target.value)}
      onKeyDown={handleEnter}
      sx={{
        '& fieldset': {
          borderRadius: '12px',
          border: 'none',
        },
      }}
      inputProps={{ maxLength: 255 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Box sx={{ height: '100%' }}>
              <SentButton disabled={!content} onClick={handleSubmit} />
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AddCommentTextField;
