import React, { useState, useEffect } from "react";
import { useGetScienceArticlesQuery } from "../api/scienceNewsApi";
import { useGetSpaceArticlesQuery } from "../api/spaceNewsApi";
import { getToken } from "../utils/tokenService";

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
  }, []);

  // data fetching hooks
  const {
    data: scienceData,
    isLoading: loadingScience,
    error: errorScience,
  } = useGetScienceArticlesQuery({ page, pageSize: 20 });

  const {
    data: spaceData,
    isLoading: loadingSpace,
    error: errorSpace,
  } = useGetSpaceArticlesQuery({ page, pageSize: 20 });

  // button logic
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
      scienceData &&
      scienceData.articles?.length < 20 &&
      spaceData &&
      spaceData.results?.length < 20
    ) {
      setHasMore(false);
    }

    setLoading(false);

    console.log(
      "📦 Total fetched articles (articlesShown):",
      articlesShown.length
    );
  }, [scienceData, spaceData]);

  // filtering
  const topics = [
    "antineutrino",
    "antineutrinos",
    "antimatter",
    "asteroid",
    "astronaut",
    "astronomy",
    "atom",
    "atoms",
    "astrophysics",
    "astrophysists",
    "boson",
    "CERN",
    "cosmic",
    "comet",
    "electron",
    "gluon",
    "gravity",
    "gravitational waves",
    "Hawking",
    "higgs field",
    "hole",
    "hubble",
    "jupiter",
    "kuiper belt",
    "LHC",
    "LIGO",
    "large hadron collider",
    "lepton",
    "mars",
    "mercury",
    "moon",
    "multiverse",
    "NASA",
    "near-earth",
    "neptune",
    "neutron",
    "neutrino",
    "observatory",
    "oort cloud",
    "physics",
    "plasma",
    "photon",
    "proton",
    "qubit",
    "quark",
    "quantum",
    "saturn",
    "solar",
    "space",
    "supernova",
    "theory of relativity",
    "venus",
    "wormhole",
  ];

  const unwantedPhrases = [
    "abstract design",
    // " additional space ",
    "album",
    "apparel",
    "atomic bomb",
    "baskets",
    "bedroom",
    "bought",
    "bulova",
    "business",
    "graphics",
    "buy",
    "CEO",
    "cloudflare",
    "condo",
    "Cogent",
    "comedian",
    "comedians",
    "crypto",
    "disease",
    "elon musk",
    "episode",
    "ESPN",
    "film",
    "hiroshima",
    "injured",
    "investment",
    "IP",
    "katy perry",
    "kia",
    "killed",
    "kitchen",
    "lego",
    "loan",
    "marketing",
    "movie",
    "nagasaki bombing",
    "pepe",
    "phone",
    "prime",
    "python",
    "Re:",
    "realty",
    "singer",
    "skyscraper",
    "skyscrapers",
    "steam",
    "stock",
    "stocks",
    "street",
    "wallet",
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

  console.log("🔍 Unique articles (no duplicates):", uniqueArticles.length);

  // helper function
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // filter articles by topic and unwanted keywords
  const filteredArticles = uniqueArticles.filter((article) => {
    const text = (
      article.title +
      " " +
      (article.description || "")
    ).toLowerCase();

    const containsUnwanted = unwantedPhrases.some((phrase) => {
      const regex = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "i");
      return regex.test(text);
    });
    if (containsUnwanted) {
      console.log("🚫 Excluded (unwanted phrase):", article.title);
      return false; // Exclude regardless of topic
    }

    const matchesTopic = topics.some((topic) => {
      const regex = new RegExp(`\\b${escapeRegExp(topic)}\\b`, "i");
      return regex.test(text);
    });

    if (!matchesTopic) {
      console.log("⛔️ Excluded (no topic match):", article.title);
      return false;
    }

    return true; // Only articles with topic and no unwanted phrases
  });

  console.log("✅ Final filtered articles:", filteredArticles.length);

  // loading and error states
  if (loadingScience || loadingSpace) return <p>Loading articles...</p>;
  if (errorScience || errorSpace) return <p>Error loading articles</p>;

  console.log("📰 Final filtered articles to display:", filteredArticles);

  return (
    <>
      <div className="newsfeedContainer">
        <p className="newsfeedHeader">Quarky News</p>
        <div
          style={{
            paddingRight: "10rem",
            paddingLeft: "10rem",
          }}
        >
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
