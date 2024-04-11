import { useEffect } from 'react';
import { Stack } from '@mui/material';
import CommentCard from './CommentCard';
import Comment from '../../interfaces/Comment';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import Loader from '../shared/Loader';

const CommentsList = () => {
  const {
    data: comments,
    isLoading,
    errors,
    getData,
  } = useQuery<Comment[]>({
    url: ENDPOINTS.COMMENT.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
  });

  useEffect(() => {
    if (!comments) getData();
  }, [comments, getData]);

  if (isLoading) return <Loader />;
  if (errors) return <div>{errors.join(', ')}</div>;

  return (
    <Stack direction={'column'} spacing={2}>
      {comments !== null && comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
    </Stack>
  );
};

export default CommentsList;
