import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import check from '../../assets/img/cart/check.svg'

const OrderList = ({productList, toggleCart, point, selectedCoupon }) => {
  const [cartItems, setCartItems] = useState(productList); 
  const [total, setTotal] = useState(0); //{total.toLocaleString('ko-KR')}
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const totalPrice = discountedTotal - point; // 상품 가격 + 배송비 - 포인트, 배송비는 아직
  const totalCartPrice = selectedTotal; // 선택한 상품 가격 + 배송비(선택한 상품 없을 때 배송비 없게 해야함)
  useEffect(() => {
    const initialTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.count, 0
    );
    setTotal(initialTotal);
  }, [cartItems]);
  // 장바구니에서 선택한 상품 금액 계산
  useEffect(()=>{
    const newSelectedTotal = checkedItems.reduce(
      (sum, item) => sum + item.price * item.count, 0
    );
    setSelectedTotal(newSelectedTotal);
  }, [checkedItems]);

  // 배송 할인쿠폰 적용 금액
  useEffect(() => {
    if (selectedCoupon) {
      const discount = (total * selectedCoupon.sale) / 100;
      setDiscountedTotal(total - discount);
    } else {
      setDiscountedTotal(total);
    }
  }, [total, selectedCoupon]);

  useEffect(() => {
    const calQuantity = cartItems.reduce(
      (sum, item) => sum + item.count, 0
    );
    setQuantity(calQuantity);
  }, [cartItems]);

  const deleteItem = () => {
    const updatedCartItems = cartItems.filter(
      item => !checkedItems.some((checkedItem) => checkedItem.id === item.id)
    );
    setCartItems(updatedCartItems);
    setCheckedItems([]);
  }

  const decreaseNum = (id) => {
    setCartItems((prev) =>
      prev.map((item) => 
        item.id === id && item.count > 1 ? {...item, count : item.count - 1} : item
      )
    );
    setCheckedItems((prev) =>
      prev.map((item) =>
        item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
      )
    );
  }
  const increaseNum = (id) => {
    setCartItems((prev) => 
      prev.map((item) =>
        item.id === id ? {...item, count: item.count + 1 } : item
      )
    );
    setCheckedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  }
  useEffect(() => {
    const updatedTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setTotal(updatedTotal);
  }, [cartItems]);
  
  const checkAllItems = () => {
    if (checkedItems.length === cartItems.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems([...cartItems]); 
    }
  }
  const checkItemHandler = (item, isChecked) => {
    setCheckedItems((prev) => {
      if (isChecked) {
        return [...prev, item];
      } else {
        return prev.filter((checkedItem) => checkedItem.id !== item.id); 
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
        <div className='delete' onClick={deleteItem}>선택 삭제</div>                    
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
      <div className='prodList'>
        {cartItems.map((item,index)=>(
          <div className='prod' key={index}>
            <img src={item.frontImg} alt='thumbnail' className='thumbnail'/>

            <div className='info'>
              <div className='top'>
                <p className='name'>{item.name}</p>
                <p className='price'>&#xffe6; {item.price.toLocaleString('ko-KR')}</p>
                {/**
                <p className='dc-price'>&#xffe6; {item.dcPrice}</p>
                */}
              </div>
              <div className='bottom'>
                <p>{item.color}<span className='slash'>/</span>{item.size}</p>
                <div className='quantity'>
                  <button className='minus' onClick={()=>decreaseNum(item.id)}>-</button>
                  <p className='cal'>{item.count}</p>
                  <button className='plus' onClick={()=>increaseNum(item.id)}>+</button>
                </div>
              </div>
            </div>
            {/** 장바구니 화면에만 보임 */}
            <label className='checkbox'>
              <input
                type="checkbox"
                id={item.id}
                checked={checkedItems.some((checkedItem) => checkedItem.id === item.id)}
                onChange={(e) => isCheckItem(e, item)} 
               />
               {checkedItems.some((checkedItem) => checkedItem.id === item.id)  && ( 
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
          <p>&#xffe6; 0</p>
        </div>
        <div className='total-price'>
          <p>총 결제 금액</p>
          <p className='sum-price'>&#xffe6; {totalCartPrice.toLocaleString('ko-KR')}</p>
        </div>
      </div>
      
      <div className='goto-pay'>
        {/** 로그인 X
        <Link to="/order/login" state= {{ items: checkedItems }}>
          <div className='box' onClick={toggleCart}>선택한 상품만 결제</div>
        </Link>
        <Link to="/order/login" state={{ items: cartItems }}>
          <div className='box' onClick={toggleCart}>전체 결제</div>
        </Link>
        **/}
        {/** 로그인 o **/}
        <Link to="/order/delivery/member" state= {{ items: checkedItems }}><div className='box' onClick={toggleCart}>선택한 상품만 결제</div></Link>
        <Link to="/order/delivery/member"  state={{ items: cartItems }}><div className='box' onClick={toggleCart}>전체 결제</div></Link>
        
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
                <p className='dc-name'> {selectedCoupon.name} 적용시</p>
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
          <p>&#xffe6; 0</p>
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
    </>
    
  )
}

export default OrderList