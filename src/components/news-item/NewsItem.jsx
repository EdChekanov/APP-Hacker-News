import { Col, Row, Button, Typography, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewsItemHeader from './NewsItemHeader';

import { getNewsItem } from '../../redux/api/newsApi';
import {
  selectError,
  selectLoading,
  selectNewsItem,
} from '../../redux/slices/newsItemSlice';
import NewsItemInfo from './NewsItemInfo';
import Comments from './comments/Comments';

const NewsItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const newsItem = useSelector(selectNewsItem);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { Title } = Typography;

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
              <Button onClick={() => dispatch(getNewsItem(id))} size="small">
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
          <NewsItemHeader />
        </Col>

        <Col xs={24}>
          <NewsItemInfo />
        </Col>

        <Col xs={24}>
          <Comments />
        </Col>
      </Row>
    </Spin>
  );
};

export default NewsItem;
