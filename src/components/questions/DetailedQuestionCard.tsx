import React, { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import useQuery from '../../hooks/useQuery';
import Question from '../../interfaces/Question';
import styleDetailedCard from '../shared/DetailedCart.module.css';
import styleQuestion from './DetailedQuestionCard.module.css';
import { IconButton, ClickAwayListener } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CommentsList from '../comments/CommentsList';
import AddCommentTextField from '../comments/AddCommentTextField';
import Loader from '../shared/Loader';
import QuestionFromButton from './components/QuestionFromButton';
import Comment from '../../interfaces/Comment';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import DeleteDialog from '../dialogs/DeleteDialog';

type Props = {
  questionId: number;
  parentId?: number;
  setQuestionId: (id: number | null, parentId: number | null) => void;
  updateQuestion: (question: Question) => void;
};

const DetailedQuestionCard = ({ questionId, parentId, setQuestionId, updateQuestion }: Props) => {
  const [commentsRefresh, setCommentsRefresh] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [questionId]);

  const onUpdateSuccess = (response: Question) => {
    if (!question) {
      return;
    }

    question.title = response.title;
    question.category = response.category;
    question.subQuestions = response.subQuestions;
    updateQuestion(question);
  };

  const updateQuestionCommand = useQuery({
    url: ENDPOINTS.QUESTION.UPDATE(questionId.toString()),
    httpMethod: HTTP_METHODS.PATCH,
    onSuccess: onUpdateSuccess,
  });

  const onUpdateSubmit = async (values: Question) => {
    values.id = questionId;
    await updateQuestionCommand.sendData(values);
  };

  const handleClickAway = () => {
    if (questionId !== question?.id) {
      navigate(`/${questionId}`);
      setQuestionId(questionId, parentId ? parentId : null);
    } else {
      navigate('/');
      setQuestionId(null, null);
    }
  };

  const closeDialog = () => {
    navigate('/');
    setQuestionId(null, null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={styleDetailedCard.Box}>
        <div className={styleDetailedCard.CloseButton}>
          <IconButton>
            <CloseIcon onClick={closeDialog} />
          </IconButton>
        </div>
        {question && (
          <>
            <div className={styleQuestion.Info}>
              <a href={`/category/${question?.category.id}`} className={styleQuestion.Info}>
                {question?.category.title}
              </a>
            </div>
            <div className={styleDetailedCard.TitleBox}>{isLoading ? <Loader /> : question?.title}</div>
            <div className={styleQuestion.ActionBar}>
              <QuestionFromButton question={question} parentId={parentId} onSubmit={onUpdateSubmit} />
              <ActionButton
                onClick={() => setOpen(true)}
                startIcon={<DeleteIcon />}
                variant="contained"
                color="secondary"
              >
                Delete
              </ActionButton>
              <DeleteDialog
                itemId={questionId.toString()}
                deleteEndpoint={ENDPOINTS.QUESTION.DELETE}
                dialogTitle="Delete this question?"
                dialogDescription={
                  question?.subQuestions
                    ? 'If you delete this question, all follow up questions and comments will also be deleted. Are you sure?'
                    : 'If you delete this question, all comments will also be deleted. Are you sure'
                }
                deleteLabel="Delete Question"
                open={open}
                setOpen={setOpen}
              />
            </div>
          </>
        )}
        <div className={styleQuestion.List}>
          <CommentsList
            questionId={questionId}
            refresh={commentsRefresh}
            onSuccess={() => setCommentsRefresh(false)}
            setCommentToEdit={setCommentToEdit}
            commentToEdit={commentToEdit}
          />
        </div>
        <div className={styleQuestion.TextField}>
          <AddCommentTextField
            questionId={questionId}
            onSuccess={() => setCommentsRefresh(true)}
            setCommentToEdit={setCommentToEdit}
            commentToEdit={commentToEdit}
          />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default DetailedQuestionCard;
