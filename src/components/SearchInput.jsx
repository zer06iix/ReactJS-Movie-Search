/* eslint-disable react/prop-types */
export default function SearchInput({searchTerm, setSearchTerm}){
    return (
        <input  
            type="text"  
            value={searchTerm}  
            onChange={(e) => setSearchTerm(e.target.value)}  
            className="border p-2 w-full max-w-md rounded focus:outline-none"  
            placeholder="Search for movies..."  
        />  
    )
}