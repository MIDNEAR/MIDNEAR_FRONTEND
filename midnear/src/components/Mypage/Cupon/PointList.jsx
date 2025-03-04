import React, { useEffect, useState } from 'react'
import MyPageModal from '../MyPageModal'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PointList = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');
  const [point, setPoint] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);

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

  const loadPointHistory = () => {
    axios.get(`${DOMAIN}/userCouponPoint/points`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setPointHistory(res.data.data);
      };
    })
    .catch((error) => {
    });
  };
  useEffect(() => {
    loadPointHistory();
    loadPoint();
  }, [DOMAIN, token]);

  return (
    <div className="container">
      <div className="field_container">
            <MyPageModal />
            <div className="field_container_content">
                <Link to='/mypage/colligation' className="mypage_title">&lt; 적립금 조회</Link>
                <div className='current_cupon_list'>현재 보유 적립금</div>
                <div className='current_quantity'>{point.toLocaleString('ko-KR')}원</div>

                {pointHistory.map((item, index)=>(
                  <div className='point_list-holding' key={index}>
                    <div className='information'>
                        <div className='point_list-holding-title'>주문 적립</div>
                          <div className='point_list-holding-content'>{item.reason} {item.grantDate} 적립완료</div>
                    </div>
                    <div className='amount'>-{item.amount.toLocaleString('ko-KR')}원</div>
                    
                </div>
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default PointList