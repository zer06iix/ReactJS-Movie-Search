/* eslint-disable react/prop-types */
export default function PreviousButton({handlePreviousPage}){
    return (
        <div>
            <button 
                className='bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mr-2' 
                onClick={handlePreviousPage}
            >
            Previous
            </button>      
        </div>
    )
}