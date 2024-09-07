/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import axios from 'axios';

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
        setPageCount(prev => prev - 1);
        await handleSearch();
    }

    return (
        <div className="flex flex-col items-center p-4 content-center">  
            <h1 className="text-2xl font-bold mb-4">Movie List</h1>  
            <div className="flex mb-4">  
                <input  
                    type="text"  
                    value={searchTerm}  
                    onChange={(e) => setSearchTerm(e.target.value)}  
                    className="border p-2 w-full max-w-md focus:outline-none"  
                    placeholder="Search for movies..."  
                />  

                <button 
                    onClick={handleSearch} 
                    className={`bg-black text-white rounded p-2 ml-2 hover:bg-gray-700`}
                >
                Search
                </button>  
            </div>  

            {error && <p className="text-red-500 text-center">{error}</p>}  
            <div className="flex flex-wrap justify-center mb-4">  
                {movies.slice(0, limit).map((movie) => (  
                    <div key={movie.imdbID} className="m-2 w-32 flex flex-col items-center">  
                        <img src={movie.Poster} alt={movie.Title} className="w-full" />  
                        <h2 className="font-semibold text-center">{movie.Title} ({movie.Year})</h2>  
                    </div>  
                ))}  
            </div>   
            {movies.length > 0 && (  
                <div className="flex justify-center">
                    {pageCount === 1 
                    ?
                        <button 
                            className='bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mr-2 hidden' 
                            onClick={handlePreviousPage}
                        >
                        Previous
                        </button> 
                    :
                        <button 
                            className='bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mr-2' 
                            onClick={handlePreviousPage}
                        >
                        Previous
                        </button>      
                    }
                    <button 
                        className='bg-blue-500 hover:bg-blue-400 text-white p-2 rounded' 
                        onClick={handleNextPage}
                    >
                    Next
                    </button>  
                </div>  
            )}  
        </div> 
    )
}