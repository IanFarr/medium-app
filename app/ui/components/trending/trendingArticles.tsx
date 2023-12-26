"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import styles from "./trendingArticles.module.css";
import TrendingArticleCard from "./trendingArticleCard";

const trendingArticles = async () => {
  const response = await axios.get("/api/article/trending");
  return response?.data;
};

type TrendingArticlesType = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    image: string;
  };
  authorId: number;
  numClaps: number;
};

const TrendingArticles = () => {
  const [articles, setArticles] = useState<TrendingArticlesType[]>([]);

  useEffect(() => {
    trendingArticles().then(setArticles);
  }, []);

  return (
    <div className={styles.trendingArticlesDiv}>
      <div className={styles.trendingArticlesHeaderDiv}>
        <Image
          src="/trending-icon.png"
          alt="trending articles image"
          width={20}
          height={20}
        />
        <p className={styles.trendingArticlesTitle}>Trending on Medium</p>
      </div>
      <div className={styles.trendingArticlesContentDiv}>
        {articles.map((article: TrendingArticlesType, index) => (
          <TrendingArticleCard
            key={article.id}
            title={article.title}
            userImage={article.author.image}
            authorName={article.author.name}
            date={article.createdAt}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
