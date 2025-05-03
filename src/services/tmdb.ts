import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};

export const searchMovies = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            api_key: API_KEY,
            query,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};

export const getMovieDetails = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });
    return response.data;
};

export const getSimilarMovies = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};