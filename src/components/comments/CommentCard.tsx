import Comment from '../../interfaces/Comment';
import styles from './CommentCard.module.css';
import { useState } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
import DeleteDialog from '../dialogs/DeleteDialog';

function CommentCard({ comment, refreshData }: { comment: Comment; refreshData: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.CommentCard}>
        <div className={styles.Comment}>{comment.content}</div>

        <div className={styles.Info}>
          <span className={styles.InfoItem} onClick={() => setOpen(true)}>
            Delete
          </span>
          <DeleteDialog
            itemId={comment.id.toString()}
            deleteEndpoint={ENDPOINTS.COMMENT.DELETE}
            dialogTitle="Do you really want to delete this comment?"
            dialogDescription="This action cannot be undone."
            refreshData={refreshData}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </>
  );
}

export default CommentCard;
