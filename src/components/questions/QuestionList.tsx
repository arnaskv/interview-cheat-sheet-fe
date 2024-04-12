import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QuestionListItem from './QuestionListItem';
import styled from '@emotion/styled';
import QuestionCreateButton from './components/QuestionCreateButton';
import style from './QuestionPage.module.css';
import Question from '../../interfaces/Question';
import { ENDPOINTS } from '../../constants/endpoints';
import useQuery from '../../hooks/useQuery';
import Loader from '../shared/Loader';
import { HTTP_METHODS } from '../../constants/http';
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

  const {
    data: questions,
    isLoading,
    errors,
    getData,
  } = useQuery<Question[]>({
    url: ENDPOINTS.QUESTION.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  //state for knowing when to rerender component after POST
  const [addedQuestions, setAddedQuestions] = useState<number>(0);

  const handleCreateQuestion = () => {
    setAddedQuestions(addedQuestions + 1);
  };

  useEffect(() => {
    if (!questions) {
      getData();
    }
  }, [questions, getData]);

  useEffect(() => {
    //No need to fetch data before POST if we already have questions
    questions && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedQuestions]);

  if (isLoading) return <Loader />;
  if (errors) return <div>{errors.join(', ')}</div>;
  if (!questions || questions.length === 0) return <div>No questions found</div>;

  return (
    <>
      {detailedQuestionId !== null && (
        <DetailedQuestionCard questionId={detailedQuestionId} setQuestionId={setDetailedQuestionId} />
      )}

      <Box width="100%">
        <div className={style.ButtonContainer}>
          <QuestionCreateButton handleSubmit={handleCreateQuestion} />
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
