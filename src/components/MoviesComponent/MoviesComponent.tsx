import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import './styles.scss';
import Movie from "../../models/movie";
import MovieComponent from "../MovieComponent/MovieComponent";
import MovieManager from "../../managers/movie.manager";
import CustomAlert from "../AlertComponent/AlertComponent";
import ScrollTopButton from "../ScrollTopButton/ScrollTopButton";
import Utility from "../../utils/utility";
import CustomIf from "../IfComponent/IfComponent";

import { TextField, Tooltip, IconButton } from "@mui/material";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

type Filters = {
    search:string,
    page:number,
} | null;

export default function Movies(){

    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [filters, setFilters] = useState<Filters>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1000);
    const [pageButtons, setPageButtons] = useState<(number|string)[]>([]);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setParamsData();

        return () => {
            setMovies([]);
            setSearchText('');
            setFilters(null);
            setCurrentPage(0);
            setTotalPage(1000);
            setPageButtons([]);
            setIsFiltered(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(currentPage > 0){
            Utility.WindowToTop();
            getMovies();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    useEffect(() => {
        setParamsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    useEffect(() => {
        getPagesButtons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);


    // GENERAL LOAD DATA
    const setParamsData = () => {
        const searchParam = searchParams.get("search");
        const pageParam = searchParams.get("page");
        const filterData = {
            search: '',
            page: 1
        }
        
        if(searchParam){
            setSearchText(searchParam);
            filterData.search = searchParam;
            setIsFiltered(true);
        }
        
        if(pageParam){
            setCurrentPage(parseInt(pageParam as string));
            filterData.page = parseInt(pageParam as string);
        }else{
            setCurrentPage(1);
        }
        
        setFilters(filterData);
    }

    const getMovies = async (): Promise<void> => {
        let result = null;
        if(searchText.trim().length > 0){
            result = await MovieManager.searchMovies(searchText, currentPage);
        }else{
            result = await MovieManager.getPopularMovies(currentPage);
        }
        //console.log(result);
        setMovies(result.movies);
        setTotalPage(result.totalPages);
        
    }

    //SEARCH BY QUERY FUNCTIONS
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

    const handleSearch = () => {
        filterMovies(searchText);
    };

    const handleClearFilter = (event?: React.MouseEvent) => {
        setSearchText('');
        filterMovies('');
    }

    const filterMovies = (textFilter:string) => {
        
        if(textFilter.trim().length > 0){
            setSearchParams(new URLSearchParams([['search',`${textFilter}`],['page',`${1}`]]));
            setIsFiltered(true);
        }else{
            setSearchParams(new URLSearchParams([['page',`${1}`]]));
            setIsFiltered(false);
        }
    }

    //PAGINATION FUNCTIONS
    const handlePageArrowChange = (type: 'before' | 'next') => {
        switch(type){
            case 'before':
                changePage(currentPage - 1);
                break;

            case 'next':
                changePage(currentPage + 1);
                break;
        }
        
    }

    const handlePageButtonClick = (value:number) => {
        changePage(value);
    }

    const changePage = (value:number) => {
        
        if(searchParams.has('search')){
            setSearchParams([['search', `${searchParams.get('search')}`],['page',`${value}`]]);
        }else{
            setSearchParams([['page',`${value}`]]);
        }
    
    }

    const getPagesButtons = () => {
        const pagesValue:(number | string)[] = [];

        if(totalPage <= 9){
            for(let x = 1; x <= totalPage; x++){
                pagesValue.push(x);
            }
        }else if(totalPage > 9){
            let count = 1;
            if(currentPage > 5){
                count = currentPage;
                pagesValue.push(1, 2, '...');
            }
            for(let x = count; x <= totalPage; x++){
                pagesValue.push(x);
                if(x === count+7){
                    break;
                }
            }
        }
        setPageButtons(pagesValue);
        //console.log('page buttons', pagesValue);
    }

    const getPaginationComponent = (): JSX.Element => {
        return (
            <Col md={12}>
                <div className="d-flex justify-content-center align-items-center flex-row">
                    <IconButton onClick={() => handlePageArrowChange('before')}
                    disabled={currentPage === 1}>
                        <NavigateBeforeIcon />
                    </IconButton>

                    {pageButtons.map((value, index) => 
                        <div key={index} className="custom-page-button"
                        style={{
                            'cursor': typeof value === 'number' ? 'pointer' : 'default',
                            'border': currentPage === value ? '1px solid black' : 'none'
                        }}
                        onClick={typeof value === 'number' ? () => handlePageButtonClick(value) : ()=>null}
                        >
                            <p className="my-0">{value}</p>
                        </div>
                    )}

                    <IconButton onClick={() => handlePageArrowChange('next')}
                    disabled={currentPage === totalPage}>
                        <NavigateNextIcon />
                    </IconButton>
                </div>
            </Col>
        )
    }

    return (
        <Container fluid className="px-4">
            <Row className="my-3">
                <Col md={12} 
                className="d-flex justify-content-center align-items-center flex-row">
                    <TextField id="outlined-basic" 
                    label={Utility.SEARCH_PLACEHOLDER} 
                    variant="outlined"
                    style={{'width': '100vw'}}
                    value={searchText}
                    onKeyUp={handleKeyUp}
                    onChange={handleSearchChange} />

                    <CustomIf condition={isFiltered}>
                        <Tooltip title="Clear filter">
                            <IconButton
                                size="large"
                                sx={{ color: 'red' }}
                                aria-label={`clear filter`}
                                onClick={handleClearFilter}
                            >
                                <ClearAllIcon />
                            </IconButton>
                        </Tooltip>
                    </CustomIf>
                </Col>
                <Col md={12} >
                    <Row 
                    className="d-flex justify-content-start align-items-center flex-row">

                        <div className="my-3">
                            {getPaginationComponent()}
                        </div>

                        {movies.map((item) => (
                            <Col key={item.id} xs className="d-flex justify-content-center">
                                <MovieComponent movie={item} />
                            </Col>
                        ))}

                        {getPaginationComponent()}

                        {movies.length === 0 ? 
                            <CustomAlert 
                            title={Utility.EMPTY_MOVIES_TITLE}
                            subtitle={Utility.EMPTY_MOVIES_SUBTITLE} />
                            : null
                        }
                    </Row>
                </Col>
            </Row>

            <ScrollTopButton />
        </Container>    
    )
}