import { Box } from '@mui/material';
import React from 'react';
import QuestionListItem from './QuestionListItem';
import questions from '../../data/MockQuestions';
import styled from '@emotion/styled';

const QuestionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

const QuestionList = () => {
  return (
    <>
      <Box width="100%">
        <QuestionContainer>
          {questions.map(question => {
            return <QuestionListItem key={question.id} question={question} />;
          })}
        </QuestionContainer>
      </Box>
    </>
  );
};

export default QuestionList;
