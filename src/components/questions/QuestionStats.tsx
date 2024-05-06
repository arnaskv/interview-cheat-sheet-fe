import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { QuestionInfoText } from './QuestionStyles';

type Props = {
  category: string;
  likeCount?: number | undefined;
  commentCount?: number | undefined;
};

const QuestionStatsContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const QuestionStats: React.FC<Props> = ({ category, likeCount, commentCount }) => {
  return (
    <QuestionStatsContainer>
      <QuestionInfoText>{category}</QuestionInfoText>
    </QuestionStatsContainer>
  );
};

export default QuestionStats;
