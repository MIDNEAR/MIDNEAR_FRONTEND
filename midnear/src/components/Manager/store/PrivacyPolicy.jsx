import React, { useState } from 'react';
import Modal from '../Modals/Modal';

const PrivacyPolicy = () => {
  const [policyText, setPolicyText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);  

  const handleInputChange = (e) => {
    setPolicyText(e.target.value);
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
    <div className="privacy-policy container">
      <div className="title">개인정보처리방침 관리</div>
      <textarea
        className="policy-input"
        value={policyText}
        onChange={handleInputChange}
        placeholder="개인정보처리방침 입력"
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
};

export default PrivacyPolicy;
