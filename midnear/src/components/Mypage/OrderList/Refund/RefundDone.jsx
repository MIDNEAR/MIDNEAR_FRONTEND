import React, { useRef } from 'react'
import MyPageModal from '../../MyPageModal';
import defaultimage from '../../../../assets/img/orderlist/default.svg'
import Modal from '../../../User/Modal/Modal';

const RefundDone = () => {

    const modalRef = useRef();

    const showSuccessModal = () => {
        modalRef.current.openModal(
          "환불 요청이 완료되었습니다.",
          "/mypage/orderlist/detail"
        );
      };

      const productDetails = {
        orderState: "배송완료",
        orderDate: "2024.12.25 주문",
        productName: "숨이 자꾸 멎는다 네가 날 향해 걸어온다 나를 보며 웃는다 너도 내게 끌리는지",
        price: "₩ 99,999",
        quantity: 1,
        exchangeReason: "단순 변심",
        exchangeProduct: {
          name: "CUTE SWEATERS",
          price: "₩ 99,999",
          sizes: ["S", "M", "L", "XL"],
          color: "BLACK",
          images: [defaultimage, defaultimage, defaultimage, defaultimage],
        },
      };

  return (
    <div className='container'>
        <div className='field_container'>
        <MyPageModal/>

        <div className='field_container_content'>
                <div className='load_bar'>
                    <span>[1] 상품 확인</span>
                    <div className='load_bar_line_selected' />
                    <span>[2] 사유 선택</span>
                    <div className='load_bar_line_selected' />
                    <span>[3]확인 신청</span>
                </div>

                <div className='option_content_container'>

                <div className='mypage_title'>확인</div>

                <div className='order_num'>
                    <div className='order_title'>교환/환불 상품 정보 및 사유 등이 맞는지 확인해 주세요.</div>
                </div>

                <div className='exchange_box'>
                    <div className='box_top'>
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

                    <div className='under_line' />

                    <div className='box_bottom'>
                        <p>선택한 사유</p>
                        <span>단순 변심</span>
                    </div>
            </div>

            <div className='option_content_container'></div>

            <div className='mypage_title'>환불 정보를 확인해 주세요</div>

            <div className='order_num'>
                    <div className='order_title'>환불 정보를 꼭 확인해 주세요.</div>
                </div>

                <div className='exchange_box'>
                    <div className='box_top'>
                        <div className='order_state'>
                            <span className='state-refund'>환불 예상 금액</span>
                        </div>
                        <div className='order_title-refund'>* 단순 변심으로 인한 환불 요청은 환불금을 부담하실 수 있습니다.  </div>
                        <div className='goods_value'>
                            <p className='label'>상품 금액</p>
                            <p className='amount'>99,999원</p>
                        </div>
                        <div className='refund_value'>
                            <p className='label'>교환 금액</p>
                            <p className='amount'>5,000원</p>
                        </div>
                        
                    </div>

                    <div className='under_line' />

                    <div className='box_bottom'>
                    <div className='order_state_option'>
                            <span className='state-option-refund'>환불 예상 금액</span>
                            <span className='state-amount-refund'>99,999원</span>
                        </div>
                    </div>
            </div>

            <button className='submit_button_option' onClick={showSuccessModal}>환불 신청</button>

            <Modal ref={modalRef} />
        </div>
        </div>
    </div>
    </div>
  )
}

export default RefundDone;
