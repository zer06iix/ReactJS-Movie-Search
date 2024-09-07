/* eslint-disable no-unused-vars */
import {useState} from 'react'
import axios from 'axios';
import MovieList from './MovieList';
import SearchButton from './Buttons/SearchButton';
import PreviousButton from './Buttons/PreviousButton';
import NextButton from './Buttons/NextButton';
import SearchInput from './SearchInput';

export default function Movies() {

    // -------------VARIABLES-------------
    const apiKey = '8f32fe9c'
    const limit = 9;

    // -------------HOOKS-------------
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [pageCount, setPageCount] = useState(1);
    // const [limit, setLimit] = useState(9);

    // -------------FUNCTIONS-------------
    // http://www.omdbapi.com/?s=star&apikey=8f32fe9c
    const handleSearch = async () => {
        try{
            const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&page=${pageCount}&apikey=${apiKey}`);
            if(response.data.Response === "True"){
                setMovies(response.data.Search);
                setError('');
            } else {
                setMovies([]);
                setError(response.data.Error);
            }
        } catch(err){
            setError('An error occurred while fetching data.');
        }
    }

    const handleNextPage = async () => {
        setPageCount(prev => prev + 1);
        await handleSearch();
    }

    const handlePreviousPage = async () => {  
        if (pageCount > 1) { // Ensure pageCount doesn't go below 1  
            const prevPage = pageCount - 1; // Decrement the page count  
            setPageCount(prevPage); // Update the page count state  
            await handleSearch(); // Fetch movies for the updated page  
        }  
    }  


    return (
        <div className="flex flex-col items-center p-4 content-center">  
            <h1 className="text-2xl font-bold mb-4">Movie List</h1>  
            <div className="flex mb-4">    
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <SearchButton handleSearch={handleSearch}/>
            </div>  

            {error && <p className="text-red-500 text-center">{error}</p>} 

            <MovieList movies={movies} limit={limit}/>

            {movies.length > 0 && (  
                <div className="flex justify-center">
                    <PreviousButton handlePreviousPage={handlePreviousPage} pageCount={pageCount}/>
                    <NextButton handleNextPage={handleNextPage}/>
                </div>  
            )}  
        </div> 
    )
}