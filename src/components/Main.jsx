import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, Space, Typography, Alert, Button, Spin } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';

import { getNews } from '../redux/api/newsApi';
import {
  selectNews,
  selectLoading,
  selectError,
} from '../redux/slices/newsSlice';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Title } = Typography;

  const news = useSelector(selectNews);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getNews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Row justify="center">
        <Col xs={24}>
          <Alert
            title="Ошибка загрузки новостей"
            description={error}
            type="error"
            showIcon
            action={
              <Button onClick={() => dispatch(getNews())} size="small">
                Попробовать снова
              </Button>
            }
          />
        </Col>
      </Row>
    );
  }

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined />} size="large">
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Title level={2} strong>
            Hacker News
          </Title>
        </Col>
        {!loading && (
          <Col xs={24}>
            <Button
              onClick={() => dispatch(getNews())}
              type="primary"
              icon={<ReloadOutlined />}
            >
              Refresh news
            </Button>
          </Col>
        )}
        {news.map((item) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
            <Card
              title={item.title}
              hoverable
              onClick={() => navigate(`/${item.id}`)}
            >
              <Space orientation="vertical" size="small">
                <span>⭐ {item.score}</span>
                <span>👤 {item.by}</span>
                <span>{new Date(item.time * 1000).toLocaleString()}</span>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default Main;
