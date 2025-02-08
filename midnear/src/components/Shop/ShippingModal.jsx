import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Close from '../../assets/img/product/close.svg'

const ShippingModal = ({isOpen, closeModal}) => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const [modalContent, setModalContent] = useState(false);

  const loadShippingModal = async() => {
    await axios.get(`${DOMAIN}/productManagement/shippingReturns`)
    .then((res) => {
      if(res.status === 200){
        setModalContent(res.data.data);
        console.log(res.data.data);
      };
    })
    .catch((error) => {
      console.error('배송 반품 모달 로드 실패:', error.response || error.message);
    })
 };
 useEffect(()=>{
  loadShippingModal();
 },[]);

  return (
    <div className='ShippingModal' style={{display:isOpen ? "flex" : "none"}} >
        <div className='modal'>
            <div className='modal-top'>
                <h2>SHIPPING & RETURNS</h2>
                <img src={Close} onClick={closeModal} className='close'/>
            </div>
            <div className='content'>
                <p>{modalContent.shippingInfo}</p>
                <p>{modalContent.shippingNotice}</p>
                <p>{modalContent.shippingReturnsPolicy}</p>
            </div>
        </div>
    </div>
  )
}

export default ShippingModal