import React from 'react';
import { useGetScienceArticlesQuery } from '../api/scienceNewsApi';
import { useGetSpaceArticlesQuery } from '../api/spaceNewsApi';
import '../styles/landingPage.css';

const NewsFeed = () => {
  const { data: scienceData, isLoading: loadingScience, error: errorScience } = useGetScienceArticlesQuery();
  const { data: spaceData, isLoading: loadingSpace, error: errorSpace } = useGetSpaceArticlesQuery();

  const articles = [
    ...(scienceData?.articles || []),
    ...(spaceData?.results || []), // rememeber spaceflight API uses `results`
  ];

  const topics = [
    'space', 
    'physics', 
    'astrophysics',
    'gravitational waves',
    'quantum mechanics',
    'quantum computing',
    'quantum computer',
    'quantum computers',
    'theory of relativity',
    'higgs field', 
    'atom',
    'electron',
    'proton',
    'neutron',
    'boson',
    'lepton',
    'gluon',
    'quark',
    'CERN',
    'LHC',
    'large hadron collider', 
    'LIGO', 
    'mercury', 
    'venus',
    'mars',
    'moon',
    'jupiter',
    'saturn',
    'neptune',
    'kuiper belt',
    'oort cloud', 
    'near-earth', 
    'asteroid',
    'supernova',
    'black hole',
    'wormhole', 
  ];

  const unwantedPhrases = [
    'office space',
    'injured',
    'killed',
    'storage space',
    'reserved storage',
    'space bar',
    'space heater',
    'safe space',
    'office space',
    'work space',
    'workspace',
    'lego',
    'delivery space',
    'investment',
    'bought',
    'buy',
    'wallet',
    'esports space',
    'python',
    'prime day',
    'retreat',
    'abstract design',
    'elon musk',
    'resting space',
    'temporary space',
    'moonbats',
  ];

  // Remove duplicates by title
  const seenTitles = new Set();
  const uniqueArticles = articles.filter((article) => {
    const title = article.title.trim();
    if (!title || seenTitles.has(title)) return false;
    seenTitles.add(title);
    return true;
  });

  // Filter by topic and keywords/unwanted keywords
  const filteredArticles = uniqueArticles.filter((article) => {
    const text = (article.title + ' ' + (article.description || '')).toLowerCase();
    const matchesTopic = topics.some((topic) => text.includes(topic));
    const containsUnwanted = unwantedPhrases.some((phrase) => text.includes(phrase));
    return matchesTopic && !containsUnwanted;
  });

  if (loadingScience || loadingSpace) return <p>Loading articles...</p>;
  if (errorScience || errorSpace) return <p>Error loading articles</p>;

  return (
   <>
      <div className='newsheaderContainer'>
        <h2 className='newsfeedHeader'>Quark-y Newsfeed</h2>
      </div>
    <div style={{ padding: '10rem' }}>
      {filteredArticles.length === 0 && <p>No relevant articles found.</p>}
      {filteredArticles.map((article, index) => (
        <div
          className='articleDescription'
          key={index}
          style={{ 
            marginBottom: '2rem', 
            borderBottom: '1px solid #ccc', 
            paddingBottom: '2rem',
          }}
        >
          <h3 className='articleTitle'>{article.title}</h3>
          {article.urlToImage && (
            <img
              className='articleImage'
              src={article.urlToImage}
              alt={article.title}
            />
          )}
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read full article
          </a>
        </div>
      ))}
    </div>
   </>
  );
};

export default NewsFeed;
