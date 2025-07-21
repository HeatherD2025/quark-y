const NEWS_API_KEY = '18b273289a5446f98d81f281c526a7be';
const BASE_URL = 'https://newsapi.org/v2';


export const fetchScienceNews  = async () => {
    const topics = ['physics', 'space', 'astrophysics'];
    const query = topics.join(' OR ');

    const response = await fetch(`${BASE_URL}/everything?qInTitle=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`
);

if (!response.ok) {
  throw new Error('Failed to fetch science news');
}

const data = await response.json();
return data.articles;
};