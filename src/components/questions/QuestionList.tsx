import { Box } from '@mui/material';
import React from 'react';
import QuestionListItem from './QuestionListItem';
import questions from '../../data/MockQuestions';
import styled from '@emotion/styled';
import QuestionCreateButton from './components/QuestionCreateButton';
import style from './QuestionPage.module.css';
import DetailedQuestionCard from './DetailedQuestionCard';

const QuestionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

const QuestionList = () => {
  const [detailedQuestionId, setDetailedQuestionId] = React.useState<number | null>(null);

  return (
    <>
      {detailedQuestionId !== null && (
        <DetailedQuestionCard questionId={detailedQuestionId} setQuestionId={setDetailedQuestionId} />
      )}

      <Box width="100%">
        <div className={style.ButtonContainer}>
          <QuestionCreateButton />
        </div>
        <QuestionContainer>
          {questions.map(question => {
            return <QuestionListItem key={question.id} question={question} setQuestionId={setDetailedQuestionId} />;
          })}
        </QuestionContainer>
      </Box>
    </>
  );
};

export default QuestionList;
