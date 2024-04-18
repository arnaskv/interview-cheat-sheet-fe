import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import QuestionListItem from './QuestionListItem';
import QuestionCreateButton from './components/QuestionCreateButton';
import Question from '../../interfaces/Question';
import { ENDPOINTS } from '../../constants/endpoints';
import useQuery from '../../hooks/useQuery';
import Loader from '../shared/Loader';
import { HTTP_METHODS } from '../../constants/http';
import DetailedQuestionCard from './DetailedQuestionCard';
import { HeaderContainer, QuestionContainer, ButtonContainer } from './QuestionPageStyles';


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
      {detailedQuestionId !== null && (
        <DetailedQuestionCard questionId={detailedQuestionId} setQuestionId={setDetailedQuestionId} />
      )}

      <Box width="100%">
        <HeaderContainer>
          <ButtonContainer>
            <QuestionCreateButton />
          </ButtonContainer>
        </HeaderContainer>
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
