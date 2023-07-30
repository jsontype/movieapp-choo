import { useEffect, useState, memo, useMemo } from "react"
import styles from "./style.module.scss"

type NewsItemProps = {
  url: string
  title: string
  comments_count: number
  user: string
}

function News() {
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news.json")
      .then((res) => res.json())
      .then((json) => setNewsList(json))
  }, [])

  const render = useMemo(
    () =>
      newsList.map((news: NewsItemProps, index: number) => {
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
      }),
    [newsList]
  )

  return (
    <>
      <div className={styles.title}>뉴스 앱</div>
      <div>{render}</div>
    </>
  )
}

export default memo(News)
