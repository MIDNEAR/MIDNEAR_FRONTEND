import React from 'react'
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import StepHeader from '../StepHeader'
import succeedImg from '../../../assets/img/cart/succeed.svg'
const PaySucceed = () => {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate('/');
  };
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const location = useLocation();
  const orderData = JSON.parse(localStorage.getItem("orderData"));

  useEffect(() => {
    console.log(orderData);
    if (!orderData) {
      console.error("❌ 주문 정보가 없습니다.");
     
    }

    axios.post(`${DOMAIN}/orders/nonUserCreate`, orderData)
      .then((res) => {
        if (res.status === 200) {
          console.log("✅ 주문 생성 성공:", res.data);
          localStorage.removeItem("orderData");
        }
      })
      .catch((error) => {
        console.error("❌ 주문 생성 실패:", error);
        console.log(orderData);
      });
  }, [navigate, orderData]);




  return (
    <div className='pay'>
      <StepHeader />
      <div className='container'>
        <div className='result'>
          <div className='altImg'>
            <img src={succeedImg} />
          </div>
          <div className='font1'>결제 완료</div>
          <div className='font2'>결제가 정상적으로 완료되었습니다.</div>
          <div className='box1' onClick={goHome}>쇼핑 계속하기</div>
          <div className='box2'>주문 목록 확인하기</div>
        </div>
      </div>
    </div>
  )
}

export default PaySucceed