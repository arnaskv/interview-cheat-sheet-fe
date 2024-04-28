import React from 'react';
import { FlexColumnContainer } from './SubQuestionList';
import { Box, TextField, Typography } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import DeleteButton from '../../buttons/DeleteButton';

type Props = {
  id: string;
  title: string;
  index: number;
  handleDelete(id: string): void;
  handleTitleChange(index: number, value: string): void;
};

const SubQuestionListItem: React.FC<Props> = ({ id, title, index, handleDelete, handleTitleChange }) => {
  return (
    <FlexColumnContainer gap="4px">
      <Typography variant="h6" color="#666666" marginLeft="30px">
        {`Follow up question #${index + 1}`}
      </Typography>
      <Box display="flex" width="100%" gap="10px">
        <Box>
          <SubdirectoryArrowRightIcon sx={{ color: '#999999', height: '20px', width: '20px' }} />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={title}
          onChange={e => handleTitleChange(index, e.target.value)}
          InputProps={{
            style: { color: '#000048' },
          }}
        />
        <DeleteButton id={id} onClick={() => handleDelete(id)} />
      </Box>
    </FlexColumnContainer>
  );
};

export default SubQuestionListItem;
