import React, { useEffect, useState } from "react"
import styles from "./style.module.scss"

export default function News() {
  const [newsList, setNewsList] = useState([])

  const url = "https://api.hnpwa.com/v0/news.json"

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setNewsList(json))
  }, [])

  console.log(newsList)

  const render = newsList.map((news, index) => {
    return (
      <div key={index}>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.newsTitle}
        >
          {news.title}
        </a>
        <span
          className={
            styles[
              news.comments_count >= 100
                ? "newsComments_countHigh"
                : news.comments_count >= 50
                ? "newsComments_countLow"
                : "newsComments_count"
            ]
          }
        >
          comments_count: {news.comments_count}
        </span>
        <div className={styles.newsUser}>user: {news.user}</div>
      </div>
    )
  })

  return (
    <>
      <div className={styles.title}>뉴스 앱</div>
      <div>{render}</div>
    </>
  )
}
