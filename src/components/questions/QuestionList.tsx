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
import { QuestionContainer, FilteringContainer } from './QuestionPageStyles';
import PageTitle from '../shared/PageTitle';
import NotFoundPage from '../shared/NotFoundPage';
import { ButtonContainer, HeaderContainer } from '../shared/PageTitleStyles';
import { useNavigate, useParams } from 'react-router-dom';
import DropDownList from '../dropDownList/DropDownList';
import sortingTypes from '../../constants/sortingTypes';
import SearchBar from './SearchBar';

const QuestionList = () => {
  const { id } = useParams();
  const [detailedQuestionId, setDetailedQuestionId] = React.useState<number | null>(id ? Number(id) : null);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [parentQuestionId, setParentQuestionId] = useState<number | null>(null);
  const [sortingOption, setSortingOption] = useState('dateCreatedDesc'); // Default sorting option
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const navigate = useNavigate();

  const {
    data: questions,
    isLoading,
    errors,
    getData,
  } = useQuery<Question[]>({
    url: ENDPOINTS.QUESTION.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
    queryParams: { sort: sortingOption },
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
      const parentQuestion = questionList.find(q => q.id === parentQuestionId);

      if (parentQuestion) {
        const subQuestions = parentQuestion.subQuestions?.map(q => (q.id === question.id ? question : q));
        parentQuestion.subQuestions = subQuestions;

        setQuestionList(currentQuestions => {
          return currentQuestions.map(q => (q.id === parentQuestion.id ? parentQuestion : q));
        });
      }
    }
  };

  const deleteQuestion = (id: number) => {
    if (parentQuestionId === null) {
      setQuestionList(currentQuestions => {
        return currentQuestions.filter(q => q.id !== id);
      });
    } else {
      const parentQuestion = questionList.find(q => q.id === parentQuestionId);

      if (parentQuestion) {
        const subQuestions = parentQuestion.subQuestions?.filter(q => q.id !== id);
        parentQuestion.subQuestions = subQuestions;

        setQuestionList(currentQuestions => {
          return currentQuestions.map(q => (q.id === parentQuestion.id ? parentQuestion : q));
        });
      }
    }

    setQuestionIds(null, null);
  };

  useEffect(() => {
    if (!questions && !isSearching) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (questions) {
      setQuestionList(questions);
    }
  }, [questions]);

  useEffect(() => {
    getData({ sort: sortingOption });
  }, [sortingOption]);

  const handleSortingChange = async (selectedOption: string) => {
    setSortingOption(selectedOption);

    const updatedQuestions = await getData({ sort: selectedOption });

    if (!!updatedQuestions) {
      setQuestionList(updatedQuestions);
    }
  };

  const onCreateSuccess = (response: Question) => {
    const question: Question = response;
    setQuestionList(currentQuestions => {
      return [question, ...currentQuestions];
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

  const handleQuestionClick = (qestionId: number | null, parentId: number | null) => {
    navigate(`/${qestionId}`);
    setDetailedQuestionId(qestionId);
    setParentQuestionId(parentId);
  };

  if (isLoading) return <Loader />;
  if (errors) return <div>{errors.join(', ')}</div>;

  if (detailedQuestionId !== null) {
    const detailedQuestion =
      questionList.find(q => q.id === detailedQuestionId) ||
      questionList.flatMap(q => q.subQuestions || []).find(q => q.id === detailedQuestionId);

    if (!detailedQuestion) {
      return <NotFoundPage missingComponent="question" setMissingComponent={setDetailedQuestionId} />;
    }
  }

  return (
    <>
      {detailedQuestionId !== null && (
        <DetailedQuestionCard
          questionId={detailedQuestionId}
          parentId={parentQuestionId ? parentQuestionId : undefined}
          setQuestionId={setQuestionIds}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
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
        <Box paddingBottom="1rem">
          <SearchBar questions={questions} onSearchResult={setQuestionList} isSearching={setIsSearching} />
        </Box>{' '}
        <FilteringContainer>
          <span>Sort by:</span>
          <DropDownList value={sortingOption} onChange={handleSortingChange} options={sortingTypes} />
        </FilteringContainer>
        {!questionList || questionList.length === 0 ? (
          <div>No questions found</div>
        ) : (
          <QuestionContainer>
            {questionList.map(question => {
              return <QuestionListItem key={question.id} question={question} setQuestionId={handleQuestionClick} />;
            })}
          </QuestionContainer>
        )}
      </div>
    </>
  );
};

export default QuestionList;
