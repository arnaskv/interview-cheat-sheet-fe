import { useState } from 'react';
import ActionButton from '../../buttons/ActionButton';
import Question from '../../../interfaces/Question';
import QuestionEditDialog from './QuestionEditDialog';

type Props = {
  question: Question;
  updateQuestion: (question: Question) => void;
};

const QuestionEditButton: React.FC<Props> = ({ question, updateQuestion }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton
        onClick={() => setOpen(true)}
        color="primary"
        variant="contained"
      >
        Edit Question
      </ActionButton>
      <QuestionEditDialog open={open} setOpen={setOpen} question={question} updateQuestion={updateQuestion} />
    </>
  );
};

export default QuestionEditButton;
