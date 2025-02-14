import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import OrderList from '../OrderList'
import StepHeader from '../StepHeader'
import Coupon from './Coupon'

const MemInfo = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');
  const location = useLocation();
  const orderDTO = location.state?.orderDTO || []
  const [updateOrderDTO, setUpdateOrderDTO] = useState(orderDTO);

  const [defaultAddr, setDefaultAddr] = useState(null);
  const [name, setName] =useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');
  const [zonecode, setZonecode] = useState(''); // 우편번호
 
  const [userPoint, setUserPoint] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [validatedPoint, setValidatedPoint] = useState(0); 

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponList, setCouponList] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleSelectCoupon = (coupon) => setSelectedCoupon(coupon);
  const handleResetCoupon = () => setSelectedCoupon(null);

  const hadleIsValidate = (e) => {
    const userInput = e.target.value;

    setInputValue(userInput);
    setError('');
    setIsValidate(false);
    if(isNaN(userInput)) {
      setError('숫자만 입력해 주세요');
      setIsValidate(true);      
    }
    else if(userInput > userPoint){
      setError('보유 포인트를 초과하였습니다');
      setIsValidate(true);
    }
    else {
      setValidatedPoint(Number(userInput));
    }
  };
  
  const handleUseAllPoints = () => {   
    setInputValue(userPoint); 
    setValidatedPoint(userPoint);
    setError('');
  };

  useEffect(() => {
    const isInputValid = !isValidate && inputValue !== '' && isNaN(inputValue) === false;
    const areFieldsFilled = name.trim() !== '' && phone.trim() !== '';
    setIsButtonEnabled(isInputValid && areFieldsFilled);
  }, [name, phone, inputValue]);

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, '');
    if (input.length > 3 && input.length <= 7) {
        input = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 7) {
        input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
    }
    setPhone(input);
  };
  const formatPhoneNumber = (phoneNumber) => {
    if (/^\d{11}$/.test(phoneNumber)) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phoneNumber;
  };

  // 기본 배송지 가져오기
  const loadDefaultAddr = () => {
    axios.get(`${DOMAIN}/delivery/getDefaultAddr`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){        
        setDefaultAddr(res.data.data);
        if(res.data.data !== null){ 
        setZonecode(res.data.data.postalCode);
        if(res.data.data.deliveryRequest !== null){
          setMemo(res.data.data.deliveryRequest);
        };
      }
        console.log('기본 배송지 로드 성공:', res.data.data);
      };
    })
    .catch((error) => {
      console.error('기본 배송지 로드 실패:',error.response ||  error.message);
    });
  };
  // 포인트 총량 가져오기
  const loadTotalPoint = () => {
    axios.get(`${DOMAIN}/userCouponPoint/points/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setUserPoint(res.data.data);
      };
    })
    .catch((error) => {
      console.error('포인트 조회 실패:',error.response ||  error.message);
    });
  };
  // 쿠폰 리스트 가져오기
  const loadCouponList = () => {
    axios.get(`${DOMAIN}/userCouponPoint/coupons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setCouponList(res.data.data);
      };
    })
    .catch((error) => {
      console.error('쿠폰 조회 실패:',error.response ||  error.message);
    });
  };

  useEffect(() => {
    loadDefaultAddr();
    loadCouponList();
    loadTotalPoint();
  }, [token]);

  const calProductPrice = (start, end, price, discountPrice) => {
    const today = new Date(); 
    const startDate = start ? new Date(start) : null;
    const endDate = end? new Date(end) : null;
    if (startDate && endDate && today >= startDate && today <= endDate) {
      return discountPrice;
    }
    return price;
  };
  const calAllPayment = (updateOrderDTO) => {
    const totalPrice = updateOrderDTO.reduce((acc, item) => {
      const productPrice = calProductPrice(item.discountStartDate, item.discountEndDate, item.price, item.discountPrice);
      const totalItemPrice = productPrice * item.quantity;
      return acc + totalItemPrice; 
    }, 0);
    return totalPrice;
  };

  const calFinalPayment = (updateOrderDTO, selectedCoupon, validatedPoint) => {
    const totalPrice = calAllPayment(updateOrderDTO);
    const couponDiscount = selectedCoupon ? (100 - selectedCoupon.discountRage) / 100 : 1;
    const finalPrice = totalPrice * couponDiscount - validatedPoint;

    return finalPrice;
  };

  // 회원 주문
  const userOrder = () => {
    const formattedPhone = phone.replace(/-/g, ''); 
    axios.post(`${DOMAIN}/orders/create`,{
        orderName: name,
        orderContact: formattedPhone,
        orderEmail: email,
        allPayment: calFinalPayment(updateOrderDTO, selectedCoupon, validatedPoint), 
        deliveryAddrId: defaultAddr.deliveryAddressId,
        deliveryRequest: memo,
        userCouponId: selectedCoupon.userCouponId,
        oderProductsRequestDtos: updateOrderDTO.map(item => {
          const productPrice = calProductPrice(item.discountStartDate, item.discountEndDate, item.price, item.discountPrice);
          return { 
              productColorId: item.productColorId,
              size: item.size,
              quantity: item.quantity,
              couponDiscount: productPrice * (selectedCoupon.discountRage / 100), 
              pointDiscount: validatedPoint / updateOrderDTO.length,
              productPrice: productPrice,
              deliveryCharge: deliveryFee,
          };
        })
    })
    .then((res) => {
      if(res.status === 200){
        console.log('주문 성공:', res.data.data);
      };
    })
    .catch((error) => {
      console.error('주문 실패:', error.message);
    });
  };

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

                <input type='text' name='name' className='min_text' placeholder='홍길동*' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type='text' name='phone' className='min_text' placeholder='010-9999-9999*' value={phone} onChange={handlePhoneChange}/>
                <input type='text' name='email' className='min_text' placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)}/>

                <div className='bottom'>
                  <div className='title'>배송 정보</div>
                  {defaultAddr === null ? (
                    <>
                    <p className='min_text_ex'>입력된 배송 정보가 존재하지 않습니다.</p>
                    <Link to='/order/delivery/new-address'><button className='add-btn'>배송 정보 추가하기</button></Link>
                    </>
                  ) : (                  
                    <div className='default_add'>
                      <div className='userInfo'>
                        <div>
                          <p className='b_txt'>{defaultAddr.recipient}</p>
                          <p className='g_txt'>{formatPhoneNumber(defaultAddr.recipientContact)}</p>
                        </div>
                        <Link to='/order/delivery/select-address'><div className='change-btn'>변경</div></Link>
                      </div>
                      
                      <p className='b_txt'>{defaultAddr.address}</p>
                      <p className='b_txt'>{defaultAddr.detailAddress}</p>
                      <p className='g_txt'>({defaultAddr.postalCode})</p>
                      <p className='m_txt'>배송메모</p>
                      <input type='text' name='memo' className='memo'  placeholder='배송 메모를 입력해 주세요.' value={memo} onChange={(e) => setMemo(e.target.value)}/>
                      
                    </div> 
                  )}

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

               
                {/*<Link to='/order/pay-succeed' className='pay-link'>*/}
                    <button 
                     className={`btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                     disabled={!isButtonEnabled}
                     >
                      결제하기</button>
                {/*</Link>*/}
        </div>

          <div className='order_content'>
            <div className='title'>주문 내용</div>
            <div className='s_title'>상품</div>
            <OrderList 
              productList={orderDTO}
              point={validatedPoint || 0}
              selectedCoupon={selectedCoupon}
              postCode = {zonecode || 0}
              isCartScreen={false}
              setUpdateOrderDTO={setUpdateOrderDTO}
              setDeliveryFee={setDeliveryFee}
              deliveryFee={deliveryFee}
             />
          </div>
        </div>
    </div>
    </div>
  )
}

export default MemInfo