import React from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom'; 


const ProdList = ({productList, pageInfo, currPage, setCurrPage}) => {
  const today = new Date();

  const checkIsSale = (start, end) => {
    if (start === null || end === null) {
      return false;
    } else {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (startDate <= today && endDate >= today) {
        return true;
      } else {
        return false;
      }
    }
  }
  const checkIsSoldOut = (saleStatus) => {
    if(saleStatus === "품절"){ 
      return true;
    } else {
      return false;
    }
  }

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
                  <p className={`origin-price ${checkIsSoldOut(it.saleStatus) || checkIsSale(it.discountStartDate, it.discountEndDate) ? 'display' : ''}`}>&#xffe6; {it.price.toLocaleString('ko-KR')}</p>
                   <p className={`sold-out ${checkIsSoldOut(it.saleStatus) ? 'display' : ''}`}>SOLD OUT</p>
                  <div className={`discount ${checkIsSale(it.discountStartDate, it.discountEndDate) ? 'display' : ''}`}>
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