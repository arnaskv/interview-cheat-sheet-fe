import { Button, Dialog } from "@mui/material";
import style from './ConfirmationDialog.module.css';

type ConfirmationDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
};

const ConfirmationDialog = ({ open, onClose, onConfirm, title }: ConfirmationDialogProps) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <div className={style.DialogWrapper}>
                <div className={style.Title}>
                    {title}
                </div>
                <div className={style.ButtonWrapper}>
                    <Button variant="contained" className={style.DeleteButton} onClick={onConfirm}>
                        Confirm
                    </Button>
                    <Button variant="contained" className={style.CancelButton} onClick={onClose}>
                        Cancel
                    </Button>
                </div>
        </div>
        </Dialog>
    );
};

export default ConfirmationDialog;