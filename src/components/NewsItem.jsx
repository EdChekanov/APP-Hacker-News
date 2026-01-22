import {
  Col,
  Row,
  Space,
  Button,
  Card,
  Typography,
  Tag,
  Collapse,
  Spin,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';

const NewsItem = () => {
  const navigate = useNavigate();

  const newsItem = {
    by: 'rbanffy',
    descendants: 0,
    id: 46721743,
    score: 1,
    time: 1769100488,
    title: 'STL Editing with FreeCAD',
    type: 'story',
    url: 'https://hackaday.com/2026/01/22/stl-editing-with-freecad/',
  };
  const comments = [];
  const commentLoading = true;

  const { Title, Text, Paragraph } = Typography;

  const handleRefresh = () => {};
  const loadNestedComments = () => {};

  return (
    <>
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
              loading={commentLoading}
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
            >
              Обновить комментарии
            </Button>
          </Space>
        </Col>

        <Col xs={24} lg={16}>
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

        <Col xs={24} lg={8}>
          <Card>
            <Title level={4}>Комментарии ({comments.length})</Title>
            <Spin
              spinning={commentLoading && !comments.length}
              indicator={<LoadingOutlined />}
              size="small"
            >
              <Collapse
                accordion
                style={{ maxHeight: 600, overflow: 'auto' }}
                ghost
                items={comments.map((comment) => ({
                  key: comment.id,
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Text strong style={{ marginRight: 8 }}>
                        {comment.by}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {new Date(comment.time * 1000).toLocaleString()}
                      </Text>
                    </div>
                  ),
                  children: (
                    <>
                      <Paragraph ellipsis={{ rows: 10 }}>
                        {comment.text}
                      </Paragraph>

                      {comment.expanded && !comment.kidsData?.length && (
                        <Divider style={{ margin: '16px 0' }} />
                      )}

                      {comment.expanded && (
                        <Collapse
                          style={{ background: 'transparent', border: 'none' }}
                          ghost
                          items={comment.kidsData.map((kidComment) => ({
                            key: kidComment.id,
                            children: (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: kidComment.text,
                                }}
                              />
                            ),
                          }))}
                        />
                      )}
                    </>
                  ),
                  extra:
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
                    ) : null,
                }))}
              />
            </Spin>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NewsItem;
