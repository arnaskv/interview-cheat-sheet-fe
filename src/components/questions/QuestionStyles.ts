import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';

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
  margin-bottom: 5px;
`;

export const QuestionItem = styled(Box)`
  padding: 16px 24px 16px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
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

export const FlexColumnContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${props => (props.gap ? `${props.gap}` : '20px')};
`;

export const AddSubquestionButton = styled(Button)`
  background-color: #eaf1ff;
  border-radius: 6px;
  color: #2424d6;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: flex-start;
  line-height: 16px;
  padding: 0px 8px 0px 16px;
  text-transform: none;
`;
