/* eslint-disable react/prop-types */
export default function SearchButton({handleSearch}){
    return(
        <div>
            <button 
                onClick={handleSearch} 
                className={`bg-black text-white rounded p-2 ml-2 hover:bg-gray-700`}
            >
            Search
            </button>
        </div>
    )
}