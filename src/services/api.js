import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2dca580c2a14b55200e784d157207b4d';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY }
});

export const fetchMovieData = async (year, genres) => {
  try {
    const genreParam = Array.isArray(genres) && genres.length > 0 ? genres.join(',') : undefined;
    const response = await apiClient.get('/discover/movie', {
      params: {
        primary_release_year: year,
        vote_count_gte: 100,
        sort_by: 'popularity.desc',
        with_genres: genreParam,
        page: 1
      }
    });
    return response.data.results.slice(0, 20);
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Error fetching movies");
  }
};
export const searchMovies = async (queryData, year) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {
        primary_release_year: year,
        sort_by: 'popularity.desc',
        query : queryData,
        page: 1
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Error searching movies");
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Error fetching movie details");
  }
};

export const fetchCredits = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw new Error("Error fetching credits");
  }
};

export const fetchGenric = async () => {
  try {
    const response = await apiClient.get(`/genre/movie/list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw new Error("Error fetching genres");
  }
};
