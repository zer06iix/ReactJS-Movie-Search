/* eslint-disable react/prop-types */
export default function MovieList({movies, limit}){
    return (
        <div className="flex flex-wrap justify-center mb-4">  
            {movies.slice(0, limit).map((movie) => (  
                <div key={movie.imdbID} className="m-2 w-32 flex flex-col items-center"> 
                <a 
                href={`https://www.imdb.com/title/${movie.imdbID}/`}
                target="_blank"  
                rel="noopener noreferrer"  
                className="text-black hover:underline hover:text-blue-600" 
                >
                    <img src={movie.Poster} alt={movie.Title} className="w-full" />  
                    <h2 className="font-semibold text-center">{movie.Title} ({movie.Year})</h2>  
                </a> 
                </div>  
            ))}
        </div>   
    )
}