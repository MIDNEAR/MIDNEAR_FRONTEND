import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Close from '../../assets/img/product/close.svg'
import OrderList from './OrderList'

const ShoppingCart = ({ toggleCart, cartList}) => {
  return (
    <div className='cart_content'>
      <div className='cart'>
        <div className='cart_nav'>
        <img src={Close} className='close' onClick={toggleCart}/>
        <div className="sc2">
          <p className="SEARCH">SEARCH</p>
          <p className="LOGIN">LOGIN</p>
          <p className="ACCOUNT">ACCOUNT</p>
          <p className="BAG">
             BAG <span>({cartList.length})</span>
          </p>
        </div>
      </div>
  
      < OrderList productList={cartList} toggleCart={toggleCart} point={0}/>
     </div>
    </div>
  )
}

export default ShoppingCart