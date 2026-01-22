import { useNavigate } from 'react-router';
import { Col, Row, Card, Space, Typography } from 'antd';

const news = [
  {
    id: 42625705,
    title: 'Stripe добавляет поддержку USDC на Solana',
    score: 456,
    author: 'pg',
    time: 1737428500, // timestamp
  },
  {
    id: 42625678,
    title: 'React Forget: новые эксперименты от команды React',
    score: 289,
    author: 'dan_abramov',
    time: 1737428200,
  },
  {
    id: 42625512,
    title: 'Как мы ускорили PostgreSQL на 300% с помощью Rust',
    score: 178,
    author: 'tomaslin',
    time: 1737427800,
  },
  {
    id: 42625433,
    title: 'Vite 8 с Rolldown: сборка в 20x быстрее',
    score: 342,
    author: 'vitejs',
    time: 1737427600,
  },
  {
    id: 42625389,
    title: 'Почему Tailwind CSS побеждает CSS Modules',
    score: 215,
    author: 'mrmrs',
    time: 1737427400,
  },
];

const Main = () => {
  const navigate = useNavigate();

  const { Title } = Typography;
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Title level={2}>Hacker News</Title>
        </Col>
        {news.map((item) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
            <Card
              title={item.title}
              hoverable
              onClick={() => navigate(`/news/${item.id}`)}
            >
              <Space orientation="vertical" size="small">
                <span>⭐ {item.score}</span>
                <span>👤 {item.author}</span>
                <span>{new Date(item.time * 1000).toLocaleString()}</span>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Main;
