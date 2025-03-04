import React from 'react'

export const DelModal = ({isOpen, closeModal, deleteAddress, defaultStatus}) => {
  
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('ShippingModal')) {
      closeModal();
    }
  };
  
  return (
    <div className='DelModal'>
        <div className='ShippingModal' onClick={handleClickOutside} style={{display:isOpen ? "flex" : "none"}}>
            <div className='modal'>
              {defaultStatus ? (
                <>
                  <p>기본 배송지는 삭제할 수 없습니다.</p>
                  <div className='del-outer'>
                    <div className='del-btn' onClick={closeModal}>확인</div>
                  </div>
                </>
              ) : (
                <>
                <p>배송 정보를 정말 삭제할까요?</p>
                <div className='del-outer'>
                  <div className='del-btn' onClick={closeModal && deleteAddress}>삭제</div>
                </div>
                </>
              )}                
            </div>
        </div>
    </div>
  )
}
