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
  const [questionList, setQuestionList] = useState<Question[]>([]);

  const {
    data: questions,
    isLoading,
    errors,
    getData,
  } = useQuery<Question[]>({
    url: ENDPOINTS.QUESTION.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  const addQuestion = (question: Question) => {
    setQuestionList(currentQuestions => {
      return [...currentQuestions, question];
    });
  };

  useEffect(() => {
    if (!questions) {
      getData();
    }

    questionList.length === 0 && questions && setQuestionList(questions);
    // eslint-disable-next-line
  }, [questions, getData]);

  if (isLoading) return <Loader />;
  if (errors) return <div>{errors.join(', ')}</div>;
  if (!questionList || questionList.length === 0) return <div>No questions found</div>;

  return (
    <>
      {detailedQuestionId !== null && (
        <DetailedQuestionCard questionId={detailedQuestionId} setQuestionId={setDetailedQuestionId} />
      )}

      <Box width="100%">
        <div className={style.ButtonContainer}>
          <QuestionCreateButton addQuestion={addQuestion} />
        </div>
        <QuestionContainer>
          {questionList.map(question => {
            return <QuestionListItem key={question.id} question={question} setQuestionId={setDetailedQuestionId} />;
          })}
        </QuestionContainer>
      </Box>
    </>
  );
};

export default QuestionList;
