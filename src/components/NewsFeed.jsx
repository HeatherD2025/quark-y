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
    "antiprotons",
    "asteroid",
    "astronaut",
    "astronomy",
    "astonomer",
    "astonomers",
    "atom",
    "atoms",
    "atomic",
    "astrophysics",
    "astrophysists",
    "boson",
    "CERN",
    "centauri",
    "cosmic",
    "cosmology",
    "comet",
    "electron",
    "electromagnetic",
    "fermilab",
    "galatic",
    "galaxy",
    "gluon",
    "gravity",
    "gravitational",
    "Hawking",
    "higgs",
    "hubble",
    "jupiter",
    "kuiper",
    "LHC",
    "LIGO",
    "hadron",
    "lepton",
    "light-years",
    "mars",
    "mercury",
    "meteor",
    "moon",
    "multiverse",
    "muon",
    "NASA",
    "near-earth",
    "nebula",
    "neptune",
    "neutron",
    "neutrino",
    "observatory",
    "oort cloud",
    "orbit",
    "physics",
    "plasma",
    "pluto",
    "photon",
    "proton",
    "qubit",
    "quark",
    "quasar",
    "quantum",
    "quasiparticles",
    "saturn",
    "singularity",
    "solar",
    "space",
    "subatomic",
    "supernova",
    "theory of relativity",
    "universe",
    "uranus",
    "venus",
    "wormhole",
  ];

  const unwantedPhrases = [
    "album",
    "apparel",
    "bomb",
    "baskets",
    "bedroom",
    "bought",
    "bulova",
    "business",
    'emotionally',
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
    "elon",
    "episode",
    "ESPN",
    "film",
    "hiroshima",
    "injured",
    "investment",
    "IP",
    "katy",
    "kia",
    "killed",
    "kitchen",
    "lego",
    "loan",
    'market',
    "marketing",
    'MCU',
    "movie",
    "nagasaki",
    'officers',
    "pepe",
    "phone",
    "prime",
    'projector',
    "python",
    "Re:",
    "realty",
    'shoot',
    "singer",
    "skyscraper",
    "skyscrapers",
    'smartwatch',
    'smartring',
    'smarthome',
    "steam",
    "stock",
    "stocks",
    "street",
    'superman',
    'trailer',
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
      return false; // Exclude regardless of topic
    }

    const matchesTopic = topics.some((topic) => {
      const regex = new RegExp(`\\b${escapeRegExp(topic)}\\b`, "i");
      return regex.test(text);
    });

    if (!matchesTopic) {
      return false;
    }

    return true; // Only articles with topic and no unwanted phrases
  });

  // loading and error states
  if (loadingScience || loadingSpace) return <p>Loading articles...</p>;
  if (errorScience || errorSpace) return <p>Error loading articles</p>;

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
                  style={{ width: "40em", height: "auto" }}
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
