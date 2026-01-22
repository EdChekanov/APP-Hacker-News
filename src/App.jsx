import { BrowserRouter, Route, Routes } from 'react-router';

import NewsItem from './components/NewsItem';
import Main from './components/Main';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<NewsItem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
