import { Space, Card, Typography, Tag } from 'antd';
import { useSelector } from 'react-redux';

import { selectNewsItem } from '../../redux/slices/newsItemSlice';

const NewsItemInfo = () => {
  const newsItem = useSelector(selectNewsItem);

  const { Title, Text } = Typography;

  return (
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
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
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
  );
};

export default NewsItemInfo;
