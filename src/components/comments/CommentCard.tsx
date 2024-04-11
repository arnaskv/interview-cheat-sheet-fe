import { Comment } from '../../interfaces/Comment';
import { Avatar, Card, Stack } from '@mui/material';
import styles from './CommentCard.module.css';

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar />
      <Card className={styles.CardWrapper}>
        <div className={styles.Comment}>{comment.content}</div>
      </Card>
    </Stack>
  );
}

export default CommentCard;
