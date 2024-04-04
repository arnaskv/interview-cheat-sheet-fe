import { Grid, Typography } from '@mui/material';
import CommentCard from '../../components/comments/CommentCard';
import { Comment } from '../../interfaces/Comment';
import styles from './CommentsList.module.css';

function CommentsList() {
  const comments: Comment[] = [
    { id: '1', content: 'This is a comment' },
    { id: '2', content: 'This is another comment' },
  ];

  return (
    <Grid className={styles.Grid}>
      <Typography variant="h3">Comments list</Typography>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Grid>
  );
}

export default CommentsList;
