import React from 'react';
import NewsFeed from '../components/NewsFeed';
import '../styles/news.css';

const News = () => {
  return (
    <div>
        <NewsFeed />
      <footer>
        <p>© {new Date().getFullYear()} Heather DeLiso</p>
      </footer>
    </div>
  );
};

export default News;
