import { useState } from 'react';
import QuestionFormDialog from './QuestionFormDialog';
import AddIcon from '@mui/icons-material/Add';
import ActionButton from '../../buttons/ActionButton';
import Question from '../../../interfaces/Question';

type QuestioneFormButtonProps = {
  question?: Question;
  onSubmit: (question: Question) => void;
};

const QuestionFormButton = ({ question, onSubmit }: QuestioneFormButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton
        onClick={() => setOpen(true)}
        startIcon={<AddIcon style={{ fontSize: '25px' }} />}
        color="primary"
        variant="contained"
      >
        {question ? 'Edit Question' : 'Add Question'}
      </ActionButton>
      <QuestionFormDialog open={open} setOpen={setOpen} question={question} onSubmit={onSubmit} />
    </>
  );
};

export default QuestionFormButton;
