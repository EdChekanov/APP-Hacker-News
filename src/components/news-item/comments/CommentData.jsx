import { formatTimeAgo } from '../../../utils/formatTimeAgo';

const CommentData = ({ comment }) => {
  return (
    <>
      <div className="comment-header">
        <span className="author">{comment.by}</span>
        <span className="posted">({formatTimeAgo(comment.time * 1000)})</span>
      </div>
      <div
        className="comment-text"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      ></div>
    </>
  );
};

export default CommentData;
