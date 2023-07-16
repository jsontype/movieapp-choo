import React, { useEffect, useState } from "react";
import "./App.css";

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);

  const url = "https://api.hnpwa.com/v0/news.json";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setNewsList(json));
  }, []);

  console.log(newsList);

  const render = newsList.map((news, index) => {
    return (
      <div key={index}>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="newsTitle"
        >
          {news.title}
        </a>
        <span
          className={
            news.comments_count >= 100
              ? "newsComments_countHigh"
              : news.comments_count >= 50
              ? "newsComments_countLow"
              : "newsComments_count"
          }
        >
          comments_count: {news.comments_count}
        </span>
        <div className="newsUser">user: {news.user}</div>
      </div>
    );
  });

  return (
    <>
      <h1 className="title">News List</h1>
      <div>{render}</div>
    </>
  );
}
