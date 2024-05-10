import Comment from '../../interfaces/Comment';
import styles from './CommentCard.module.css';
import { useState } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
import DeleteDialog from '../dialogs/DeleteDialog';

type Props = {
  comment: Comment;
  refreshData: () => void;
  setCommentToEdit: (comment: Comment | null) => void;
  commentToEdit: Comment | null;
};

function CommentCard({ comment, refreshData, setCommentToEdit, commentToEdit }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.CommentCard}>
        <div className={styles.Comment}>{comment.content}</div>

        <div className={styles.Info}>
          <span className={styles.InfoItem} onClick={() => setOpen(true)}>
            Delete
          </span>
          &#x2022;
          {comment.id !== commentToEdit?.id ? (
            <span className={styles.InfoItem} onClick={() => setCommentToEdit(comment)}>
              Edit
            </span>
          ) : (
            <span className={styles.InfoItem} onClick={() => setCommentToEdit(null)}>
              Cancel
            </span>
          )}
          <DeleteDialog
            itemId={comment.id.toString()}
            deleteEndpoint={ENDPOINTS.COMMENT.DELETE}
            dialogTitle="Do you really want to delete this comment?"
            dialogDescription="This action cannot be undone."
            refreshData={refreshData}
            deleteLabel="Delete Comment"
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </>
  );
}

export default CommentCard;
