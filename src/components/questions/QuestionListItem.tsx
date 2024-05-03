import React from 'react';
import Question from '../../interfaces/Question';
import { Box } from '@mui/material';
import {
  QuestionInfoContainer,
  QuestionItem,
  QuestionItemContainer,
  QuestionText,
} from './QuestionStyles';
import QuestionStats from './QuestionStats';

type Props = {
  question: Question;
  setQuestionId: (id: number | null) => void;
};

const QuestionListItem: React.FC<Props> = ({ question, setQuestionId }) => {

  return (
    <QuestionItemContainer>
      <QuestionItem>
        <QuestionInfoContainer onClick={() => setQuestionId(question.id || null)}>
          <Box sx={{ lineHeight: '24px' }}>
            <QuestionText>{question.title}</QuestionText>
          </Box>
          <Box>
            <QuestionStats category={question.category.title}/>
          </Box>
        </QuestionInfoContainer>
      </QuestionItem>
    </QuestionItemContainer>
  );
};

export default QuestionListItem;
