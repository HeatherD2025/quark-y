import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticleDetail = () => {
    const { articleUrl } = useParams();
    const [ article, setArticle ] = useState();

    useEffect(() =>{
        const fetchArticle = async () => {
            try{
              const res = await fetch(`api/articles/${encodeURIComponent(articleUrl)}`);
              const data = await res.json();
              setArticle(data);
            } catch (err) {
                console.error("error fetching article", err)
            }
      };

        fetchArticle();
    }, [articleUrl]);

    if (!article) return <p>loading article..</p>

    return (
        <>
        <h1>{article.headline}</h1>
        <img src={article.urlToImage}></img>
        </>
    )
}
export default ArticleDetail