import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import QuestionListItem from './QuestionListItem';
import styled from '@emotion/styled';
import Question from '../../models/Question.interface';
import { ENDPOINTS } from '../../constants/endpoints';
import useQuery from '../../hooks/useQuery';
import Loader from '../shared/Loader';

const QuestionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

const QuestionList = () => {
  const {
    data: questions,
    isLoading,
    errors,
    getData,
  } = useQuery<Question[]>({
    url: ENDPOINTS.QUESTION.GET_ALL,
    httpMethod: 'GET',
  });

  useEffect(() => {
    if (!questions) {
      getData();
    }
  }, [questions, getData]);

  if (isLoading) return <Loader />;
  if (errors) return <div>{errors.join(', ')}</div>;
  if (!questions || questions.length === 0) return <div>No questions found</div>;

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
