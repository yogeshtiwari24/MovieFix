import React, { useState, useEffect } from 'react';
import { fetchGenric } from '../../services/api';
import "./GenreFilter.css"

const GenreFilter = ({ selectedGenres, onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genresList = await fetchGenric();
        setGenres(genresList.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    getGenres();
  }, []);
  return (
    <div className="genres">
      <ul>
        <li
          className={selectedGenres.length === 0 ? 'active' : ''}
          onClick={() => onSelectGenre(null)}
        >
          <button>All</button>
        </li>
        {genres.map((genre) => (
          <li
            key={genre.id}
            className={selectedGenres.includes(genre.id) ? 'active' : ''}
            onClick={() => onSelectGenre(genre.id)}
          >
            <button>{genre.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreFilter;
