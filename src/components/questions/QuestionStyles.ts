import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const QuestionText = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  color: #000048;
`;

export const QuestionInfoText = styled(Typography)`
  font-weight: 400;
  font-size: 13px;
  color: #999999;
`;

export const QuestionItemContainer = styled(Box)`
  border: 1px solid;
  border-color: #dddddd;
  border-radius: 8px;
  gap: 24px;
  margin-bottom: 5px;
  width: 100%;
`;

export const QuestionItem = styled(Box)`
  padding: 16px 24px 16px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const QuestionInfoContainer = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
