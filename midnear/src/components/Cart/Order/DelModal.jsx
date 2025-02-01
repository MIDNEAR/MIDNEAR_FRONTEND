import React, {useState} from 'react'

export const DelModal = ({isOpen, closeModal, deleteAddress}) => {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('ShippingModal')) {
      closeModal();
    }
  };
  
  return (
    <div className='DelModal'>
        <div className='ShippingModal' onClick={handleClickOutside} style={{display:isOpen ? "flex" : "none"}}>
            <div className='modal'>
                <p>배송 정보를 정말 삭제할까요?</p>
                <div className='del-btn' onClick={closeModal && deleteAddress}>삭제</div>
            </div>
        </div>
    </div>
  )
}
