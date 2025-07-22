import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScienceNews } from '../redux/slices/newsSlice';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getScienceNews());
  }, [dispatch]);

  const topics = ['space', 'physics', 'astrophysics'];
  const unwantedPhrases = ['office space', 'injured', 'killed', 'storage space', 'reserved storage', 'space bar', 'space heater'];
  
  //dedupicate the article by title
const seenTitles = new Set();
const uniqueArticles = articles.filter((article) => {
  const title = article.title.trim();
  if (seenTitles.has(title)) return false;
  seenTitles.add(title);
  return true;
});

  const filteredArticles = uniqueArticles.filter((article) => {
    const text = (article.title + ' ' + (article.description || '')).toLowerCase();
    const matchesTopic = topics.some((topic) => text.includes(topic));
    const containsUnwanted = unwantedPhrases.some((phrase) => text.includes(phrase));

    return matchesTopic && !containsUnwanted;
  });

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Curated Science Articles</h2>
      {filteredArticles.length === 0 && <p>No relevant articles found.</p>}
      {filteredArticles.map((article, index) => (
        <div key={index} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
          <h3>{article.title}</h3>
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '0.5rem' }}
            />
          )}
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read full article
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
