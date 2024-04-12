import { Card } from '@mui/material';
import Comment from '../../interfaces/Comment';
import styles from './CommentCard.module.css';

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Card>
      <div className={styles.Comment}>{comment.content}</div>
    </Card>
  );
}

export default CommentCard;
