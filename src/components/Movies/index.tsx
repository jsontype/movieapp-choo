import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"

type MoviesItemProps = {
  id: number
  title: string
  rating: number
  runtime: number
  genres: string[]
  summary: string
  large_cover_image: string
}

export default function Movies() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const sortby = searchParams.get("sortby")
  const [sort, setSort] = useState(sortby || "rating")
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const url =
      sort === "download_count"
        ? "https://yts.mx/api/v2/list_movies.json?sort_by=download_count"
        : sort === "title"
        ? "https://yts.mx/api/v2/list_movies.json?sort_by=title"
        : sort === "year"
        ? "https://yts.mx/api/v2/list_movies.json?sort_by=year"
        : "https://yts.mx/api/v2/list_movies.json?sort_by=rating"

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.data.movies)
      })
  }, [sort])

  const render = movies.map((item: MoviesItemProps) => {
    return (
      <div key={item.id}>
        <div className={styles.title}>
          {item.title} {item.rating >= 9 && "👍"}
        </div>
        <div
          className={
            styles[
              item.rating >= 9 ? "good" : item.rating >= 7 ? "soso" : "bad"
            ]
          }
        >
          {t("movies:itemRating")} : {item.rating} / 10
        </div>
        <div>
          {t("movies:itemRuntime")} : {item.runtime / 60}
          {t("movies:itemRuntimeHour")} {item.runtime % 60}
          {t("movies:itemRuntimeMinute")}
        </div>
        <div>
          {t("movies:itemGenres")} : {item.genres.join(", ")}
        </div>
        <div>
          {t("movies:itemSummary")} :{" "}
          {item.summary.length > 100
            ? `${item.summary.substring(0, 99)} ...`
            : item.summary}
        </div>
        <img
          className={styles.movieImage}
          src={item.large_cover_image}
          alt={item.summary}
        ></img>
      </div>
    )
  })

  return (
    <>
      <div className={styles.title}>{t("movies:title")}</div>
      <button onClick={() => setSort("rating")}>
        {t("movies:sortRating")}
      </button>
      <button onClick={() => setSort("download_count")}>
        {t("movies:sortDownloadCount")}
      </button>
      <button onClick={() => setSort("title")}>{t("movies:sortTitle")}</button>
      <button onClick={() => setSort("year")}>{t("movies:sortYear")}</button>
      <div>{render}</div>
    </>
  )
}
