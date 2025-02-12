import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modals/Modal';
import axios from 'axios';

const Terms = () => {
      const [termsText, setTermsText] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isCompleted, setIsCompleted] = useState(false);  
      const DOMAIN = process.env.REACT_APP_DOMAIN;
      const navigate = useNavigate();
      const token = localStorage.getItem('jwtToken');

      const handleInputChange = (e) => {
        setTermsText(e.target.value);
      };

    const handleSave = () => {
        setIsModalOpen(true); 
      };
    
      const handleConfirm = () => {
        setIsCompleted(true);  
        setIsModalOpen(false);  

        axios
        .post(`${DOMAIN}/storeManagement/updateTermsOfService`, {
          content: termsText
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        });
       
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false); 
      };

      useEffect(() => {
        fetchdata();
      }, [navigate, isCompleted]);
    
      const fetchdata = () => {
        axios
          .get(`${DOMAIN}/storeManagement/getTermsOfService`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setTermsText(response.data.data);
    
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }

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
