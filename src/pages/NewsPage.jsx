import React from 'react';
import NewsFeed from '../components/NewsFeed';
import '../styles/newsPage.css';

const NewsPage = () => {
  return (
    <div>
        <NewsFeed />
      <footer>
        <p>© {new Date().getFullYear()} Heather DeLiso</p>
      </footer>
    </div>
  );
};

export default NewsPage;
