import { Card } from '@mui/material';
import Comment from '../../interfaces/Comment';
import styles from './CommentCard.module.css';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { useState } from 'react';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';

function CommentCard({ comment, refreshData }: { comment: Comment, refreshData: () => void }) {
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
    refreshData();
  };

  const commentDeleteQuery = useQuery<Comment>({
    url: ENDPOINTS.COMMENT.DELETE(comment.id.toString()),
    httpMethod: HTTP_METHODS.DELETE,
    onSuccess: onSuccess,
  });

  const handleDelete = async () => {
    await commentDeleteQuery.sendData();
  };

  return (
    <>
      <Card>
        <div className={styles.Comment}>{comment.content}</div>
      </Card>

      <div className={styles.Info}>
          <span className={styles.InfoDate}>Date placeholder</span> &bull;
          <span className={styles.InfoItem}>Like</span> &bull;
          <span className={styles.InfoItem}>Reply</span> &bull;
          <span className={styles.InfoItem} onClick={() => setOpen(true)}>Delete</span>
        </div>
        <ConfirmationDialog
          open={open}
          title={'Are you sure you want to delete this comment?'}
          onConfirm={handleDelete}
          onClose={() => setOpen(false)}
        />
    </>
  );
}

export default CommentCard;
