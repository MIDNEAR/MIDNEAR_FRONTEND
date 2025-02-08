import React, {useState} from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom'; 


const ProdList = ({productList, pageInfo, isSale, isSoldOut,  currPage, setCurrPage}) => {
  
  return (   
    <div className='bottom-el'> 
      <div className='prodList'>
        {productList.map((it, index)=>(
            <div className='product' key={index}>
              <Link to={`/products/detail?colorId=${it.colorId}`} >
                <div className='prodImg'>
                  <img src={it.frontImageUrl} className='frontImg' alt='frontImg'/>
                  <img src={it.backImageUrl} className='backImg' alt='backImg'/>
                </div>
                <div className='prodInfo'>
                  <p className='name'>{it.productName}</p>
                  <p className={`origin-price ${isSale ? 'display' : ''}`}>&#xffe6; {it.price.toLocaleString('ko-KR')}</p>
                   <p className={`sold-out ${isSoldOut ? 'display' : ''}`}></p>
                  <div className={`discount ${isSale ? 'display' : ''}`}>
                    <p className='dc-price'>&#xffe6; {it.discountPrice.toLocaleString('ko-KR')}</p>
                    <p className='coupon'>{it.discountRate}% 할인가</p>
                  </div>
                </div>
                </Link>
            </div>
        ))}
        
    </div>
    <Pagination total={pageInfo.total} limit={pageInfo.page} page={currPage} setPage={setCurrPage} />
    </div>
  )
}

export default ProdList