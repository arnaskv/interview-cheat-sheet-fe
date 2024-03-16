import React from 'react';
import Question from '../../models/Question.interface';
import { Box, Typography } from '@mui/material';

type Props = {
  question: Question;
};

const QuestionListItem: React.FC<Props> = ({ question }) => {
  return (
    <Box sx={{ width: '95%', padding: '5px', border: '0.5pt solid', borderRadius: '5px', marginBottom: '3px' }}>
      <Typography>{question.text}</Typography>
    </Box>
  );
};

export default QuestionListItem;
