import React, {useEffect, useState} from 'react'
import MyPageModal from '../MyPageModal'
import defaultimage from '../../../assets/img/orderlist/default.svg'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const token = localStorage.getItem('jwtToken');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderProdList, setOrderProdList] = useState([]);
    const [payInfo, setPayInfo] = useState({});

    const loadOrderDetail = () => {
        axios
        .get(`${DOMAIN}/orders/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {orderId: orderId},
        })
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            setOrderDetail(res.data.data);
            setOrderProdList(res.data.data.userOrderProductCheckDtos);
          }
        })
        .catch((error) => {
        });
    }
    const loadPayInfo = () => {
        axios
        .get(`${DOMAIN}/orders/getPaymentInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {orderId: orderId},
        })
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            setPayInfo(res.data.data);
          }
        })
        .catch((error) => {
        });
    }
        

    useEffect(() => {
        loadOrderDetail();
        loadPayInfo();
    }, [DOMAIN, token, orderId]);
    
    const formatDate = (date) => {
        return date ? date.split("T")[0].replace(/-/g, ". ") : '';
    };
    const formatPhone = (phone) =>{
        return phone ? `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}` : '';
    }

  return (
    <div className='container'>
        <div className='field_container'>
            <MyPageModal />
            <div className='field_container_content'>
                    <div className='mypage_title'>주문 상세</div>

                    <div className='order_num'>
                        <div className='order_title'>{formatDate(orderDetail.orderDate)} 주문</div>
                        <div className='order_title'>주문번호 {orderDetail.orderNumber}</div>
                    </div>
                    
                    {/** 상품 리스트  */}
                    <div className='ordered_box'>
                    {orderProdList.map((item)=>
                        <div className='anOrder' key={item.orderProductId}>
                            <div className='box_left'>
                                <div className='order_state'>
                                    <span className='state'>{item.orderStatus || '상품준비중'}</span>
                                    <div className='dot' />
                                    <span className='date'>{formatDate(orderDetail.orderDate)} 주문</span>
                                </div>
                                <div className='order_info'>
                                    <img src={item.productMainImage} />
                                    <div className='goods_info'>
                                        <p>{item.productName}</p>
                                        <div className='price'>
                                            <span>₩ {item.payPrice.toLocaleString('ko-KR')}</span>
                                            <div className='dot' />
                                            <span>{item.quantity}개</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='line' />

                            <div className='box_right_detail'>
                                <div className='box'>
                                    <button className='order_option'>배송조회</button>
                                    <Link to="/mypage/orderlist/option" className='order_option'>교환, 반품 신청</Link>
                                    <Link to={`/mypage/orderlist/writingReview?orderProductId=${item.orderProductId}`} state={{item: item, date:formatDate(orderDetail.orderDate)}} className='order_option'>리뷰 작성하기</Link>
                                </div>
                            </div>
                    </div>
                    )}
                </div>


                <div className='detail'>
                <h2 className="mypage_middle_text">수취인 정보</h2>
                    <div className="order_info-top">
                        <div className="order_info__item">
                            <span className="order_info__label">받는 사람</span>
                            <span className="order_info__value">{orderDetail.recipientName}</span>
                        </div>
                        <div className="order_info__item">
                            <span className="order_info__label">연락처</span>
                            <span className="order_info__value">{formatPhone(orderDetail.recipientContact)}</span>
                        </div>
                        <div className="order_info__item">
                            <span className="order_info__label">받는 주소</span>
                            <span className="order_info__value">({orderDetail.postalCode}) {orderDetail.address} {orderDetail.detailedAddress}</span>
                        </div>
                        <div className="order_info__item">
                            <span className="order_info__label">배송요청사항</span>
                            <span className="order_info__value"></span>
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