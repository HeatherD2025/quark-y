import React, { useState, useEffect } from "react";
import { useGetScienceArticlesQuery } from "../api/scienceNewsApi";
import { useGetSpaceArticlesQuery } from "../api/spaceNewsApi";
import { getToken } from "../utils/tokenService";
import "../styles/home.css";

const NewsFeed = () => {
  // state declarations
  const [page, setPage] = useState(1);
  const [articlesShown, setArticlesShown] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // authNeeded check
  useEffect(() => {
    const token = getToken();
    setHasToken(!!token);
  },[]);

  // data fetching hooks
  const {
    data: scienceData,
    isLoading: loadingScience,
    error: errorScience,
  } = useGetScienceArticlesQuery({ page, pageSize: 10 });

  const {
    data: spaceData,
    isLoading: loadingSpace,
    error: errorSpace,
  } = useGetSpaceArticlesQuery({ page, pageSize: 10 });

  // button logic
  const handleLoadMore = () => { 
    setPage(prevPage => prevPage +1);
  };

  // useEffect updates articlesShown when data changes
  useEffect(() => {
    const existingTitles = new Set(articlesShown.map((a) => a.title));
    const newArticles = [
      ...(scienceData?.articles || []),
      ...(spaceData?.results || []), // spaceData uses `.results` not `.articles`
    ];

    const uniqueNewArticles = newArticles.filter(
      (article) => !existingTitles.has(article.title)
    );

    if (uniqueNewArticles.length > 0) {
      setArticlesShown((prev) => [...prev, ...uniqueNewArticles]);
    }

    if (
      (scienceData && scienceData.articles?.length < 10) &&
      (spaceData && spaceData.results?.length < 10)
    ) {
      setHasMore(false);
    }

    setLoading(false);
  }, [scienceData, spaceData]);

  // filtering
const topics = [
    "asteroid",
    "atom",
    "astrophysics",
    "black hole",
    "boson",
    "CERN",
    "electron",
    "gluon",
    "gravitational waves",
    "higgs field",
    "jupiter",
    "kuiper belt",
    "LHC",
    "LIGO",
    "large hadron collider",
    "lepton",
    "mars",
    "mercury",
    "moon",
    "near-earth",
    "neptune",
    "neutron",
    "oort cloud",
    "physics",
    "proton",
    "quark",
    "quantum computer",
    "quantum computers",
    "quantum computing",
    "quantum mechanics",
    "saturn",
    "space",
    "supernova",
    "theory of relativity",
    "venus",
    "wormhole",
  ];

  const unwantedPhrases = [
    "abstract design",
    "additional space",
    "and space for",
    "apparel",
    "atomic bomb",
    "bedroom",
    "bought",
    "bulova",
    "business",
    "graphics",
    "buy",
    "crypto",
    "delivery space",
    "detention space",
    "disease",
    "elon musk",
    "energy space",
    "episode",
    "esports space",
    "ESPN",
    "film",
    'gathering space',
    "hiroshima bombing",
    "injured",
    "investment",
    "katy perry",
    "killed",
    "kitchen",
    "lego",
    "loan deal",
    "living space",
    "marketing",
    "make space",
    "moonbats",
    "moonstone",
    "movie",
    "nagasaki bombing",
    "office space",
    "office space",
    "pepe",
    'phone',
    "prime day",
    "python",
    "relaxed space",
    "reserved storage",
    "resting space",
    'retail space',
    "safe space",
    "singer",
    "space bar",
    "space constraints",
    "space heater",
    "space mountain",
    "steam launch",
    "stock",
    "stocks",
    "storage space",
    "temporary space",
    "wallet",
    "work space",
    "wall street",
    "workspace",
    "xbox",
  ];

  // remove duplicates
  const seenTitles = new Set();
  const uniqueArticles = articlesShown.filter((article) => {
    const title = article.title.trim();
    if (!title || seenTitles.has(title)) return false;
    seenTitles.add(title);
    return true;
  });

  // filter articles by topic and unwanted keywords
  const filteredArticles = uniqueArticles.filter((article) => {
    const text = (
      article.title +
      " " +
      (article.description || "")
    ).toLowerCase();
    const matchesTopic = topics.some((topic) => text.includes(topic));
    const containsUnwanted = unwantedPhrases.some((phrase) =>
      text.includes(phrase)
    );
    return matchesTopic && !containsUnwanted;
  });

  // loading and error states
  if (loadingScience || loadingSpace) return <p>Loading articles...</p>;
  if (errorScience || errorSpace) return <p>Error loading articles</p>;

  return (
    <>
      <div className="newsheaderContainer">
        <h2 className="newsfeedHeader">Quark-y Newsfeed</h2>
      </div>
      <div className="newsfeedContainer">
        <div style={{ padding: "10rem" }}>
          {filteredArticles.length === 0 && <p>No relevant articles found.</p>}
          {filteredArticles.map((article, index) => (
            <div
              className="articleDescription"
              key={index}
              style={{
                marginBottom: "2rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "2rem",
              }}
            >
              <h3 className="articleTitle">{article.title}</h3>
              {article.urlToImage && (
                <img
                  className="articleImage"
                  src={article.urlToImage}
                  alt={article.title}
                  style={{ width: "100%" }}
                />
              )}
              <p>{article.description}</p>

              {hasToken ? (
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read full article
              </a>
            ) : (
              <p>Log in to read this article</p>
            )}
            </div>
          ))}

          {hasMore && (
            <button onClick={handleLoadMore}>load more articles</button>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsFeed;

