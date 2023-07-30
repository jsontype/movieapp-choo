import React, { useEffect, useState } from "react"
import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"

type NewsItemProps = {
  url: string
  title: string
  comments_count: number
  user: string
}

export default function News() {
  const { t } = useTranslation()

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
          {t("news:itemCommentsCount")}: {news.comments_count}
        </span>
        <div className={styles.newsUser}>
          {t("news:itemUser")}: {news.user}
        </div>
      </div>
    )
  })

  return (
    <>
      <div className={styles.title}>{t("news:title")}</div>
      <div>{render}</div>
    </>
  )
}
