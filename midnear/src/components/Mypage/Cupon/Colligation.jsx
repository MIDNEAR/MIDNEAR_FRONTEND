import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MyPageModal from '../MyPageModal'
import axios from 'axios'

const Colligation = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');
  const [couponNum, setCouponNum] = useState(0);
  const [point, setPoint] = useState(0);
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
  const loadPoint = () => {
    axios.get(`${DOMAIN}/userCouponPoint/points/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setPoint(res.data.data);
      };
    })
    .catch((error) => {
      
    });
  };

    useEffect(() => {
      loadCouponNum();
      loadPoint();
    }, [DOMAIN, token]);

  return (
    <div className="container">
      <div className="field_container">
            <MyPageModal />
            <div className="field_container_content">
                <div className="mypage_title">적립금 및 보유 쿠폰 관리</div> 
                <div className='option_box'>
                    <Link to='/mypage/colligation/point' className='detail_box'>
                        <div className='detail_box-title'>보유 적립금</div>
                        <div className='detail_box-contents'>{point.toLocaleString('ko-KR')}원</div>
                    </Link>
                    <Link to='/mypage/colligation/cupon' className='detail_box'>
                        <div className='detail_box-title'>쿠폰</div>
                        <div className='detail_box-contents'>{couponNum}장</div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Colligation