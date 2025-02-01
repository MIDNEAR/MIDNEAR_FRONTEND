import React from 'react'
import check from '../../../assets/img/orderlist/check.svg'

const OrderCancelCheck = () => {
  return (
    <div className='container'>
        <img src={check} className='check_sign'/>
        <div className='check_title'>주문 취소 완료</div>
        <div className='check_content'>주문이 정상적으로 취소되었습니다.</div>

        <Link to="/" className='keep_shopping'>쇼핑 계속하기</Link>
        <Link to="/mypage/orderlist/" className='load_orderlist'>주문내역 다시보기</Link>
    </div>
  )
}

export default OrderCancelCheck