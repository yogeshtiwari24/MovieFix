import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css'
const MovieList = ({ movies, loading, error}) => {

  if (loading && movies.length === 0) return <div className="dot"></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading && <div className="dot"></div>}
      {movies.map((entry, index) => (
        <div key={index} className='movieListSection'>
          <h2>Must Watch Films from <span>{entry.year}</span></h2>
          <ul className="card_main">
            {entry.movies.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </ul>
        </div>
      ))}
      {loading && <div className="dot"></div>}
    </>
  );
};

export default MovieList;
