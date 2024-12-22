import React, {useState} from 'react'
import Pagination from './Pagination';

const ProdList = ({productList}) => {
  const [limit, setLimit] = useState(4); // 한 페이지 당 보여줄 게시물 개수, 추후에 수정
  const [page, setPage] = useState(1); // 현재 페이지 위치
  const offset = (page -1) * limit; // 현재 페이지의 첫 번째 게시물 오프셋


  return (   
    <div className='bottom-el'> 
      <div className='prodList'>
        {productList.slice(offset, offset + limit).map((it)=>(
            <div className='product'>
                <img src={it.image}></img>
                <p className='name'>{it.name}</p>
                <p>{it.price}</p>
            </div>
        ))}
        
    </div>
    <Pagination total={productList.length} limit={limit} page={page} setPage={setPage} />
    </div>
  )
}

export default ProdList