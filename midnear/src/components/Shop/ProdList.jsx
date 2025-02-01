import React, {useState} from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom'; 


const ProdList = ({productList}) => {
  const [limit, setLimit] = useState(10); // 한 페이지 당 보여줄 게시물 개수, 추후에 수정
  const [page, setPage] = useState(1); // 현재 페이지 위치
  const offset = (page -1) * limit; // 현재 페이지의 첫 번째 게시물 오프셋


  return (   
    <div className='bottom-el'> 
      <div className='prodList'>
        {productList.slice(offset, offset + limit).map((it, index)=>(
            <div className='product' key={index}>
              <Link to="/products/detail">
                <div className='prodImg'>
                  <img src={it.frontImg} className='frontImg'></img>
                  <img src={it.backImg} className='backImg'></img>
                </div>
                <div className='prodInfo'>
                  <p className='name'>{it.name}</p>
                  <p className='origin-price'>&#xffe6; {it.price.toLocaleString('ko-KR')}</p>
                  {/** 기본 display none상태임 할인기간, 품절 상태일 때 맞춰 flex하기 + 원가 밑줄 추가*/}
                   <p className='sold-out'>{it.soldout}</p>
                  <div className='discount'>
                    <p className='dc-price'>&#xffe6; {it.dcPrice.toLocaleString('ko-KR')}</p>
                    <p className='coupon'>{it.coupon}</p>
                  </div>
                </div>
                </Link>
            </div>
        ))}
        
    </div>
    <Pagination total={productList.length} limit={limit} page={page} setPage={setPage} />
    </div>
  )
}

export default ProdList