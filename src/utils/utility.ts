

export default class Utility{

    public static TMDB_NOTICE = "This product uses the TMDB API but is not endorsed or certified by TMDB.";
    public static SITE_NAME = "ReactMovies";
    public static NAVBAR_HOME = "Home";
    public static NAVBAR_MOVIES = "Movies";
    public static BACK_BUTTON = "Back";
    public static TOP_RATED_TITLE = "Top rated";
    public static TRENDING_TITLE = "Trending";
    public static UPCOMING_TITLE = "Upcoming";
    public static NOW_PLAYING_TITLE = "Now playing";
    public static SEARCH_PLACEHOLDER = "Search for a movie, tv show, actor...";
    public static SEARCH = "Search";
    public static EMPTY_MOVIES_TITLE = "No movies";
    public static EMPTY_MOVIES_SUBTITLE = "There's no result for your search";
    public static MOVIE_USER_SCORE = "User score";
    public static MOVIE_OVERVIEW = "Overview";
    public static MOVIE_COMPANIES = "Companies";
    public static MOVIE_HOMEPAGE = "Homepage";


    static WindowToTop(){
        window.scrollTo({top:0, behavior: "smooth"});
    }
    
}