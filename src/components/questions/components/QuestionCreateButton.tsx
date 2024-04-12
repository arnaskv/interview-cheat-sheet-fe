import { useState } from 'react';
import QuestionCreateDialog from './QuestionCreateDialog';
import AddIcon from '@mui/icons-material/Add';
import ActionButton from '../../buttons/ActionButton';

type Props = {
  handleSubmit: () => void;
};

const QuestionCreateButton: React.FC<Props> = ({ handleSubmit }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton onClick={() => setOpen(true)} startIcon={<AddIcon />} variant="contained" color="primary">
        Add Question
      </ActionButton>
      <QuestionCreateDialog open={open} setOpen={setOpen} handleSubmit={handleSubmit} />
    </>
  );
};

export default QuestionCreateButton;
