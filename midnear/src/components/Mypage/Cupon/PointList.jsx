import React from 'react'
import MyPageModal from '../MyPageModal'
import { Link } from 'react-router-dom'

const PointList = () => {
  return (
    <div className="container">
      <div className="field_container">
            <MyPageModal />
            <div className="field_container_content">
                <Link to='/mypage/colligation' className="mypage_title">&lt; 적립금 조회</Link>
                    <div className='current_cupon_list'>현재 보유 적립금</div>
                    <div className='current_quantity'>1,111원</div>

                <div className='point_list-holding'>
                    <div className='information'>
                        <div className='point_list-holding-title'>주문 적립</div>
                        <div className='point_list-holding-content'>ORIGINAL MAXI FLATFORM BOOTS MINI(3.5inch) - 3 colors _ black 2024.11.29 적립완료</div>
                    </div>
                    <div className='amount'>-1000원</div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default PointList