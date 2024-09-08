/* eslint-disable react/prop-types */
export default function SearchButton({handleSearch}){
    return(
        <div>
            <button 
                onClick={handleSearch} 
                className={`bg-green-600 text-white rounded p-2 ml-2 hover:bg-green-500`}
            >
            Search
            </button>
        </div>
    )
}