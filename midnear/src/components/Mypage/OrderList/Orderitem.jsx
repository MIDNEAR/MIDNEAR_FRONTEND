import React from 'react';

const OrderItem = ({ state, date, image, info, price, quantity, actions }) => {
  return (
    <div className="ordering_box">
      <div className="box_left">
        <div className="order_state">
          <span className="state">{state}</span>
          <div className="dot" />
          <span className="date">{date}</span>
        </div>
        <div className="order_info">
          <img src={image} alt="상품 이미지" />
          <div className="goods_info">
            <p>{info}</p>
            <div className="price">
              <span>{price}</span>
              <div className="dot" />
              <span>{quantity}개</span>
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
  );
};

export default OrderItem;
