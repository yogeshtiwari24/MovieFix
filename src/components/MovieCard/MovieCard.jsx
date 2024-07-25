/* eslint-disable react/prop-types */
import React from "react";
import "./MovieCard.css";
import altMovie from '../../assets/images/altMovie.jpg';

export default function MovieCard({ movie }) {
  const handleError = (event) => {
    event.target.src = altMovie;
  };

  return (
    <div className="movie_card">
      <div className="movie_card_top">
        <div className="card_movie_poster_content">
          <img
            className="card_movie_poster"
            src={`http://image.tmdb.org/t/p/original/${movie.Image}`}
            alt={movie.Name}
            onError={handleError}
          />
        </div>
      </div>
      <div className="movie_card_bottom">
        <div className="card_movie_genres">
          <div className="genres_chip">
            {movie.Genre.slice(0, 5).map((genre, i) => (
              <span className="genres_name" key={i}>
                {genre}
              </span>
            ))}
          </div>
        </div>
        <h5 className="movie_card_title">{movie.Name}</h5>
        <p className="movie_card_description">{movie.Description}</p>
        <p className="movie_card_cast">
          <span className="cast_tag card_item_text">Cast: </span>
          {movie.Cast.slice(0, 5).map((actor, i) => (
            <span key={i} className="cast_item cast_item_subtext">
              {actor.Name}
              {i < movie.Cast.slice(0, 5).length - 1 && ", "}
            </span>
          ))}
        </p>
        <div className="movie_card_director">
          <p className="director_tag card_item_text">
            Director: <span>{movie.Director}</span>
          </p>
        </div>
      </div>
      <div className="rating-wrapper">
        {[...Array(Math.round(movie.Rating / 2))].map((_, i) => (
          <svg
            key={i}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 576 512"
            className="star"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
          </svg>
        ))}
      </div>
    </div>
  );
}
