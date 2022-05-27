import Movie from "./movie";


export default class MovieAdapter{

    public static fromApi(data:any): Movie{
        const newMovie = new Movie();
        newMovie.deserialize({
            id: data.id,
            title: data.title,
            description: data.overview,
            posterImagePath: data.poster_path,
            backdropImagePath: data.backdrop_path,
            releaseDate: data.release_date,
            genres: data.genres ? data.genres : [],
            voteAverage: data.vote_average,
            homepage: data.homepage ? data.homepage : null,
            companies: data.production_companies ? data.production_companies.map((item:any) => {
                return {
                    id: item.id,
                    name: item.name,
                    logoPath: item.logo_path,
                    country: item.origin_country
                }
            }) : [],
            runtime: data.runtime,
            isAdult: data.adult
        });
        return newMovie;
    }
}