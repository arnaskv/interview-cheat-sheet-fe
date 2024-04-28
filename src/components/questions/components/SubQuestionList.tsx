import React from 'react';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubQuestionListItem from './SubQuestionListItem';
import { SubQuestion } from './QuestionCreateDialog';

export const FlexColumnContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${props => (props.gap ? `${props.gap}` : '20px')};
`;

const AddSubquestionButton = styled(Button)`
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

type Props = {
  questions: SubQuestion[];
  handleAddQuestion(): void;
  handleDeleteQuestion(id: string): void;
  handleTitleChange(index: number, value: string): void;
};

const SubQuestionList: React.FC<Props> = ({
  questions,
  handleAddQuestion,
  handleDeleteQuestion,
  handleTitleChange,
}) => {
  return (
    <>
      <FlexColumnContainer marginBottom="20px">
        {questions.map((item, index) => {
          return (
            <SubQuestionListItem
              id={item.id}
              title={item.title}
              index={index}
              handleDelete={() => handleDeleteQuestion(item.id)}
              handleTitleChange={handleTitleChange}
            />
          );
        })}
      </FlexColumnContainer>
      <AddSubquestionButton startIcon={<AddIcon style={{ fontSize: '18px' }} />} fullWidth onClick={handleAddQuestion}>
        Add follow up question
      </AddSubquestionButton>
    </>
  );
};

export default SubQuestionList;
