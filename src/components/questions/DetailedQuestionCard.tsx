import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import useQuery from '../../hooks/useQuery';
import Question from '../../interfaces/Question';
import style from './DetailedQuestionCard.module.css';
import { IconButton, ClickAwayListener } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CommentsList from '../comments/CommentsList';
import AddCommentTextField from '../comments/AddCommentTextField';
import Loader from '../shared/Loader';

type Props = {
  questionId: number;
  setQuestionId: (id: number | null) => void;
};

const DetailedQuestionCard = ({ questionId, setQuestionId }: Props) => {
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
    <ClickAwayListener onClickAway={() => setQuestionId(null)}>
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
        </div>
        <div className={style.List}>
          <CommentsList refresh={commentsRefresh} onSuccess={() => setCommentsRefresh(false)} />
        </div>
        <div className={style.TextField}>
          <AddCommentTextField onSuccess={() => setCommentsRefresh(true)} />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default DetailedQuestionCard;
