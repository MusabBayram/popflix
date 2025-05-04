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

export const discoverMovies = async (filters: {
    genres?: string[];
    topRated?: boolean;
    year?: string;
}) => {
    const genreMap = await axios
        .get(`${BASE_URL}/genre/movie/list`, {
            params: {
                api_key: API_KEY,
                language: "en-US",
            },
        })
        .then((res) =>
            res.data.genres.reduce((acc: Record<string, number>, genre: any) => {
                acc[genre.name] = genre.id;
                return acc;
            }, {})
        );

    const genreIds = filters.genres?.map((name) => genreMap[name]).filter(Boolean);

    const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            sort_by: filters.topRated ? "vote_average.desc" : "popularity.desc",
            with_genres: genreIds?.join(","),
            ...(filters.year ? { primary_release_year: filters.year } : {}),
        },
    });

    return response.data.results;
};