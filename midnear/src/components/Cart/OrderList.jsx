import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import check from '../../assets/img/cart/check.svg'

const OrderList = ({
   productList,
   toggleCart,
   point,
   selectedCoupon,
   loadCart,
   postCode,
   isCartScreen, 
   setUpdateOrderDTO,
   deliveryFee,
   setDeliveryFee,
  }) => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(productList); 
  const [total, setTotal] = useState(0); // 장바구니 전체 상품 가격, 주문 리스트 가격(배송비, 포인트 적용X)
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedTotal, setSelectedTotal] = useState(0); // 장바구니 선택 상품 가격
  const [quantity, setQuantity] = useState(0); // 상품 총 수량
  const [discountedTotal, setDiscountedTotal] = useState(0); // 회원 할인쿠폰 적용 가격
  //const [deliveryFee, setDeliveryFee] = useState(0); // 기본 배송비
  const [isDeliveryFeeFree, setDeliveryFeeFree] = useState(false); // 배송비 무료인지 체크
  const totalPrice = discountedTotal + deliveryFee - point; // 주문 상품 가격+배송비-포인트
  const totalCartPrice = selectedTotal + deliveryFee; // 장바구니 선택 상품 가격+배송비
  const [errorMsg, setErrorMsg] = useState('');
  const today = new Date();

  useEffect(() => {
    if (isCartScreen) {
      const updatedOrderList = cartItems.map(item => ({
        cartProductsId: item.cartProductsId,
        productColorId: item.productColorId,
        productName: item.productName,
        imageUrl: item.productImage,
        price: item.price,
        discountPrice: item.discountPrice || 0,  
        discountRate: item.discountRate || 0,  
        discountStartDate: item.discountStartDate,  
        discountEndDate: item.discountEndDate, 
        currentColor: item.color, 
        size: item.size, 
        quantity: item.productQuantity,  
        deliveryCharge: 0,  
        couponDiscount: 0, 
        pointDiscount: 0, 
      }));
  
      setCartItems(updatedOrderList);
    }
  }, [isCartScreen]);

  // 할인 기간 체크
  const checkIsSale = (start, end) => {
    if (start === null || end === null) {
      return false;
    } else {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (startDate <= today && endDate >= today) {
        return true;
      } else {
        return false;
      }
    }
  }
  const allItemPay = () => {
    navigate("/order/delivery/member", { state:  cartItems });
    toggleCart();
  }
  const checkedItemPay = () =>{
    if(checkedItems.length === 0){
      setErrorMsg('선택한 상품이 없습니다.');
    } else{
      navigate("/order/delivery/member", { state: checkedItems });
      toggleCart();
      setErrorMsg('');
    }
  }
  // 처음 장바구니 전체 상품 금액
  useEffect(() => {
    const initialTotal = cartItems.reduce(
      (sum, item) => {
        const isSale = checkIsSale(item.discountStartDate, item.discountEndDate);
        const price = isSale ? Number(item.discountPrice) : Number(item.price);
        return sum + price * item.quantity;
      }, 0);
    setTotal(initialTotal);
  }, [cartItems]);

  // 장바구니에서 선택한 상품 금액 계산
  useEffect(()=>{
    const newSelectedTotal = checkedItems.reduce(
      (sum, item) => {
        const isSale = checkIsSale(item.discountStartDate, item.discountEndDate);
        const price = isSale ? Number(item.discountPrice) : Number(item.price);
        return sum + price * item.quantity;
      }, 0);
    setSelectedTotal(newSelectedTotal);
  }, [checkedItems]);

  // 회원 할인 쿠폰 적용 금액
  useEffect(() => {
    if (selectedCoupon) {
      const discount = (total * selectedCoupon.discountRate) / 100;
      setDiscountedTotal(total - discount);
    } else {
      setDiscountedTotal(total);
    }
  }, [total, selectedCoupon]);

  // 상품 수량 계산
  useEffect(() => {
    const calQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity, 0
    );
    setQuantity(calQuantity);
  }, [cartItems]);

  // 장바구니 상품 삭제 
  const deleteItem = async (checkedItems) => {
    const deletePromises = checkedItems.map(item => deleteCartItem(item.cartProductsId));
    await Promise.all(deletePromises);

    const updatedCartItems = cartItems.filter(
      item => !checkedItems.some((checkedItem) => checkedItem.cartProductsId === item.cartProductsId)
    );
    setCartItems(updatedCartItems);
    setCheckedItems([]);
    
    loadCart();
  };
  const deleteCartItem = async (cartProductsId) => {
    await axios.delete(`${DOMAIN}/cart/delete`, {
        params: {cartProductId: cartProductsId},
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
      .then((res) => {
        if(res.status === 200){
            return true;
        };
      })
      .catch((error) => {
        console.error('삭제 실패:', error.response || error.message);
      })
  };

  // 상품 수량 변경
  const decreaseNum = (cartProductsId, quantity) => {
    if(isCartScreen){
      if(quantity > 1){
        const newQuantity = quantity - 1;
        updateQuantity(cartProductsId, newQuantity);
      }
    }
    setCartItems((prev) =>
      prev.map((item) => 
        item.cartProductsId === cartProductsId && item.quantity > 1 ? {...item, quantity : item.quantity - 1} : item
      )
    );
    setUpdateOrderDTO((prev) =>
      prev.map((item) => 
        item.cartProductsId === cartProductsId && item.quantity > 1 ? {...item, quantity : item.quantity - 1} : item
      )
    );
    setCheckedItems((prev) =>
      prev.map((item) => 
        item.cartProductsId === cartProductsId && item.quantity > 1 ? {...item, quantity : item.quantity - 1} : item
      )
    ); 
  };
  const increaseNum = (cartProductsId, quantity) => {
    if(isCartScreen){
      const newQuantity = quantity + 1;
      updateQuantity(cartProductsId, newQuantity);
    }
    setCartItems((prev) => 
      prev.map((item) =>
        item.cartProductsId === cartProductsId ? {...item, quantity: item.quantity + 1 } : item
      )
    );
    setUpdateOrderDTO((prev) => 
      prev.map((item) =>
        item.cartProductsId === cartProductsId ? {...item, quantity: item.quantity + 1 } : item
      )
    );
    setCheckedItems((prev) =>
      prev.map((item) =>
        item.cartProductsId === cartProductsId ? {...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const updateQuantity = (cartProductsId, newQuantity) => {
    axios.patch(`${DOMAIN}/cart/update`, null,{
      params: {
        cartProductId: cartProductsId,
        quantity: newQuantity,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        console.log('수량 변경 성공', res.data.data);
      };
    })
    .catch((error) => {
      console.error('수량 변경 실패:', error.message);
    });
  };
  // 기본 배송비, 무료 배송 기준 띄우는 api

  // 배송비 무료인지 확인
  const isFree = (allPayment) => {
    axios.get(`${DOMAIN}/orders/getIsFree`, {
      params: {allPayment: allPayment}
    })
    .then((res) => {
      if(res.status === 200){
        setDeliveryFeeFree(true);
        setDeliveryFee(0); 
      };
    })
    .catch((error) => {
      console.error('배송비 무료 확인 실패:',error.response ||  error.message);
    });
  };
  // 우편번호로 배송비 조회
  const getFeeByPostcode = () => {
    axios.get(`${DOMAIN}/orders/getDeliveryCharge`, {
      params: {postalCode: postCode}
    })
    .then((res) => {
      if(res.status === 200){
          setDeliveryFee(res.data.data);
      };
    })
    .catch((error) => {
      console.error('우편번호로 배송비 확인 실패:',error.response ||  error.message);
    });
  };
  useEffect(()=>{
    // 상품 총 가격으로 배송비 무료인지 확인
    // 무료이면 배송비 0으로 설정
    // 무료 아니면 우편번호로 배송비 조회 후 설정
    // 해당 배송비 memInfo, noMemInfo로 보내기
    if(isCartScreen){
      isFree(selectedTotal);
      if(isDeliveryFeeFree){
        return;
      }
    } else {
      isFree(total);
      if(isDeliveryFeeFree){
        return;
      } else{
        getFeeByPostcode();
      }
    }
  },[isCartScreen, selectedTotal, total, postCode]);
  
  // 전체 상품 가격 계산
  useEffect(() => {
    const updatedTotal = cartItems.reduce(
      (sum, item) => {
        const isSale = checkIsSale(item.discountStartDate, item.discountEndDate);
        const price = isSale ? Number(item.discountPrice) : Number(item.price);
        return sum + price * item.quantity;
      }, 0);
    setTotal(updatedTotal);
  }, [cartItems]);
  
  // 상품 선택
  const checkAllItems = () => {
    if (checkedItems.length === cartItems.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(cartItems); 
    }
  }
  const checkItemHandler = (item, isChecked) => {
    setCheckedItems((prev) => {
      if (isChecked) {
        return [...prev, item];
      } else {
        return prev.filter((prevItem) => prevItem.cartProductsId !== item.cartProductsId); 
      }
    });
  };

  const isCheckItem = (e, item) => {
    const { checked } = e.target;
    checkItemHandler(item, checked);
  };
  return (
    <>
     {/** 장바구니 화면에만 보임 */}
      <div className='del-check'>
        <div className='delete' onClick={() => deleteItem(checkedItems)}>선택 삭제</div>                    
        <div className='check'>
          <span>전체 선택</span>
          <label className='checkbox'>
            <input
              type="checkbox"
              checked={checkedItems.length === cartItems.length}
              onChange={checkAllItems} 
            />
            { checkedItems.length !== 0 && checkedItems.length === cartItems.length && (
              <img src={check} alt='check' className='checkImg'/>
            )}
          </label>
        </div>
      </div>
      {/** 공통 */}
      <div className='all-list'>
        <div className='prodList'>
          {cartItems.map((item,index)=>(
            <div className='prod' key={index}>
              <div className='img-info'>
                <img src={item.imageUrl} alt='thumbnail' className='thumbnail'/>

                <div className='info'>
                  <div className='top'>
                    <p className='name'>{item.productName}</p>
                    <p className={`price ${checkIsSale(item.discountStartDate, item.discountEndDate) ? 'display' : ''}`}>&#xffe6; {Number(item.price).toLocaleString('ko-KR')}</p>
                    <div className={`discount ${checkIsSale(item.discountStartDate, item.discountEndDate) ? 'display' : ''}`}>
                    <p className='dc-price'>&#xffe6; {item.discountPrice.toLocaleString('ko-KR')}</p>
                    <p className='coupon'>{item.discountRate}% 할인가</p>
                  </div>
                  </div>
                  <div className='bottom'>
                    <p>{item.currentColor}<span className='slash'>/</span>{item.size}</p>
                    <div className='quantity'>
                      <button className='minus' onClick={()=>decreaseNum(item.cartProductsId, item.quantity)}>-</button>
                      <p className='cal'>{item.quantity}</p>
                      <button className='plus' onClick={()=>increaseNum(item.cartProductsId, item.quantity)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
              {/** 장바구니 화면에만 보임 */}
              <label className='checkbox'>
                <input
                  type="checkbox"
                  id={item.cartProductsId}
                  checked={checkedItems.some((checkedItem) => checkedItem.cartProductsId === item.cartProductsId)}
                  onChange={(e) => isCheckItem(e, item)} 
                />
                {checkedItems.some((checkedItem) => checkedItem.cartProductsId === item.cartProductsId)  && ( 
                    <img src={check} alt='check' className='checkImg'/>
                  )}
              </label>
            </div>
          ))}
        </div>

        {/** 장바구니 화면에만 보임 */}
        <div className='only-cart'>
          <div className='total'>
            <div className='total-price'>
              <p>총 상품 금액</p>
              <p className='sum-price'>&#xffe6; {selectedTotal.toLocaleString('ko-KR')}</p>
            </div>
            <div className='fee'>
              <div>
                <p className='text'>배송비</p>
                <p className='ship-alt'>* 100,000원 이상 배송비 무료</p>
              </div>
              <p>&#xffe6; {deliveryFee.toLocaleString('ko-KR')}</p>
            </div>
            <div className='total-price'>
              <p>총 결제 금액</p>
              <p className='sum-price'>&#xffe6; {totalCartPrice.toLocaleString('ko-KR')}</p>
            </div>
          </div>
        
          <div className='goto-pay'>            
            <div className='box' onClick={checkedItemPay}>선택한 상품만 결제</div>
            <div className='box' onClick={allItemPay}>전체 결제</div>
          </div>
        </div>

        {/** 배송 화면에서 보임 */}
        <div className='only-order'>
          <div className='total'>
              <p className='text'>상품 합계</p> 
              <div className='price'>
                <p className={`origin ${selectedCoupon ? 'line' : ''}`}>&#xffe6; {total.toLocaleString('ko-KR')}</p> 
                {selectedCoupon &&
                <div className='dc-info'>
                  <p className='dc-name'> {selectedCoupon.couponName} 적용시</p>
                  <p className='dc'>&#xffe6; {discountedTotal.toLocaleString('ko-KR')}</p>
                  </div>
                }
              </div>
          </div>
          <div className='fee'>
            <div>
              <p className='text'>배송비</p>
              <p className='ship-alt'>* 100,000원 이상 배송비 무료</p>
            </div>
            <p>&#xffe6;  {deliveryFee.toLocaleString('ko-KR')}</p>
          </div>
          {/** 회원만 보임 */}
          <div className='use-point'>
              <p className='text'>포인트 사용</p> 
              { point > 0 && (
                <p>- &#xffe6;  {point.toLocaleString('ko-KR')}</p>
              )}
          </div>
          <div className='total-fee'>
              <p className='text'>총 합계(수량:{quantity})</p> <p>&#xffe6; {totalPrice.toLocaleString('ko-KR')}</p>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default OrderList