import { useState, useEffect } from 'react';
import { searchMovies, fetchMovieDetails, fetchCredits } from '../services/api';

const useSearchMovies = (query,year) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieList = await searchMovies(query, year);
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
        setHasMore(response.page < response.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query, year]);

  return { data, hasMore  };
};

export default useSearchMovies;



