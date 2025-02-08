import React, { useState } from 'react';
import Modal from '../Modals/Modal';

const Footer = () => {
    const [footerText, setFooterText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);  
  
    const handleInputChange = (e) => {
        setFooterText(e.target.value);
    };
  
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
      <div className="footer_manager container">
        <div className="title">푸터 관리</div>
        <textarea
          className="footer-input"
          value={footerText}
          onChange={handleInputChange}
          placeholder="푸터 입력"
        />
        <div className="btn" onClick={handleSave}>
          완료
        </div>
  
  
        <Modal
          show={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
  
      </div>
    );
}

export default Footer
