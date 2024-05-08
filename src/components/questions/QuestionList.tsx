import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QuestionListItem from './QuestionListItem';
import QuestionFromButton from './components/QuestionFromButton';
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
  const [parentQuestionId, setParentQuestionId] = useState<number | null>(null);

  const {
    data: questions,
    isLoading,
    errors,
    getData,
  } = useQuery<Question[]>({
    url: ENDPOINTS.QUESTION.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  const setQuestionIds = (questionId: number | null, parentId: number | null) => {
    setDetailedQuestionId(questionId);
    setParentQuestionId(parentId);
  };

  const updateQuestion = (question: Question) => {
    if (parentQuestionId === null) {
      setQuestionList(currentQuestions => {
        return currentQuestions.map(q => (q.id === question.id ? question : q));
      });
    } else {
      //If we are editing child question, there is some more work to be done
      const parentQuestion = questionList.find(q => q.id === parentQuestionId);
      //In theory this should never be false, it is here just to shut up typescript
      if (parentQuestion) {
        const subQuestions = parentQuestion.subQuestions?.map(q => (q.id === question.id ? question : q));
        parentQuestion.subQuestions = subQuestions;

        setQuestionList(currentQuestions => {
          return currentQuestions.map(q => (q.id === parentQuestion.id ? parentQuestion : q));
        });
      }
    }
  };

  useEffect(() => {
    if (!questions) {
      getData();
    }

    questionList.length === 0 && questions && setQuestionList(questions);
    // eslint-disable-next-line
  }, [questions, getData]);

  const onCreateSuccess = (response: Question) => {
    const question: Question = response;
    setQuestionList(currentQuestions => {
      return [...currentQuestions, question];
    });
  };

  const createQuestionCommand = useQuery({
    url: ENDPOINTS.QUESTION.CREATE,
    httpMethod: HTTP_METHODS.POST,
    onSuccess: onCreateSuccess,
  });

  const onCreateSubmit = async (values: Question) => {
    await createQuestionCommand.sendData(values);
  };

  if (isLoading) return <Loader />;
  if (errors) return <div>{errors.join(', ')}</div>;

  return (
    <>
      {detailedQuestionId !== null && (
        <DetailedQuestionCard
          questionId={detailedQuestionId}
          parentId={parentQuestionId ? parentQuestionId : undefined}
          setQuestionId={setQuestionIds}
          updateQuestion={updateQuestion}
        />
      )}

      <div className="PageContainer">
        <Box width="100%" display="flex" justifyContent="center">
          <HeaderContainer>
            <PageTitle
              title="Questions bank"
              subTitle="Discover, create and improve existing interview questions and build interview templates"
            />
            <ButtonContainer>
              <QuestionFromButton onSubmit={onCreateSubmit} />
            </ButtonContainer>
          </HeaderContainer>
        </Box>

        {!questionList || questionList.length === 0 ? (
          <div>No questions found</div>
        ) : (
          <QuestionContainer>
            {questionList.map(question => {
              return <QuestionListItem key={question.id} question={question} setQuestionId={setQuestionIds} />;
            })}
          </QuestionContainer>
        )}
      </div>
    </>
  );
};

export default QuestionList;
