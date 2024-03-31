import React from 'react';
import Question from '../../models/Question.interface';
import { Box, Typography } from '@mui/material';
import CommentButton from '../buttons/CommentButton';
import LikeButton from '../buttons/LikeButton';
import styled from '@emotion/styled';

type Props = {
  question: Question;
};

const QuestionText = styled(Typography)`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 72, 1);
`;

const QuestionInfoText = styled(Typography)`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 13px;
  color: rgba(153, 153, 153, 1);
`;

const QuestionListItem: React.FC<Props> = ({ question }) => {
  //Handle logic later
  const handleCommentClick = () => {};
  const handleLikeClick = () => {};

  return (
    <Box className="question-item">
      <Box className="question-info-container">
        <Box>
          <QuestionText>{question.text}</QuestionText>
        </Box>
        <Box>
          <QuestionInfoText>Category • 0 comment • 0 Likes</QuestionInfoText>
        </Box>
      </Box>
      <Box className="question-reaction-container">
        <Box className="question-reaction">
          <CommentButton onClick={handleCommentClick} />
        </Box>
        <Box className="question-reaction">
          <LikeButton onClick={handleLikeClick} />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionListItem;
