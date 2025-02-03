import React from 'react'
import MyPageModal from '../MyPageModal'
import defaultimage from '../../../assets/img/orderlist/default.svg'
import { Link } from 'react-router-dom';

const OrderDetail = () => {
  return (
    <div className='container'>
        <div className='field_container'>
            <MyPageModal />
            <div className='field_container_content'>
                    <div className='mypage_title'>주문 상세</div>

                    <div className='order_num'>
                        <div className='order_title'>2024.12.25 주문</div>
                        <div className='order_title'>주문번호 1111010101010101001</div>
                    </div>
                    

                    <div className='ordered_box'>
                            <div className='box_left'>
                                <div className='order_state'>
                                    <span className='state'>배송완료</span>
                                    <div className='dot' />
                                    <span className='date'>2024.12.25 주문</span>
                                </div>
                                <div className='order_info'>
                                    <img src={defaultimage} />
                                    <div className='goods_info'>
                                        <p>숨이 자꾸 멎는다 네가 날 향해 걸어온다 나를 보며 웃는다 너도 내게 끌리는지</p>
                                        <div className='price'>
                                            <span>₩ 99,999</span>
                                            <div className='dot' />
                                            <span>1개</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='line' />

                            <div className='box_right_detail'>
                                <div className='box'>
                                    <button className='order_option'>배송조회</button>
                                    <Link to="/mypage/orderlist/option" className='order_option'>교환, 반품 신청</Link>
                                    <Link to="/mypage/orderlist/writingReview" className='order_option'>리뷰 작성하기</Link>
                                </div>
                            </div>
                    </div>

                <div className='detail'>
                <h2 className="mypage_middle_text">수취인 정보</h2>
                    <div className="order_info-top">
                        <div className="order_info__item">
                            <span className="order_info__label">받는 사람</span>
                            <span className="order_info__value">홍길동</span>
                        </div>
                        <div className="order_info__item">
                            <span className="order_info__label">연락처</span>
                            <span className="order_info__value">010-9999-9999</span>
                        </div>
                        <div className="order_info__item">
                            <span className="order_info__label">받는 주소</span>
                            <span className="order_info__value">주소주소주소____</span>
                        </div>
                        <div className="order_info__item">
                            <span className="order_info__label">배송요청사항</span>
                            <span className="order_info__value">부재시 문 앞</span>
                        </div>
                    </div>

                    <div className="payment-info">
                        <h2 className="mypage_middle_text">결제 정보</h2>
                        <div className="payment-info__details">
                            <div className='payment-detail'>
                                <div className="payment-info__item_left">
                                    <span className="payment-info__label">결제수단</span>
                                    <span className="payment-info__label">00카드 / 일시불</span>
                                </div>
                                <div className="payment-info__item_right">
                                    <div className="payment-info__item_right-detail" >
                                        <div className="payment-info__item">
                                            <span className="payment-info__label">총 상품가격</span>
                                            <span className="payment-info__value">99,999 원</span>
                                        </div>
                                        <div className="payment-info__item">
                                            <span className="payment-info__label">배송비</span>
                                            <span className="payment-info__label">0 원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <div className='order_section_line' />

                            <div className='payment-detail'>

                                <div className="payment-info__item_left"></div>
                            
                                <div className="payment-info__item_right">
                                    <div className="payment-info__item">
                                        <span className="payment-info__label">00카드 / 일시불</span>
                                        <span className="payment-info__value">99,999 원</span>
                                    </div>
                                    <div className="payment-info__item">
                                        <span className="payment-info__label">총 결제금액</span>
                                        <span className="payment-info__value-highlight">99,999 원</span>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        
                        <div className='pament-bill'>
                            <h2 className="mypage_middle_text">결제영수증 정보</h2>
                            <div className="payment-info__receipt">
                                <p className="payment-info__description">해당 주문건에 대해 구매 카드영수증 확인이 가능합니다.</p>
                                <button className="payment-info__button">카드영수증</button>          
                            </div>
                        </div>
                    </div>


                
                    <div className='button_area'>
                        <Link to='/mypage/orderlist/' className="payment-info__button--delete">&lt; 주문목록 돌아가기</Link>
                        <button className="payment-info__button--back">주문내역 삭제</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderDetail