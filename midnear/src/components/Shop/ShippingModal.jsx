import React from 'react'
import Close from '../../assets/img/product/close.svg'

const ShippingModal = ({isOpen, closeModal, content}) => {
  return (
    <div className='ShippingModal' style={{display:isOpen ? "flex" : "none"}} >
        <div className='modal'>
            <div className='modal-top'>
                <h2>SHIPPING & RETURNS</h2>
                <img src={Close} onClick={closeModal} className='close'/>
            </div>
            <div className='content'>
                <p>{content}</p>
            </div>
        </div>
    </div>
  )
}

export default ShippingModal