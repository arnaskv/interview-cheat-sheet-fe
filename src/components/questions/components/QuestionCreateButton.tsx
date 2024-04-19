import { useState } from 'react';
import QuestionCreateDialog from './QuestionCreateDialog';
import AddIcon from '@mui/icons-material/Add';
import ActionButton from '../../buttons/ActionButton';
import Question from '../../../interfaces/Question';

type Props = {
  addQuestion: (question: Question) => void;
};

const QuestionCreateButton: React.FC<Props> = ({ addQuestion }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton onClick={() => setOpen(true)} startIcon={<AddIcon />} variant="contained" color="primary">
        Add Question
      </ActionButton>
      <QuestionCreateDialog open={open} setOpen={setOpen} addQuestion={addQuestion} />
    </>
  );
};

export default QuestionCreateButton;
