import React, { useState, useEffect } from "react"
import "./style.css"

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
  const [movies, setMovies] = useState([])

  // const url = "https://yts.mx/api/v2/list_movies.json"
  const url = "https://yts.mx/api/v2/list_movies.json?sort_by=rating"

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.data.movies)
      })
  }, [])

  console.log(movies)

  const render = movies.map((item: MoviesItemProps) => {
    return (
      <div key={item.id}>
        <div className={"title"}>
          {item.title} {item.rating >= 9 && "👍"}
        </div>
        <div
          className={
            item.rating >= 9 ? "good" : item.rating >= 7 ? "soso" : "bad"
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
          className="movieImage"
          src={item.large_cover_image}
          alt={item.summary}
        ></img>
      </div>
    )
  })

  return (
    <>
      <div className="title">무비 앱</div>
      <div>{render}</div>
    </>
  )
}