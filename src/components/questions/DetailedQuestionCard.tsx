import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import useQuery from '../../hooks/useQuery';
import Question from '../../interfaces/Question';
import style from './DetailedQuestionCard.module.css';
import { Button, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import CommentsList from '../comments/CommentsList';
import AddCommentTextField from '../comments/AddCommentTextField';
import Loader from '../shared/Loader';

type Props = {
  questionId: number;
  setQuestionId: (id: number | null) => void;
};

const DetailedQuestionCard = ({ questionId, setQuestionId }: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [commentsRefresh, setCommentsRefresh] = useState(false);

  const {
    data: question,
    isLoading,
    getData,
  } = useQuery<Question>({
    httpMethod: HTTP_METHODS.GET,
    url: ENDPOINTS.QUESTION.GET_ONE(questionId.toString()),
  });

  useEffect(() => {
    if (!question) {
      getData();
    }
  }, [question, getData]);

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
        <div className={style.Info}>Date placeholder &bull; type placeholder</div>

        <div className={style.TitleBox}>{isLoading ? <Loader /> : question?.title}</div>
        <div className={style.ActionBar}>
          <div className={style.Social}>
            <div>Comments placeholder</div>
            <div>Likes placeholder</div>
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
        <Grid container direction={'column'} rowSpacing={2} sx={{ p: 2 }}>
          <Grid item style={{ height: '50vh', overflow: 'auto' }}>
            <CommentsList refresh={commentsRefresh} onSuccess={() => setCommentsRefresh(false)} />
          </Grid>
          <Grid item>
            <AddCommentTextField onSuccess={() => setCommentsRefresh(true)} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DetailedQuestionCard;
