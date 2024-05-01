import { useState } from 'react';
import QuestionFormDialog from './QuestionFormDialog';
import AddIcon from '@mui/icons-material/Add';
import ActionButton from '../../buttons/ActionButton';
import Question from '../../../interfaces/Question';

type Props = {
  addQuestion: (question: Question) => void;
};

const QuestionFormButton: React.FC<Props> = ({ addQuestion }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton
        onClick={() => setOpen(true)}
        startIcon={<AddIcon style={{ fontSize: '25px' }} />}
        color="primary"
        variant="contained"
      >
        Add Question
      </ActionButton>
      <QuestionFormDialog open={open} setOpen={setOpen} addQuestion={addQuestion} />
    </>
  );
};

export default QuestionFormButton;
