// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router';
import {
  Row,
  Col,
  Typography,
  Spin,
  Alert,
  Button,
  Collapse,
  Space,
  Tag,
  Divider,
} from 'antd';
import { ReloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';

// import { getNewsItem } from '../redux/api/newsApi';
// import { useSelector, useDispatch } from 'react-redux';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const NewsItem = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [comments, setComments] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [reloading, setReloading] = useState(false);

  // // Получаем новость из Redux или загружаем
  // const newsItem = useSelector((state) =>
  //   state.news.stories?.find((item) => item.id === Number(id)),
  // );

  // // Загрузка корневых комментариев
  // const loadComments = async (storyKids = []) => {
  //   try {
  //     setReloading(true);
  //     const commentPromises = storyKids.slice(0, 50).map((kidId) =>
  //       fetch(`/api/hn/item/${kidId}.json`)
  //         .then((res) => res.json())
  //         .catch(() => null),
  //     );

  //     const loadedComments = await Promise.all(commentPromises);
  //     const validComments = loadedComments.filter(Boolean);

  //     // Рекурсивно загружаем вложенные (только первый уровень пока)
  //     const commentsWithKids = await Promise.all(
  //       validComments.map(async (comment) => {
  //         if (comment?.kids?.length > 0) {
  //           comment.expanded = false;
  //           comment.kidsData = [];
  //         }
  //         return comment;
  //       }),
  //     );

  //     setComments(commentsWithKids);
  //   } catch (err) {
  //     setError('Ошибка загрузки комментариев');
  //   } finally {
  //     setLoading(false);
  //     setReloading(false);
  //   }
  // };

  // // Загрузка вложенных комментариев
  // const loadNestedComments = async (comment) => {
  //   if (comment.kidsData.length > 0) {
  //     comment.expanded = !comment.expanded;
  //     setComments([...comments]);
  //     return;
  //   }

  //   try {
  //     const nestedPromises = comment.kids.slice(0, 10).map((kidId) =>
  //       fetch(`/api/hn/item/${kidId}.json`)
  //         .then((res) => res.json())
  //         .catch(() => null),
  //     );

  //     const nestedComments = await Promise.all(nestedPromises);
  //     const validNested = nestedComments.filter(Boolean);

  //     comment.kidsData = validNested;
  //     comment.expanded = true;
  //     setComments([...comments]);
  //   } catch (err) {
  //     console.error('Error loading nested comments:', err);
  //   }
  // };

  // useEffect(() => {
  //   if (newsItem) {
  //     setLoading(true);
  //     loadComments(newsItem.kids || []);
  //   }
  // }, [newsItem?.id]);

  // const handleRefresh = () => {
  //   if (newsItem) {
  //     loadComments(newsItem.kids || []);
  //   }
  // };

  // if (!newsItem) {
  //   return (
  //     <Row justify="center" style={{ padding: '40px' }}>
  //       <Col>
  //         <Alert message="Новость не найдена" type="error" />
  //       </Col>
  //     </Row>
  //   );
  // }

  // if (loading && !comments.length) {
  //   return (
  //     <Row justify="center" style={{ padding: '100px 20px' }}>
  //       <Col>
  //         <Spin size="large" tip="Загружаем комментарии..." />
  //       </Col>
  //     </Row>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Row justify="center" style={{ padding: '40px 20px' }}>
  //       <Col xs={24} sm={16}>
  //         <Alert
  //           message="Ошибка"
  //           description={error}
  //           type="error"
  //           showIcon
  //           action={
  //             <Button onClick={handleRefresh} icon={<ReloadOutlined />}>
  //               Обновить
  //             </Button>
  //           }
  //         />
  //       </Col>
  //     </Row>
  //   );
  // }

  return (
    <Row
      gutter={[0, 32]}
      style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}
    >
      {/* Кнопки навигации */}
      <Col xs={24}>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            К списку новостей
          </Button>
          <Button
            loading={reloading}
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >
            Обновить комментарии
          </Button>
        </Space>
      </Col>

      {/* Основная информация о новости */}
      <Col xs={24} lg={16}>
        <Card>
          <Title level={2} style={{ marginBottom: 16 }}>
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

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Автор: </Text>
              <Text>{newsItem.by}</Text>
            </div>

            <div>
              <Text strong>Дата: </Text>
              <Text>{new Date(newsItem.time * 1000).toLocaleString()}</Text>
            </div>

            <div>
              <Text strong>Рейтинг: </Text>
              <Tag color="blue">{newsItem.score} очков</Tag>
            </div>
          </Space>
        </Card>
      </Col>

      {/* Комментарии */}
      <Col xs={24} lg={8}>
        <Card>
          <Title level={4}>Комментарии ({comments.length})</Title>
          <Spin spinning={loading && comments.length === 0}>
            <Collapse
              accordion
              style={{ maxHeight: 600, overflow: 'auto' }}
              ghost
            >
              {comments.map((comment) => (
                <Panel
                  key={comment.id}
                  header={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Text strong style={{ marginRight: 8 }}>
                        {comment.by}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {new Date(comment.time * 1000).toLocaleString()}
                      </Text>
                    </div>
                  }
                  extra={
                    comment.kids?.length > 0 ? (
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          loadNestedComments(comment);
                        }}
                      >
                        {comment.expanded
                          ? 'Свернуть'
                          : `${comment.kids.length} ответов`}
                      </Button>
                    ) : null
                  }
                >
                  <Paragraph ellipsis={{ rows: 10 }}>{comment.text}</Paragraph>

                  {comment.expanded && comment.kidsData?.length > 0 && (
                    <Divider style={{ margin: '16px 0' }} />
                  )}

                  {comment.expanded && (
                    <Collapse
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      {comment.kidsData.map((kidComment) => (
                        <Panel key={kidComment.id} ghost>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: kidComment.text,
                            }}
                          />
                        </Panel>
                      ))}
                    </Collapse>
                  )}
                </Panel>
              ))}
            </Collapse>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default NewsItem;
