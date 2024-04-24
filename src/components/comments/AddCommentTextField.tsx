import React, { useState } from 'react';
import { InputAdornment, TextField, Box } from '@mui/material';
import SentButton from '../buttons/SendButton';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import Comment from '../../interfaces/Comment';
import styles from './AddCommentTextField.module.css';

const MAX_LENGTH = 255;

type Props = {
  onSuccess: () => void;
};

const AddCommentTextField: React.FC<Props> = ({ onSuccess }) => {
  const [content, setContent] = useState('');

  const commentQuery = useQuery<Comment>({
    url: ENDPOINTS.COMMENT.POST,
    httpMethod: HTTP_METHODS.POST,
    onSuccess: () => {
      setContent('');
      onSuccess();
    },
  });

  const handleSubmit = async () => {
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
          borderRadius: '16px',
          border: 'none',
        },
      }}
      inputProps={{ maxLength: MAX_LENGTH }}
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
