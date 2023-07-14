import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);

  // const url = "https://yts.mx/api/v2/list_movies.json"
  const url = "https://yts.mx/api/v2/list_movies.json?sort_by=rating";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.data.movies);
      });
  }, []);

  console.log(movies);

  const render = movies.map((item) => {
    return (
      <div key={item.id}>
        <div>{item.title}</div>
        <div
          className={
            item.rating >= 9 ? "good" : item.rating >= 7 ? "soso" : "bad"
          }
        >
          평점 : {item.rating} / 10
        </div>
        <img
          className="movieImage"
          src={item.large_cover_image}
          alt={item.summary}
        ></img>
      </div>
    );
  });

  return (
    <>
      <h1>무비앱</h1>
      <div>{render}</div>
    </>
  );
}
