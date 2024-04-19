import { useEffect } from 'react';
import { Stack } from '@mui/material';
import CommentCard from './CommentCard';
import Comment from '../../interfaces/Comment';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import Loader from '../shared/Loader';

type Props = {
  refresh: boolean;
  onSuccess: () => void;
};

const CommentsList: React.FC<Props> = ({ refresh, onSuccess }) => {
  const {
    data: comments,
    isLoading,
    errors,
    getData,
  } = useQuery<Comment[]>({
    url: ENDPOINTS.COMMENT.GET_ALL,
    httpMethod: HTTP_METHODS.GET,
    onSuccess: onSuccess,
  });

  useEffect(() => {
    if (!comments || refresh) {
      getData();
    }
  }, [comments, getData, refresh]);

  if (isLoading) return <Loader />;
  if (errors) return <div>{errors.join(', ')}</div>;

  return (
    <Stack direction={'column'} spacing={2}>
      {comments !== null && comments.map(comment => <CommentCard key={comment.id} comment={comment} refreshData={getData} />)}
    </Stack>
  );
};

export default CommentsList;
