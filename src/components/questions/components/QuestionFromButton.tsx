import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ActionButton from '../../buttons/ActionButton';
import Question from '../../../interfaces/Question';
import QuestionFormDialog from './QuestionFormDialog';

type QuestioneFormButtonProps = {
  question?: Question;
  onSubmit: (question: Question) => void;
};

const QuestionFromButton = ({ question, onSubmit }: QuestioneFormButtonProps)   => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton
        onClick={() => setOpen(true)}
        startIcon={!question && <AddIcon style={{ fontSize: '25px' }} />}
        color="primary"
        variant="contained"
      >
        {question ? 'Edit Question' : 'Add Question' }
      </ActionButton>
      <QuestionFormDialog open={open} setOpen={setOpen} question={question} onSubmit={onSubmit} />
    </>
  );
};

export default QuestionFromButton;
