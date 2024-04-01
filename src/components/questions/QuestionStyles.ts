import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const QuestionText = styled(Typography)`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 72, 1);
`;

export const QuestionInfoText = styled(Typography)`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 13px;
  color: rgba(153, 153, 153, 1);
`;

export const QuestionItem = styled(Box)`
  border: 1px solid;
  border-color: rgba(221, 221, 221, 1);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  margin-bottom: 5px;
  padding: 16px 24px 16px 24px;
  width: 90%;
`;

export const QuestionInfoContainer = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const QuestionReactionContainer = styled(Box)`
  display: flex;
  flex: 0 0 72px;
  flex-direction: row;
  gap: 8px;
  height: 32px;
  width: 72px;
`;

export const QuestionReaction = styled(Box)`
  display: flex;
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
`;
