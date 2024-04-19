import { useState } from "react";
import QuestionCreateDialog from "./QuestionCreateDialog";
import AddIcon from '@mui/icons-material/Add';
import ActionButton from "../../buttons/ActionButton";

const QuestionCreateButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ActionButton onClick={() => setOpen(true)} color="primary" variant="contained">
                <AddIcon style={{fontSize: '25px'}} /> Add Question
            </ActionButton>
            <QuestionCreateDialog
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

export default QuestionCreateButton;
