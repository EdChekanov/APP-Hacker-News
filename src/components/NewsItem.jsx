import {
  Col,
  Row,
  Space,
  Button,
  Card,
  Typography,
  Tag,
  Spin,
  Alert,
} from 'antd';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNewsItem, loadComments } from '../redux/api/newsApi';
import {
  selectCommentLoading,
  selectComments,
  selectError,
  selectLoading,
  selectNewsItem,
} from '../redux/slices/newsItemSlice';
import { formatTimeAgo } from '../utils/formatTimeAgo';

const NewsItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newsItem = useSelector(selectNewsItem);
  const comments = useSelector(selectComments);
  const loading = useSelector(selectLoading);
  const commentsLoading = useSelector(selectCommentLoading);
  const error = useSelector(selectError);

  const [chosenAnswers, setChosenAnswers] = useState(null);

  const { Title, Text } = Typography;

  const handleRefresh = () => {
    dispatch(
      loadComments({ comments: newsItem?.kids || [], parentId: newsItem?.id }),
    );
  };
  const showAnswers = (comment) => {
    setChosenAnswers(comment.id);
    dispatch(
      loadComments({
        comments: comment.kids,
        parentId: comment.id,
        flag: 'subcomment',
      }),
    );
  };

  useEffect(() => {
    dispatch(getNewsItem(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Row justify="center">
        <Col xs={24}>
          <Alert
            title="Ошибка загрузки новости"
            description={error}
            type="error"
            showIcon
            action={
              <Button onClick={() => window.location.reload()} size="small">
                Попробовать снова
              </Button>
            }
          />
        </Col>
      </Row>
    );
  }

  if (!newsItem) return <Title level={2}>Загрузка...</Title>;

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined />} size="large">
      <Row
        gutter={[0, 32]}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}
      >
        <Col xs={24}>
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
        </Col>

        <Col xs={24}>
          <Card>
            <Title level={2}>
              {newsItem.title}
              {newsItem.url && (
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: 16 }}
                >
                  ↗️ Открыть
                </a>
              )}
            </Title>
            <Space
              orientation="vertical"
              size="middle"
              style={{ width: '100%' }}
            >
              <Space>
                <Text strong>Автор: </Text>
                <Text>{newsItem.by}</Text>
              </Space>

              <Space>
                <Text strong>Дата: </Text>
                <Text>{new Date(newsItem.time * 1000).toLocaleString()}</Text>
              </Space>

              <Space>
                <Text strong>Рейтинг: </Text>
                <Tag color="blue">{newsItem.score} очков</Tag>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xs={24}>
          <Card>
            <Title level={4}>
              Комментарии ({comments[newsItem.id]?.length || 0})
            </Title>
            <ul className="comment-list">
              {comments[newsItem.id]?.map((comment) => (
                <li className="comment-item" key={comment.id}>
                  <div className="comment-header">
                    <span className="author">{comment.by}</span>
                    <span className="posted">
                      ({formatTimeAgo(comment.time * 1000)})
                    </span>
                  </div>
                  <div
                    className="comment-text"
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  />
                  {comment.kids && (
                    <div className="answers">
                      <button onClick={() => showAnswers(comment)}>
                        {comment.kids.length} ответов
                      </button>
                      {chosenAnswers === comment.id && (
                        <ul className="comment-list">
                          {comments[comment.id] ? (
                            comments[comment.id].map((answer) => (
                              <li key={answer.id} className="comment-item">
                                <div className="comment-header">
                                  <span className="author">{answer.by}</span>
                                  <span className="posted">
                                    ({formatTimeAgo(answer.time * 1000)})
                                  </span>
                                </div>
                                <div
                                  className="comment-text"
                                  dangerouslySetInnerHTML={{
                                    __html: answer.text,
                                  }}
                                />
                              </li>
                            ))
                          ) : (
                            <Spin
                              spinning={true}
                              indicator={<LoadingOutlined />}
                              size="small"
                            />
                          )}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default NewsItem;
