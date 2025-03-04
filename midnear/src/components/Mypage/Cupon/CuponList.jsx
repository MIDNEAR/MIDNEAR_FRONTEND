import React, { useState,  useEffect } from 'react'
import MyPageModal from '../MyPageModal'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CuponList = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');
  const [couponList, setCouponList] = useState([]);
  const [couponNum, setCouponNum] = useState(0);

  const loadCouponList = () => {
    axios.get(`${DOMAIN}/userCouponPoint/coupons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setCouponList(res.data.data);
        
      };
    })
    .catch((error) => {
      
    });
  };
  const loadCouponNum = () => {
    axios.get(`${DOMAIN}/userCouponPoint/coupons/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setCouponNum(res.data.data);
      };
    })
    .catch((error) => {
      
    });
  };

  useEffect(() => {
    loadCouponList();
    loadCouponNum();
  }, [DOMAIN, token]);

  return (
    <div className="container">
      <div className="field_container">
        <MyPageModal />
            <div className="field_container_content">
                <Link to='/mypage/colligation' className="mypage_title">&lt; 쿠폰</Link>
                <div className='current_cupon_list'>현재 보유 쿠폰</div>
                <div className='current_quantity'>{couponNum}장</div>

                {couponList && couponList.length > 0 ? (
                  <>
                  { couponList.map((item)=>(
                    <div className='coupon_box-holding' key={item.userCouponId}>
                      <div className='coupon_box-holding-title'>{item.discountRate}%</div>
                      <div className='coupon_box-holding-mid-title'>{item.couponName}</div>
                      <div className='coupon_box-holding-date'>
                          <div className='d-day_expiration'>만료 7일 전</div>
                          <div className='limit_amount'>최대 5천원 할인</div>
                      </div>
                  </div>
                  ))}
                </>
                ): (
                  <div>보유하신 쿠폰이 없습니다.</div>
                )}
                

            </div>
        </div>
    </div>
  )
}

export default CuponList