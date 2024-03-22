import { Box } from '@mui/material';
import React from 'react';
import QuestionListItem from './QuestionListItem';
import questions from '../../data/MockQuestions';
import './QuestionList.css';

const QuestionList = () => {
  return (
    <>
      <Box width="100%">
        <h2>Questions:</h2>
        <Box className="question-container">
          {questions.map(question => {
            return <QuestionListItem key={question.id} question={question} />;
          })}
        </Box>
      </Box>
    </>
  );
};

export default QuestionList;
