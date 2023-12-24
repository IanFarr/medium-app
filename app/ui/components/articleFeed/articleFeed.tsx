"use client";

import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import ArticleCard from "./articleCard";

type ArticleQueryParams = {
  take?: number;
  lastCursor?: string;
};

const allArticles = async ({ take, lastCursor }: ArticleQueryParams) => {
  const response = await axios.get("/api/article", {
    params: { take, lastCursor },
  });
  return response?.data;
};

type ArticlesType = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    image: string;
  };
  authorId: number;
  numClaps: number;
};

const ArticleFeed = () => {
  const queryKey = ["articles"];
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = "" }) =>
      allArticles({ take: 5, lastCursor: String(pageParam) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.metaData?.lastCursor,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      {result?.data?.pages?.map((page, index) => (
        <div key={index}>
          {page?.data?.map((article: ArticlesType) => (
            <div ref={ref} key={article.id}>
              <ArticleCard
                key={article.id}
                title={article.title}
                body={article.body}
                userImage={article.author.image}
                authorName={article.author.name}
                date={article.createdAt}
                tag={article.tags[0]}
                articleImage={article.image}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArticleFeed;
