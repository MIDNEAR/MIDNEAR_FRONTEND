import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Modals/Modal';

const Address = () => {
    const [addressText, setAddressText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    const handleInputChange = (e) => {
        setAddressText(e.target.value);
    };

    const handleSave = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsCompleted(true);
        setIsModalOpen(false);
        axios
        .post(`${DOMAIN}/storeManagement/updateBusinessInfo`, {
            content: addressText
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
          if (response.status === 200) {
              setAddressText(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error)
        });

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchdata();
      }, [navigate]);
    
      const fetchdata = () => {
        axios
          .get(`${DOMAIN}/storeManagement/getBusinessInfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
                setAddressText(response.data.data);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }

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
