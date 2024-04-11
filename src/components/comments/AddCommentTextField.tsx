import React, { useState } from 'react';
import { InputAdornment, TextField, Box } from '@mui/material';
import SentButton from '../buttons/SendButton';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import Comment from '../../interfaces/Comment';

const MAX_LENGTH = 255;

type Props = {
  sendSuccess: () => void;
};

const AddCommentTextField: React.FC<Props> = ({ sendSuccess }) => {
  const [content, setContent] = useState('');

  const onSuccess = () => {
    setContent('');
    sendSuccess();
  };

  const commentQuery = useQuery<Comment>({
    url: ENDPOINTS.COMMENT.POST,
    httpMethod: HTTP_METHODS.POST,
    onSucess: onSuccess,
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
