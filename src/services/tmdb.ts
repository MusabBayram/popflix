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

export const getMovieTrailer = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });

    const trailers = response.data.results.filter(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailers.length > 0 ? trailers[0].key : null;
};

export const discoverMovies = async (filters: {
    genres?: string[];
    topRated?: boolean;
    year?: string;
    minRating?: number;
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
            ...(typeof filters.minRating === 'number' && filters.minRating > 0 ? { "vote_average.gte": filters.minRating } : {}),
        },
    });

    return response.data.results;
};

export const getMovieCredits = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });
    return response.data;
};

export const getPersonDetails = async (personId: string) => {
    const response = await axios.get(`${BASE_URL}/person/${personId}`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });
    return response.data;
};

export const getPersonCredits = async (personId: string) => {
    const response = await axios.get(`${BASE_URL}/person/${personId}/movie_credits`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });
    return response.data.cast;
};

export const getPersonExternalIds = async (personId: string) => {
    const response = await axios.get(`${BASE_URL}/person/${personId}/external_ids`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });
    return response.data;
};

export const searchPeople = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/search/person`, {
        params: {
            api_key: API_KEY,
            query,
            language: "en-US",
            page: 1,
        },
    });

    return response.data.results;
};
export const getPopularTVShows = async () => {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};

export const getUpcomingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};

export const getMovieReviews = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};

export const getTVDetails = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });
    return response.data;
};

export const getTVTrailer = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });

    const trailers = response.data.results.filter(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailers.length > 0 ? trailers[0].key : null;
};

export const getSimilarTVShows = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/similar`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};

export const getTVCredits = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/credits`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
        },
    });
    return response.data;
};

export const getTVReviews = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/reviews`, {
        params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
        },
    });
    return response.data.results;
};