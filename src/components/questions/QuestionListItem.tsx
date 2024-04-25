import React from 'react';
import Question from '../../interfaces/Question';
import { Box } from '@mui/material';
import CommentButton from '../buttons/CommentButton';
import LikeButton from '../buttons/LikeButton';
import {
  QuestionInfoContainer,
  QuestionItem,
  QuestionReaction,
  QuestionReactionContainer,
  QuestionText,
} from './QuestionStyles';
import QuestionStats from './QuestionStats';

type Props = {
  question: Question;
  setQuestionId: (id: number | null) => void;
};

const QuestionListItem: React.FC<Props> = ({ question, setQuestionId }) => {
  //Handle logic later
  const handleCommentClick = () => {};
  const handleLikeClick = () => {};

  return (
    <QuestionItem>
      <QuestionInfoContainer onClick={() => setQuestionId(question.id || null)}>
        <Box sx={{ lineHeight: '24px' }}>
          <QuestionText>{question.title}</QuestionText>
        </Box>
        <Box>
          <QuestionStats category={question.category.title} likeCount={12} commentCount={12}></QuestionStats>
        </Box>
      </QuestionInfoContainer>
      <QuestionReactionContainer>
        <QuestionReaction>
          <CommentButton onClick={handleCommentClick} />
        </QuestionReaction>
        <QuestionReaction>
          <LikeButton onClick={handleLikeClick} />
        </QuestionReaction>
      </QuestionReactionContainer>
    </QuestionItem>
  );
};

export default QuestionListItem;
