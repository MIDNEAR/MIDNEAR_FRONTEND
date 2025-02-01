import React from 'react'
import MyPageModal from '../MyPageModal'
import { Link } from 'react-router-dom'

const CuponList = () => {
  return (
    <div className="container">
      <div className="field_container">
        <MyPageModal />
            <div className="field_container_content">
                <Link to='/mypage/colligation' className="mypage_title">&lt; 쿠폰</Link>
                <div className='current_cupon_list'>현재 보유 쿠폰</div>
                <div className='current_quantity'>3장</div>

                <div className='coupon_box-holding'>
                    <div className='coupon_box-holding-title'>5%</div>
                    <div className='coupon_box-holding-mid-title'>주말 감사 깜짝 이벤트 쿠폰!</div>
                    <div className='coupon_box-holding-date'>
                        <div className='d-day_expiration'>만료 7일 전</div>
                        <div className='limit_amount'>최대 5천원 할인</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CuponList