import { Comment } from '../../interfaces/Comment';
import { Card } from '@mui/material';
import styles from './CommentCard.module.css';

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Card className={styles.CardWrapper}>
      <div className={styles.Comment}>{comment.content}</div>
    </Card>
  );
}

export default CommentCard;
