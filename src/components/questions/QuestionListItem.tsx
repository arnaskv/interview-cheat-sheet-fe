import React from 'react';
import Question from '../../models/Question.interface';
import { Box, Typography } from '@mui/material';

type Props = {
  question: Question;
};

const QuestionListItem: React.FC<Props> = ({ question }) => {
  return (
    <Box className="question-item">
      <Typography>{question.text}</Typography>
    </Box>
  );
};

export default QuestionListItem;
