import React, { useState } from 'react';
import { InputAdornment, TextField, Box } from '@mui/material';
import AddCommentButton from './AddCommentButton';

function AddCommentTextbox() {
  const [text, setText] = useState('');

  const addComment = () => {
    if (text) {
      console.log(text);
      setText('');
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addComment();
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
      value={text}
      onChange={event => setText(event.target.value)}
      onKeyDown={handleEnter}
      sx={{
        '& fieldset': {
          borderRadius: '16px',
        },
      }}
      inputProps={{ maxLength: 255 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Box sx={{ height: '100%' }}>
              <AddCommentButton disabled={!text ? true : false} onClick={addComment} />
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default AddCommentTextbox;
