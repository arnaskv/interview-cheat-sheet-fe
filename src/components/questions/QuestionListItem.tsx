import React, { useState } from 'react';
import Question from '../../interfaces/Question';
import { Box } from '@mui/material';
import { QuestionInfoContainer, QuestionItem, QuestionItemContainer, QuestionText } from './QuestionStyles';
import QuestionStats from './QuestionStats';
import ChevronButton from '../buttons/ChevronButton';

type Props = {
  question: Question;
  setQuestionId: (id: number | null, parentId: number | null) => void;
  parentId?: number;
};

const QuestionListItem: React.FC<Props> = ({ question, setQuestionId, parentId }) => {
  const [subQuestionsOpen, setSubQuestionsOpen] = useState<boolean>(false);

  return (
    <>
      <Box width="100%">
        <QuestionItemContainer marginLeft={parentId && '40px'}>
          <QuestionItem>
            {question.subQuestions && question.subQuestions.length !== 0 && (
              <ChevronButton
                onClick={() => {
                  setSubQuestionsOpen(!subQuestionsOpen);
                }}
                open={subQuestionsOpen}
              />
            )}
            <QuestionInfoContainer onClick={() => setQuestionId(question.id || null, null)}>
              <Box sx={{ lineHeight: '24px' }}>
                <QuestionText>{question.title}</QuestionText>
              </Box>
              <Box>
                <QuestionStats category={question.category.title} />
              </Box>
            </QuestionInfoContainer>
          </QuestionItem>
        </QuestionItemContainer>
      </Box>

      {subQuestionsOpen &&
        question.subQuestions &&
        question.subQuestions.length !== 0 &&
        question.subQuestions.map(subQuestion => {
          return (
            <QuestionListItem
              key={subQuestion.id}
              question={subQuestion}
              parentId={question.id}
              setQuestionId={() => setQuestionId(subQuestion.id || null, question.id ? question.id : null)}
            />
          );
        })}
    </>
  );
};

export default QuestionListItem;
