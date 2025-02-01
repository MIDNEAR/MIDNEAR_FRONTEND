import React from 'react'
import { Link } from 'react-router-dom'
import MyPageModal from '../MyPageModal'

const Colligation = () => {
  return (
    <div className="container">
      <div className="field_container">
            <MyPageModal />
            <div className="field_container_content">
                <div className="mypage_title">적립금 및 보유 쿠폰 관리</div> 
                <div className='option_box'>
                    <Link to='/mypage/colligation/point' className='detail_box'>
                        <div className='detail_box-title'>보유 적립금</div>
                        <div className='detail_box-contents'>1,111원</div>
                    </Link>
                    <Link to='/mypage/colligation/cupon' className='detail_box'>
                        <div className='detail_box-title'>쿠폰</div>
                        <div className='detail_box-contents'>3장</div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Colligation