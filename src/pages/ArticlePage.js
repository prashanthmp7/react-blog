import React, { useState, useEffect } from 'react';
import articles from './article-content';

const ArticlePage = ({ match }) => {
    const { name } = match.params;

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchArticleInfo = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        };

        fetchArticleInfo();
    }, [name]);

    const matchingArticle = articles.find(article => article.name === name);
    return matchingArticle ? 
    (
        <>
        <h1>{matchingArticle.title}</h1>
        <p>This article has {articleInfo.upvotes} upvotes</p>
        {matchingArticle.content.map((paragraph, key) => <p key={key}>{paragraph}</p>)}
        </>
    ) : (
        <h1>Uh oh, looks like that article doesn't exist</h1>
    );
};

export default ArticlePage;
