import React, { useState } from 'react';
import Modal from '../Modals/Modal'; 

const Terms = () => {
      const [termsText, setTermsText] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isCompleted, setIsCompleted] = useState(false);  

      const handleInputChange = (e) => {
        setTermsText(e.target.value);
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
        <div className='terms_wrap container'>

            <div className="title">이용약관 관리</div>
            <textarea
                className="policy-input"
                value={termsText}
                onChange={handleInputChange}
                placeholder="이용약관 입력"
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
    )
}

export default Terms
