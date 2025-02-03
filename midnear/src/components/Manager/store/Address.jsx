import React, { useState } from 'react';
import Modal from '../Modals/Modal';

const Address = () => {
    const [addressText, setAddressText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleInputChange = (e) => {
        setAddressText(e.target.value);
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
        <div className='address_wrap container'>
            <div className="title">주소 및 사업자 정보 관리</div>
            <textarea
                className="address-input"
                value={addressText}
                onChange={handleInputChange}
                placeholder="주소 및 사업자 정보 관리 입력"
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

export default Address
