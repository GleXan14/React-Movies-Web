import axios from "axios";
import { TMDBApiKey, TMDBApiHost } from "../environments/api";
import Movie, { IMoviesData } from "../models/movie";
import MovieAdapter from "../models/movie.adapter";


export default class MovieManager{

    public static async getTrendingMovies(): Promise<Movie[]>{
        const url = `${TMDBApiHost}/trending/movie/day`;
        const params = {
            api_key: TMDBApiKey,
            // language: 'en-US',
            include_adult: true
        }
        const result = await axios.get(url, {params});
    
        return result.data.results.map((movie:any) => MovieAdapter.fromApi(movie));
    }

    public static async getTopRatedMovies(): Promise<Movie[]>{
        const url = `${TMDBApiHost}/movie/top_rated`;
        const params = {
            api_key: TMDBApiKey,
            // language: 'en-US',
            include_adult: true
        }
        const result = await axios.get(url, {params});
        
        return result.data.results.map((movie:any) => MovieAdapter.fromApi(movie));
    }

    public static async getUpcomingMovies(): Promise<Movie[]>{
        const url = `${TMDBApiHost}/movie/upcoming`;
        const params = {
            api_key: TMDBApiKey,
            // language: 'en-US',
            include_adult: true
        }
        const result = await axios.get(url, {params});
        
        return result.data.results.map((movie:any) => MovieAdapter.fromApi(movie));
    }

    public static async getNowPlayingMovies(): Promise<Movie[]>{
        const url = `${TMDBApiHost}/movie/now_playing`;
        const params = {
            api_key: TMDBApiKey,
            // language: 'en-US',
            include_adult: true
        }
        const result = await axios.get(url, {params});
        
        return result.data.results.map((movie:any) => MovieAdapter.fromApi(movie));
    }

    public static async getMovie(id:number): Promise<Movie>{
        const url = `${TMDBApiHost}/movie/${id}`;
        const params = {
            api_key: TMDBApiKey
        }
        const result = await axios.get(url, {params});
        
        return MovieAdapter.fromApi(result.data);
    }

    public static async getPopularMovies(page:number = 1): Promise<IMoviesData>{
        const url = `${TMDBApiHost}/movie/popular`;
        const params = {
            api_key: TMDBApiKey,
            // language: 'en-US',
            page,
            include_adult: true
        }

        const result = await axios.get(url, {params});
        const data:IMoviesData = {
            page: result.data.page,
            movies: result.data.results.map((movie:any) => MovieAdapter.fromApi(movie)),
            totalPages: result.data.total_pages
        }
        
        return data;
    }

    public static async searchMovies(query:string, page:number = 1): Promise<IMoviesData>{
        const url = `${TMDBApiHost}/search/movie`;
        const params = {
            api_key: TMDBApiKey,
            // language: 'en-US',
            page,
            query,
            include_adult: true
        };

        const result = await axios.get(url, {params});
        const data:IMoviesData = {
            page: result.data.page,
            movies: result.data.results.map((movie:any) => MovieAdapter.fromApi(movie)),
            totalPages: result.data.total_pages
        };
        
        return data;
    }

}