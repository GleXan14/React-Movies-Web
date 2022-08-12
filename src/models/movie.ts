import { TMDBImagesBaseUrl } from "../environments/api";

export interface IMovie{
    id:number;
    title:string;
    description:string;
    image?:string;
    posterImagePath?: string | null,
    backdropImagePath?: string | null,
    releaseDate?: string,
    genres?: {id:number, name:string}[],
    voteAverage?: number,
    homepage?:string | null,
    companies?: {
        id: number;
        name: string;
        logoPath: string | null;
        country: string;
    }[];
    runtime?:number | null;
    isAdult?:boolean;
}

export interface IMovieState{
    movies: Movie[],
    movieRequested: Movie | null,
    length: number
}

export interface IMoviesData{
    page: number,
    movies: Movie[],
    totalPages: number
}

export default class Movie implements IMovie{
    public id:number = null!;
    public title:string = '';
    public description:string = '';
    public posterImagePath?: string | null = null;
    public backdropImagePath?: string | null = null;
    public releaseDate?: string = '';
    public genres?: {id:number, name:string}[] = [];
    public voteAverage?: number = null!;
    public homepage?: string | null = null;
    public companies?: {
        id: number;
        name: string;
        logoPath: string | null;
        country: string;
    }[] = [];
    public runtime:number | null = null;
    public isAdult:boolean = false;

    deserialize(data:any):this{
        Object.assign(this, data);
        return this;
    }


    getImage(type?:'backdrop' | 'poster'){
        switch(type){
            case 'backdrop':
                return this.backdropImagePath ? `${TMDBImagesBaseUrl}${this.backdropImagePath}` : '';

            case undefined:
            case 'poster':
                return this.posterImagePath ? `${TMDBImagesBaseUrl}${this.posterImagePath}` : '';
        }
    }

    getCompaniesName(){
        return this.companies?.map(item => item.name).join(', ');
    }

    getGenres(){
        return this.genres?.map(item => item.name).join(', ');
    }

    getRuntimeFormatted(){
        if(!this.runtime){
            return 'N/A';
        }

        const hr = 60;
        //const runtime = this.runtime;
        const resultHours = Math.floor(this.runtime/hr);
        const resultMinutes = (this.runtime % hr);

        return `${resultHours}h ${resultMinutes}m`;
    }

    getYear(){
        const date = new Date(this.releaseDate!);
        return date.getFullYear();
    }

    getVote(){
        return parseInt(`${this.voteAverage! * 10}`);
    }
}