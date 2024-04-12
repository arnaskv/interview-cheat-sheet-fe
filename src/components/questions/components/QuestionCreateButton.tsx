import { IconButton } from '@mui/material';
import { useState } from 'react';
import QuestionCreateDialog from './QuestionCreateDialog';
import style from './Question.module.css';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  handleSubmit: () => void;
};

const QuestionCreateButton: React.FC<Props> = ({ handleSubmit }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} className={style.CreateButton} disableRipple>
        <AddIcon style={{ fontSize: '25px' }} /> Add Question
      </IconButton>
      <QuestionCreateDialog open={open} setOpen={setOpen} handleSubmit={handleSubmit} />
    </>
  );
};

export default QuestionCreateButton;
