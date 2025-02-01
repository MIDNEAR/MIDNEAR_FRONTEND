import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyPageModal from '../../MyPageModal'


const OrderCancelReaon = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
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
                <div className='load_bar_line' />
                <p>[3]확인 신청</p>
            </div>

            <div className='option_content_container'>

            <div className='mypage_title'>취소 신청 사유</div>

            <div className='order_num'>
                <div className='order_title'>어떤 문제가 있나요?</div>
            </div>

            <div className='reson_section'>
                <div className="radio-group">
                    <label className="radio-label">
                    <input
                        type="radio"
                        name="findMethod"
                        onChange={handleOptionChange}
                    />
                    <span className="radio-text-loud-top">단순 변심</span>
                    </label>

                    <div className='radio-seperate-line' />

                    <label className="radio-label">
                    <input
                        type="radio"
                        name="findMethod"
                        onChange={handleOptionChange}
                    />
                    <span className="radio-text-loud-top">옵션(사이즈, 컬러 등) 변경</span>
                    </label>

                    <div className='radio-seperate-line' />

                    <label className="radio-label">
                    <input
                        type="radio"
                        name="findMethod"
                        onChange={handleOptionChange}
                    />
                    <span className="radio-text-loud-top">배송지 변경</span>
                    </label>

                    <div className='radio-seperate-line' />

                    <label className="radio-label">
                    <input
                        type="radio"
                        name="findMethod"
                        onChange={handleOptionChange}
                    />
                    <span className="radio-text-loud-top">기타</span>
                    </label>

                    <div className='radio-seperate-line' />
        
                </div>
            </div>

            <div className='more_detail_option'>
                <textarea
                    placeholder="상세 내용 작성"
                />

                <div className='button_section'>
                    <button className='previous_level_min' onClick={() => navigate(-1)} >이전 단계</button>
                    <Link to='/mypage/orderlist/option/ordercancel/done' className='next_level_min'>다음 단계</Link>
                </div>
            </div>
            
            </div>
        </div>
    </div>
    </div>
  )
}

export default OrderCancelReaon;
