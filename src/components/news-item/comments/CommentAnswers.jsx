import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import CommentData from './CommentData';

import {
  addToLoadStack,
  selectComments,
  selectLoadStack,
} from '../../../redux/slices/newsItemSlice';
import { loadComments } from '../../../redux/api/newsApi';

const CommentAnswers = ({ comment }) => {
  const dispatch = useDispatch();

  const comments = useSelector(selectComments);
  const loadStack = useSelector(selectLoadStack);

  const showAnswers = (comment) => {
    dispatch(addToLoadStack(comment.id));
    dispatch(
      loadComments({
        comments: comment.kids,
        parentId: comment.id,
      }),
    );
  };

  return (
    <div className="answers">
      <button onClick={() => showAnswers(comment)}>
        {comment.kids.length} ответов
      </button>
      {loadStack.includes(comment.id) && (
        <>
          {comments[comment.id] ? (
            <ul className="comment-list">
              {comments[comment.id].map((answer) => (
                <li key={answer.id} className="comment-item">
                  <CommentData comment={answer} />
                  {answer.kids && <CommentAnswers comment={answer} />}
                </li>
              ))}
            </ul>
          ) : (
            <Spin
              spinning={true}
              indicator={<LoadingOutlined />}
              size="small"
            />
          )}
        </>
      )}
    </div>
  );
};

export default CommentAnswers;
