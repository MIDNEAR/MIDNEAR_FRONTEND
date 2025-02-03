import React, { useState } from 'react';
import Modal from '../Modals/Modal';

const Shipping = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsCompleted(true);
    setIsModalOpen(false);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='shipping_return '>
      <div className="top container">
        <div className="title">SHIPPING & RETURNS</div>
        <div className="input">
          <input type="text" placeholder='택배사 및 번호' className='left' />
          <input type="text" placeholder='배송관련 유의사항' className='right' />
        </div>
        <div className="btn"  onClick={() => handleSave()}>완료</div>
      </div>
      <div className="bot container">
        <div className="title">SHIPPING & RETURNS 세부약관</div>
        <textarea placeholder='SHIPPING & RETURNS'></textarea>
        <div className="btn" onClick={() => handleSave()}>완료</div>
      </div>
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />

    </div>
  )
}

export default Shipping
