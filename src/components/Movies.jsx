/* eslint-disable no-unused-vars */
import {useState} from 'react'
import axios from 'axios';
import MovieList from './MovieList';
import SearchButton from './Buttons/SearchButton';
import SearchInput from './SearchInput';
import Pagination from './Buttons/Pagination';

export default function Movies() {

    // -------------VARIABLES-------------
    const apiKey = '8f32fe9c'
    const limit = 9;

    // -------------HOOKS-------------
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [emptyError, setEmptyError] = useState('');
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    // const [limit, setLimit] = useState(9);

    // -------------FUNCTIONS-------------
    // http://www.omdbapi.com/?s=star&apikey=8f32fe9c
    // https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY
    const handleSearch = async (page = pageCount) => {  
        setLoading(true); 
        setError('');
        if (searchTerm.length === 0){
            setLoading(false)
            setEmptyError('Please type a movie name.')
        } else { try {  
            const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=${apiKey}`);  
            if (response.data.Response === "True") {  
                setMovies(response.data.Search);  
                
                //Calculate total pages
                const totalResults = parseInt(response.data.totalResults, 10);
                setTotalPages(Math.floor(totalResults / limit))
            } else {  
                setMovies([]);  
                setError(response.data.Error);  
            }  
        } catch (err) {  
            console.error(err);  
            setError('An error occurred while fetching data: ' + err.message);  
        } finally {  
            setLoading(false);
        }  
    }}

    const handlePageChange = async (newPageCount) => {  
        setPageCount(newPageCount);  
        await handleSearch(newPageCount);  
    }  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">  
            <h1 className="text-2xl font-bold mb-4">0 Up To 6 Movies</h1>  
            <div className="flex mb-4">    
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <SearchButton handleSearch={handleSearch}/>
            </div> 
            <p className='text-red-600'>{emptyError}</p>
            <div className="flex-grow flex items-center justify-center">  
                {error && <p className="text-red-500 text-center">{error}</p>} 
                {loading ? <p>Searching...</p> : <MovieList movies={movies} limit={limit} />}  
            </div>  

            {movies.length > 0 && (  
                <div className="flex justify-center">
                    <Pagination pageCount={pageCount} totalPages={totalPages} handlePageChange={handlePageChange}/>  
                </div>  
            )}  
        </div> 
    )
}