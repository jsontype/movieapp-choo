import { useState, useEffect, memo, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import styles from "./style.module.scss"

type MoviesItemProps = {
  id: number
  title: string
  rating: number
  runtime: number
  genres: string[]
  summary: string
  large_cover_image: string
}

function Movies() {
  const [searchParams] = useSearchParams()
  const sortby = useMemo(() => searchParams.get("sortby"), [searchParams])
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

  const render = useMemo(
    () =>
      movies.map((item: MoviesItemProps) => {
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
              평점 : {item.rating} / 10
            </div>
            <div>
              상영시간 : {item.runtime / 60}시간 {item.runtime % 60}분
            </div>
            <div>장르 : {item.genres.join(", ")}</div>
            <div>
              줄거리 :{" "}
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
      }),
    [movies]
  )

  return (
    <>
      <div className={styles.title}>무비 앱</div>
      <button onClick={() => setSort("rating")}>평점순</button>
      <button onClick={() => setSort("download_count")}>다운로드순</button>
      <button onClick={() => setSort("title")}>제목순</button>
      <button onClick={() => setSort("year")}>연도순</button>
      <div>{render}</div>
    </>
  )
}

export default memo(Movies)
