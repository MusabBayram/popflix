import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const [moviesResponse, genresResponse] = await Promise.all([
        axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: "en-US",
                page: 1,
            },
        }),
        axios.get(`${BASE_URL}/genre/movie/list`, {
            params: {
                api_key: API_KEY,
                language: "en-US",
            },
        }),
    ]);

    const genreMap = genresResponse.data.genres.reduce(
        (acc: Record<number, string>, genre: { id: number; name: string }) => {
            acc[genre.id] = genre.name;
            return acc;
        },
        {}
    );

    return moviesResponse.data.results.map((movie: any) => ({
        ...movie,
        genre_names: movie.genre_ids?.map((id: number) => genreMap[id]).filter(Boolean),
    }));
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