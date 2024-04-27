import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddSubquestionButton = styled(Button)`
  background-color: #eaf1ff;
  border-radius: 6px;
  color: #2424d6;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: flex-start;
  padding: 0px 8px 0px 16px;
  text-transform: none;
`;

const SubQuestionList = () => {
  return (
    <>
      <AddSubquestionButton startIcon={<AddIcon style={{ fontSize: '14px' }} />} fullWidth>
        Add follow up question
      </AddSubquestionButton>
    </>
  );
};

export default SubQuestionList;
