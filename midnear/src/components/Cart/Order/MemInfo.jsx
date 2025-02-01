import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import OrderList from '../OrderList'
import StepHeader from '../StepHeader'
import Coupon from './Coupon'

const MemInfo = () => {
  const location = useLocation();
  const items = location.state?.items || []; // prodList에서 선택한(전체) 상품 받아오기

  const [name, setName] =useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');
 
  const [userPoint, setUserPoint] = useState(10000);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isValidate, setIsValidate] = useState(false);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleSelectCoupon = (coupon) => setSelectedCoupon(coupon);
  const handleResetCoupon = () => setSelectedCoupon(null);
  
  const couponList = [
    {id: 1, name: '고객 감사 깜짝 20% 할인 쿠폰', sale: 20},
    {id: 2, name: '10% 할인 쿠폰', sale: 10},
    {id: 3, name: '30% 할인 쿠폰', sale: 30},
  ];

  const hadleIsValidate = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput.toLocaleString('ko-KR'));
    setError('');
    setIsValidate(false);
    if(isNaN(userInput)) {
      setError('숫자만 입력해 주세요');
      setIsValidate(true);      
    }
    else if(userInput > userPoint){
      setError('보유 포인트를 초과하였습니다');

    }
  }
  
  const handleUseAllPoints = () => {
    setInputValue(userPoint);
    setError('');
  };

  useEffect(() => {
    const isInputValid = !isValidate && inputValue !== '' && isNaN(inputValue) === false;
    const areFieldsFilled = name.trim() !== '' && phone.trim() !== '';
    setIsButtonEnabled(isInputValid && areFieldsFilled);
  }, [name, phone, inputValue]);

  return (
    <div className='member'>
    <div className='info'>
        <StepHeader />
        <div className='container'>
          <div className='empty'></div>

          <div className='info_content'>
            <div className='write-info'>
                <div className='mid_text'>주문자 정보</div>
                <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>

                <input type='text' name='name' className='min_text' placeholder='홍길동*' onChange={(e) => setName(e.target.value)}/>
                <input type='text' name='phone' className='min_text' placeholder='010-9999-9999*'  onChange={(e) => setPhone(e.target.value)}/>
                <input type='text' name='email' className='min_text' placeholder='이메일' onChange={(e) => setEmail(e.target.value)}/>

                <div className='bottom'>
                  <div className='title'>배송 정보</div>
                  {/** 기본 배송지 없을 때 
                  <p className='min_text_ex'>입력된 배송 정보가 존재하지 않습니다.</p>
                  <Link to='/order/delivery/new-address'><button className='add-btn'>배송 정보 추가하기</button></Link>
                  */}
                  {/** 기본 배송지 있을 때*/}
                  <div className='default_add'>
                    <div className='userInfo'>
                      <div>
                        <p className='b_txt'>홍길동</p>
                        <p className='g_txt'>010-1233-1222</p>
                      </div>
                      <Link to='/order/delivery/select-address'><div className='change-btn'>변경</div></Link>
                    </div>
                    
                    <p className='b_txt'>서울특별시 서대문구 성산로 8길 9-9 (연희동)</p>
                    <p className='b_txt'>ㅇㅇ아파트 109동 109호(종 1234)</p>
                    <p className='g_txt'>(123098)</p>
                    <p className='m_txt'>배송메모</p>
                    <input type='text' name='memo' className='memo'  placeholder='배송 메모를 입력해 주세요.' onChange={(e) => setMemo(e.target.value)}/>
                    <div>

                    </div>
                  </div> 

                </div>
                <div className='point'>
                  <div className='use-coupon'><Coupon couponList={couponList} onSelectCoupon={handleSelectCoupon} onResetCoupon={handleResetCoupon}/></div>
                  <p className='mid_text_ex'>포인트 사용 / 보유 포인트: {userPoint.toLocaleString('ko-KR')} 포인트</p> 
                  <div className='use-point'>
                    <input type='text' name='point' className='use-text' placeholder='예) 9,999사용'  
                    value={inputValue}
                    onChange={(e) => hadleIsValidate(e)} />
                    <div className='use-btn' onClick={handleUseAllPoints}>전액 사용</div>
                  </div>
                  <div className='error'>{error}</div>{/* 오류 메시지 표시 */}
                  
                </div>
                </div>

               
                <Link to='/order/pay-succeed' className='pay-link'>
                    <button 
                     className={`btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                     disabled={!isButtonEnabled}
                     >
                      결제하기</button>
                </Link>
        </div>

          <div className='order_content'>
            <div className='title'>주문 내용</div>
            <div className='s_title'>상품</div>
            <OrderList 
              productList={items}
              point={Number(inputValue.replace(/,/g, '') || 0)}
              selectedCoupon={selectedCoupon}
             />
          </div>
        </div>
    </div>
    </div>
  )
}

export default MemInfo