import { Card, Typography, Spin } from 'antd';
import { useSelector } from 'react-redux';

import {
  selectComments,
  selectNewsItem,
} from '../../../redux/slices/newsItemSlice';
import CommentData from './CommentData';
import CommentAnswers from './CommentAnswers';

const Comments = () => {
  const newsItem = useSelector(selectNewsItem);
  const comments = useSelector(selectComments);

  const { Title } = Typography;

  return (
    <Card>
      <Title level={4}>
        Комментарии ({comments[newsItem.id]?.length || 0})
      </Title>
      <ul className="comment-list">
        {comments[newsItem.id]?.map((comment) => (
          <li className="comment-item" key={comment.id}>
            <CommentData comment={comment} />
            {comment.kids && <CommentAnswers comment={comment} />}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Comments;
