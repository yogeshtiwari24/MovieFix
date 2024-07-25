import React, { useState, useEffect } from 'react';
import Header from './components/header/header';
import GenreFilter from './components/GenreFilter/GenreFilter';
import useFetchMovies from './hooks/useFetchMovies';
import useScrollHandler from './hooks/useScrollHandler';
import MovieList from './components/MovieList/MovieList';
import './App.css'

function App() {
  const [year, setYear] = useState(2012);
  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { data: newMovies, loading, error } = useFetchMovies(year, selectedGenres);
  const [loadedYears, setLoadedYears] = useState(new Set());


  useEffect(() => {
    if (newMovies.length > 0) {
      const lowestYear = movies.length > 0 ? Math.min(...movies.map((entry) => entry.year)) : Infinity;
      const highestYear = movies.length > 0 ? Math.max(...movies.map((entry) => entry.year)) : 0;

      if (year > highestYear) {
        setMovies((prevMovies) => [...prevMovies, { year, movies: newMovies }]);
      } else if (Math.min(...Array.from(loadedYears)) - 1 < lowestYear) {
        setMovies((prevMovies) => [{ year, movies: newMovies }, ...prevMovies]);
      }

      setLoadedYears((prevYears) => new Set(prevYears).add(year));
      setIsFetching(false);
    }
  }, [newMovies]);

  useScrollHandler({ isFetching, loading, setIsFetching, setYear, loadedYears });

  const handleSelectGenre = (genre) => {
    if (genre) {
      setSelectedGenres((prevGenres) => {
        if (prevGenres.includes(genre)) {
          return prevGenres.filter((g) => g !== genre);
        } else {
          return [...prevGenres, genre];
        }
      });
    } else {
      setSelectedGenres([]);
    }
  };
  return (
    <>
      <Header 
      />
      <GenreFilter
        selectedGenres={selectedGenres}
        onSelectGenre={handleSelectGenre}
      />
      <MovieList
        movies={movies}
        loading={loading}
        error={error}
        setYear={setYear}
      />
    </>
  );
}

export default App;
