import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QuestionListItem from './QuestionListItem';
import QuestionCreateButton from './components/QuestionCreateButton';
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

  const updateQuestion = (question: Question) => {
    setQuestionList(currentQuestions => {
      return currentQuestions.map(q => (q.id === question.id ? question : q));
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
        <DetailedQuestionCard questionId={detailedQuestionId} setQuestionId={setDetailedQuestionId} updateQuestion={updateQuestion} />
      )}

      <Box width="100%">
        <Box width="100%" display="flex" justifyContent="center">
          {/*This mess with width will be fixed in separate task*/}
          <HeaderContainer width="calc(90% + 48px)">
            <PageTitle
              title="Questions bank"
              subTitle="Discover, create and improve existing interview questions and build interview templates"
            />
            <ButtonContainer>
              <QuestionCreateButton addQuestion={addQuestion} />
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
      </Box>
    </>
  );
};

export default QuestionList;
