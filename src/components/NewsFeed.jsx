import React from 'react';
import { useGetScienceArticlesQuery } from '../api/scienceNewsApi';
import { useGetSpaceArticlesQuery } from '../api/spaceNewsApi';
import '../styles/home.css';
import { useState } from 'react';

const NewsFeed = () => {
  const { data: scienceData, isLoading: loadingScience, error: errorScience } = useGetScienceArticlesQuery();
  const { data: spaceData, isLoading: loadingSpace, error: errorSpace } = useGetSpaceArticlesQuery();

  const articles = [
    ...(scienceData?.articles || []),
    ...(spaceData?.results || []), // rememeber spaceflight API uses `results`
  ];

  const topics = [
    'asteroid',
    'atom',
    'astrophysics',
    'black hole',
    'boson',
    'CERN',
    'electron',
    'gluon',
    'gravitational waves',
    'higgs field',
    'jupiter',
    'kuiper belt',
    'LHC',
    'LIGO',
    'large hadron collider',
    'lepton',
    'mars',
    'mercury',
    'moon',
    'near-earth',
    'neptune',
    'neutron',
    'oort cloud',
    'physics',
    'proton',
    'quark',
    'quantum computer',
    'quantum computers',
    'quantum computing',
    'quantum mechanics',
    'saturn',
    'space',
    'supernova',
    'theory of relativity',
    'venus',
    'wormhole',
  ];

  const unwantedPhrases = [
    'abstract design',
    'additional space',
    'and space for',
    'apparel',
    'atomic bomb',
    'bedroom',
    'bought',
    'bulova',
    'business',
    'graphics',
    'buy',
    'crypto',
    'delivery space',
    'detention space',
    'disease',
    'elon musk',
    'energy space',
    'episode',
    'esports space',
    'ESPN',
    'film',
    'hiroshima bombing',
    'injured',
    'investment',
    'katy perry',
    'killed',
    'kitchen',
    'lego',
    'loan deal',
    'living space',
    'marketing',
    'make space',
    'moonbats',
    'moonstone',
    'movie',
    'nagasaki bombing',
    'office space',
    'office space',
    'pepe',
    'prime day',
    'python',
    'relaxed space',
    'reserved storage',
    'resting space',
    'safe space',
    'singer',
    'space bar',
    'space constraints',
    'space heater',
    'space mountain',
    'steam launch',
    'stock',
    'stocks',
    'storage space',
    'temporary space',
    'wallet',
    'work space',
    'wall street',
    'workspace',
    'xbox',
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
      <div classname="newsfeedContainer">
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
              style={{
                width: '100%',
              }}
            />
          )}
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read full article
          </a>
        </div>
      ))}
     </div>
    </div>
   </>
  );
};

export default NewsFeed;
