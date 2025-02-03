import React, { useState } from 'react'
import MyPageModal from '../MyPageModal'
import defaultimage from '../../../assets/img/orderlist/default.svg'
import { useNavigate } from 'react-router-dom'

const SelectContents = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const navigate = useNavigate()

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNextStep = () => {
        if (selectedOption === 'exchange') {
        navigate('/mypage/orderlist/option/exchange')
        } else if (selectedOption === 'refund') {
        navigate('/mypage/orderlist/option/refund')
        } else {
        alert('옵션을 선택해주세요.')
        }
    };

  return (
    <div className='container'>
      <div className='field_container'>
      <MyPageModal/>

      <div className='field_container_content'>
        <div className='load_bar'>
            <span>[1] 상품 확인</span>
            <div className='load_bar_line' />
            <p>[2] 사유 선택</p>
            <div className='load_bar_line' />
            <p>[3]확인 신청</p>
        </div>

        <div className='optional_contents'>

            <div className='mypage_title'>교환 환불 신청</div>

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

                <div className='box_right-select'>
                    <div className='box'>
                    <button
                        className={`order_option ${selectedOption === 'exchange' ? 'active' : ''}`}
                        onClick={() => handleOptionClick('exchange')}
                    >
                        교환 신청
                    </button>
                    <button
                        className={`order_option ${selectedOption === 'refund' ? 'active' : ''}`}
                        onClick={() => handleOptionClick('refund')}
                    >
                        환불 신청
                    </button>
                    </div>
                </div>
        </div>

        <button className='optional_next_level' onClick={handleNextStep}>다음 단계</button>

        </div>

      </div>
    </div>
    </div>
  )
}

export default SelectContents;
