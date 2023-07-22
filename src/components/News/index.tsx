import React, { useEffect, useState } from "react"
import "./style.css"

type NewsItemProps = {
  url: string
  title: string
  comments_count: number
  user: string
}

export default function News() {
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news.json")
      .then((res) => res.json())
      .then((json) => setNewsList(json))
  }, [])

  console.log(newsList)

  const render = newsList.map((news: NewsItemProps, index: number) => {
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
    )
  })

  return (
    <>
      <div className="title">뉴스 앱</div>
      <div>{render}</div>
    </>
  )
}