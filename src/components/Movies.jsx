/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function Movies() {

    // -------------HOOKS-------------
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    // -------------VARIABLES-------------
    const apiKey = '8f32fe9c'

    // -------------FUNCTIONS-------------
    
    const handleSearch = async () => {
        try{
            const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
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

    return (
        <div className="p-4 content-center">  
            <h1 className=" text-2xl font-bold mb-4">Movie List</h1>  
            <input  
                type="text"  
                value={searchTerm}  
                onChange={(e) => setSearchTerm(e.target.value)}  
                className="border p-2 mb-4"  
                placeholder="Search for movies..."  
            />  
            <button onClick={handleSearch} className={`bg-black text-white rounded p-2 ml-2 hover:bg-gray-700`}>Search</button>
            {error && <p className="text-red-500">{error}</p>}  
            <ul>  
                {movies.map((movie) => (  
                    <li key={movie.imdbID} className="mb-2">  
                        <h2 className="font-semibold">{movie.Title} ({movie.Year})</h2>  
                        <img src={movie.Poster} alt={movie.Title} className="w-32" />  
                    </li>  
                ))}  
            </ul>  
        </div> 
    )
}