import React from 'react';

const OrderItem = ({orderItem, date, actions}) => {
  const formatDate = (date) => {
    return date.split("T")[0].replace(/-/g, ". ");
  };
  return (
    <div className="ordering_box">
      {orderItem.map((item)=>
      <div className='anOrder' key={item.orderProductId}>
        <div className="box_left">
          <div className="order_state">
            <span className="state">{item.orderStatus || '상품준비중'}</span>
            <div className="dot" />
            <span className="date">{formatDate(date)} 주문</span>
          </div>
          <div className="order_info">
            <img src={item.productMainImage} alt="상품 이미지" />
            <div className="goods_info">
              <p>{item.productName}</p>
              <div className="price">
                <span>{item.payPrice.toLocaleString('ko-KR')}</span>
                <div className="dot" />
                <span>{item.quantity}개</span>
              </div>
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="box_right">
          <div className='box'>
              <div className="actions">{actions}</div>
          </div>
          
        </div>
      </div>
      )}
    </div>
  );
};

export default OrderItem;
