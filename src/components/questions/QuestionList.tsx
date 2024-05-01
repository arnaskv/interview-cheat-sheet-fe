import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QuestionListItem from './QuestionListItem';
import QuestionFormButton from './components/QuestionFormButton';
import Question from '../../interfaces/Question';
import { ENDPOINTS } from '../../constants/endpoints';
import useQuery from '../../hooks/useQuery';
import Loader from '../shared/Loader';
import { HTTP_METHODS } from '../../constants/http';
import DetailedQuestionCard from './DetailedQuestionCard';
import { QuestionContainer } from './QuestionPageStyles';
import PageTitle from '../shared/PageTitle';
import { ButtonContainer, HeaderContainer } from '../shared/PageTitleStyles';

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

  return (
    <>
      {detailedQuestionId !== null && (
        <DetailedQuestionCard questionId={detailedQuestionId} setQuestionId={setDetailedQuestionId} />
      )}

      <div className="PageContainer">
        <Box width="100%" display="flex" justifyContent="center">
          <HeaderContainer>
            <PageTitle
              title="Questions bank"
              subTitle="Discover, create and improve existing interview questions and build interview templates"
            />
            <ButtonContainer>
              <QuestionFormButton addQuestion={addQuestion} />
            </ButtonContainer>
          </HeaderContainer>
        </Box>

        {!questionList || questionList.length === 0 ? (
          <div>No questions found</div>
        ) : (
          <QuestionContainer>
            {questionList.map(question => {
              return <QuestionListItem key={question.id} question={question} setQuestionId={setDetailedQuestionId} />;
            })}
          </QuestionContainer>
        )}
      </div>
    </>
  );
};

export default QuestionList;
