import React, { useState } from 'react'
import next from '../../assets/img/product/next.svg'
import prev from '../../assets/img/product/prev.svg'
import prevRange from '../../assets/img/product/prevRange.svg'
import nextRange from '../../assets/img/product/nextRange.svg'


const Pagination = ({total, limit, page, setPage}) => {
  const pageNum = Math.ceil(total/limit) || 1;
  const [currentRange, setCurrentRange] = useState(1); 
  const rangeLimit = 6; 
  
  const startPage = (currentRange - 1) * rangeLimit + 1;
  const endPage = Math.min(startPage + rangeLimit - 1, pageNum);
  const pagesInRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  
  const goToNextRange = () => {
    if (currentRange * rangeLimit < pageNum) {
      setCurrentRange(currentRange + 1);
      setPage((currentRange * rangeLimit) + 1);
    }
  };

  const goToPrevRange = () => {
    if (currentRange > 1) {
      setCurrentRange(currentRange - 1);
      setPage(((currentRange - 2) * rangeLimit) + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page === startPage && page > 1) {
      goToPrevRange(); 
    } else {
      setPage(page - 1); 
    }
  };

  const handleNextPage = () => {
    if (page === endPage && page < pageNum) {
      goToNextRange();
    } else {
      setPage(page + 1); 
    }
  };
  
  return (
    <div className='pagination'>
      
      <button
        onClick={goToPrevRange}
        disabled={currentRange === 1}
        className="prev"
      >
        <img src={prevRange} alt="Previous Range" />
      </button>

      <button onClick={handlePrevPage} disabled={page === 1} className='prev'>
        <img src={prev} />
      </button>
      
      {pagesInRange.map((pageNumber) => (
        <div
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          aria-current={page === pageNumber ? "page" : undefined}
          className="pageNum"
        >
          <div>{pageNumber}</div>
        </div>
      ))}
      
      <button onClick={handleNextPage} disabled={page === pageNum} className='next'>          
        < img src={next}/>
      </button>
      
      <button
        onClick={goToNextRange}
        disabled={currentRange * rangeLimit >= pageNum}
        className="next"
      >
        <img src={nextRange} alt="Next Range" />
      </button>
    </div>
  )
}

export default Pagination