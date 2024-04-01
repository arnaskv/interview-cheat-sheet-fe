import React from 'react';
import Question from '../../models/Question.interface';
import { Box } from '@mui/material';
import CommentButton from '../buttons/CommentButton';
import LikeButton from '../buttons/LikeButton';
import {
  QuestionInfoContainer,
  QuestionInfoText,
  QuestionItem,
  QuestionReaction,
  QuestionReactionContainer,
  QuestionText,
} from './QuestionStyles';
import QuestionStats from './QuestionStats';

type Props = {
  question: Question;
};

const QuestionListItem: React.FC<Props> = ({ question }) => {
  //Handle logic later
  const handleCommentClick = () => {};
  const handleLikeClick = () => {};

  return (
    <QuestionItem>
      <QuestionInfoContainer>
        <Box sx={{ lineHeight: '24px' }}>
          <QuestionText>{question.text}</QuestionText>
        </Box>
        <Box>
          <QuestionStats category="Category" />
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
