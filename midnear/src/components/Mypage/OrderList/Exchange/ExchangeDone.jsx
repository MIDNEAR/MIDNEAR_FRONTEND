import React, { useRef } from 'react'
import MyPageModal from '../../MyPageModal';
import defaultimage from '../../../../assets/img/orderlist/default.svg'
import Modal from '../../../User/Modal/Modal';

const SelectContents = () => {

    const modalRef = useRef();

    const showSuccessModal = () => {
        modalRef.current.openModal(
          "교환 요청이 완료되었습니다.",
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
                        <span className='state'>{productDetails.orderState}</span>
                        <div className='dot' />
                        <span className='date'>{productDetails.orderDate}</span>
                    </div>
                    <div className='order_info'>
                        <img src={defaultimage} />
                        <div className='goods_info'>
                            <p>{productDetails.productName}</p>
                            <div className='price'>
                                <span>{productDetails.price}</span>
                                <div className='dot' />
                                <span>{productDetails.quantity}개</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='under_line' />

                <div className='box_bottom'>
                    <p>선택한 사유</p>
                    <span>{productDetails.exchangeReason}</span>
                </div>
        </div>

        <div className='option_content_container'></div>

        <div className='mypage_title'>교환 정보를 확인해 주세요</div>

        <div className='order_num'>
                <div className='order_title'>교환 정보를 꼭 확인해 주세요.</div>
            </div>

            <div className='exchange_box'>
                <div className='box_top'>
                    <div className='order_state'>
                        <span className='state'>교환 상품 선택</span>
                    </div>
                    <div className='order_info'>
                        <img src={defaultimage} />
                        <div className='goods_info'>
                            <p className='goods_name'>{productDetails.exchangeProduct.name}</p>
                            <span className='goods_price'>{productDetails.exchangeProduct.price}</span>
                            <ul className='size'>
                            {productDetails.exchangeProduct.sizes.map((size) => (
                                <li key={size}>{size}</li>
                            ))}
                            </ul>
                            <p className='color'>{productDetails.exchangeProduct.color}</p>
                        </div>
                    </div>
                    
                    <div className='color-detail'>
                        <div className='picture-detail'></div>
                        <div className='picture-detail'></div>
                        <div className='picture-detail'></div>
                        <div className='picture-detail'></div>
                    </div>
                </div>

        </div>

        <button className='submit_button_option' onClick={showSuccessModal}>교환 신청</button>

        <Modal ref={modalRef} />
        </div>
        </div>
    </div>
    </div>
  )
}

export default SelectContents;
