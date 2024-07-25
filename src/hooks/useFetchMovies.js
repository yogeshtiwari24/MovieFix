import { useState, useEffect } from 'react';
import { fetchMovieData, fetchMovieDetails, fetchCredits } from '../services/api';

const useFetchMovies = (year, genres) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMoviesData = async () => {
      try {
        setLoading(true);
        const movieList = await fetchMovieData(year, genres);
        const movieDetailsPromises = movieList.map(async (movie) => {
          const details = await fetchMovieDetails(movie.id);
          const credits = await fetchCredits(movie.id);

          return {
            Name: details.title,
            Image: movie.backdrop_path,
            Description: details.overview,
            Rating: details.vote_average,
            Cast: credits.cast.map(actor => ({
              Name: actor.name,
              Role: actor.character
            })),
            Director: credits.crew.find(member => member.job === 'Director')?.name || 'Unknown',
            Genre: details.genres.map(genre => genre.name),
            year
          };
        });

        const detailedMovies = await Promise.all(movieDetailsPromises);
        setData(detailedMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMoviesData();
  }, [year, genres]);

  return { data, loading, error };
};

export default useFetchMovies;
