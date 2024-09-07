/* eslint-disable react/prop-types */
export default function NextButton({handleNextPage}){
    return (
        <button 
            className='bg-blue-500 hover:bg-blue-400 text-white p-2 rounded' 
            onClick={handleNextPage}
        >
        Next
        </button>  
    )
}