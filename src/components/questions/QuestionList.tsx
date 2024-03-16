import { Box } from '@mui/material';
import React from 'react';
import QuestionListItem from './QuestionListItem';
import questions from '../../data/MockQuestions';

const QuestionList = () => {
  return (
    <>
      <Box width="100%">
        <h2>Questions</h2>
        <Box width="100%" display="flexbox" justifyContent="center" alignItems="center" alignContent="center">
          {questions.map(question => {
            return <QuestionListItem key={question.id} question={question} />;
          })}
        </Box>
      </Box>
    </>
  );
};

export default QuestionList;
