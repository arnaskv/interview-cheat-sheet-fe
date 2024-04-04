import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { HTTP_METHODS } from "../../constants/http";
import useQuery from "../../hooks/useQuery";
import Question from "../../interfaces/Question";
import style from "./DetailedQuestionCard.module.css";
import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationDialog from "../shared/ConfirmationDialog";

type Props = {
    questionId: number;
    setQuestionId: (id: number | null) => void;
  };

const DetailedQuestionCard = ({ questionId, setQuestionId }: Props) => {

    const [data, setData] = useState<Question | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const questionQuery = useQuery<Question>({
        httpMethod: HTTP_METHODS.GET,
        url: ENDPOINTS.QUESTION.GET_ONE(questionId.toString()),
    });

    useEffect(() => {
        const fetchData = async () => {
            await questionQuery.getData();
            if(questionQuery.isLoading) {
                setData(questionQuery.data);
            }
        };

        fetchData();
    }, [questionId]);

    return (
    <>
        <div className={style.Box}>
            <div className={style.Header}>
                <div className={style.CloseButton}>
                    <IconButton>
                        <CloseIcon onClick={() => setQuestionId(null)} />
                    </IconButton>
                </div>
            </div>
            <div className={style.Info}>
                Date placehodler &bull; type placeholder
            </div>
            <div className={style.TitleBox}>
                {data?.text}    
                Give me an example of a time you had a conflict with a team member. How did you handle it? 
            </div>
            <div className={style.ActionBar}>
                <div className={style.Social}>
                    <div>
                        Comments placeholder
                    </div>
                    <div>
                        Likes placeholder
                    </div>
                </div>
                <Button variant="contained" className={style.ActionButton} onClick={() => setShowConfirmation(true)}>
                    Delete
                </Button>
                <ConfirmationDialog 
                    open={showConfirmation} 
                    onClose={() => setShowConfirmation(false)} 
                    onConfirm={() => console.log('Delete')} 
                    title="Are you sure you want to delete this question?"
                />
            </div>
            {/* TODO: get all questions and delete question */}
        </div>   
    </>
    );
};

export default DetailedQuestionCard;