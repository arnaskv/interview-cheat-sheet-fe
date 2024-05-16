import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const QuestionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const FilteringContainer = styled(Box)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 30px;
    & > span {
        margin-right: 8px;
        font-size: 14px;
        font-family: Inter, sans-serif;
        color: #333333
    }
`