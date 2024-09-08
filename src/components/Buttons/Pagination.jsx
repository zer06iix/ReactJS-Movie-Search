import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

export default function Pagination({pageCount, totalPages, handlePageChange}){
    const pageNumbers = [];  
    const totalPagesToShow = 5; // Total number of page buttons to show  
    let startPage = Math.max(1, pageCount - Math.floor(totalPagesToShow / 2));  
    const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);  

    // Adjust startPage if there are not enough pages before it  
    if (endPage - startPage < totalPagesToShow - 1) {  
        startPage = Math.max(1, endPage - totalPagesToShow + 1);  
    }  

    // Add "Previous" button  
    if (pageCount > 1) {  
        pageNumbers.push(  
            <PreviousButton handleNextPage={() => handlePageChange(pageCount + 1)} />  
        );  
    }  

    // Add first page button  
    if (startPage > 1) {  
        pageNumbers.push(  
            <button  
                key={1}  
                onClick={() => handlePageChange(1)}  
                className={`mx-1 p-2 rounded ${pageCount === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}  
            >  
                1  
            </button>  
        );  
        if (startPage > 2) {  
            pageNumbers.push(<span key="ellipsis-start">...</span>);  
        }  
    }  

    // Add page number buttons
    for (let i = startPage; i <= endPage; i++) {  
        pageNumbers.push(  
            <button  
                key={i}  
                onClick={() => handlePageChange(i)}  
                className={`mx-1 p-2 rounded ${pageCount === i ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}  
            >  
                {i}  
            </button>  
        );  
    } 

    // Add last page button  
    if (endPage < totalPages) {  
        if (endPage < totalPages - 1) {  
            pageNumbers.push(<span key="ellipsis-end">...</span>);  
        }  
        pageNumbers.push(  
            <button  
                key={totalPages}  
                onClick={() => handlePageChange(totalPages)}  
                className={`mx-1 p-2 rounded ${pageCount === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}  
            >  
                {totalPages}  
            </button>  
        );  
    }  

    // Add "Next" button  
    if (pageCount < totalPages) {  
        pageNumbers.push(  
            <NextButton handleNextPage={() => handlePageChange(pageCount + 1)} />  
        );  
    }  

    return pageNumbers;  
    
}