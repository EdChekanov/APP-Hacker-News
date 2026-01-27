import { Space, Button } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { loadComments } from '../../redux/api/newsApi';
import {
  selectCommentLoading,
  selectNewsItem,
} from '../../redux/slices/newsItemSlice';

const NewsItemHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newsItem = useSelector(selectNewsItem);
  const commentsLoading = useSelector(selectCommentLoading);

  const handleRefresh = () => {
    dispatch(
      loadComments({ comments: newsItem?.kids || [], parentId: newsItem?.id }),
    );
  };

  return (
    <Space style={{ marginBottom: 24 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
        К списку новостей
      </Button>
      <Button
        loading={commentsLoading}
        icon={<ReloadOutlined />}
        onClick={handleRefresh}
      >
        Обновить комментарии
      </Button>
    </Space>
  );
};

export default NewsItemHeader;
