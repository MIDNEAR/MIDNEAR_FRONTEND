import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modals/Modal';
import axios from 'axios';

const Privacy = () => {
  const [policyText, setPolicyText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  const handleInputChange = (e) => {
    setPolicyText(e.target.value);
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsCompleted(true);
    setIsModalOpen(false);

    axios
      .post(`${DOMAIN}/storeManagement/updateDataUsage`, {
        content: policyText
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
      .get(`${DOMAIN}/storeManagement/getDataUsage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPolicyText(response.data.data);

        }
      })
      .catch((error) => {
        console.log(error)
      });
  }


  return (
    <div className='privacy container'>

      <div className="title">개인정보 수집 및 이용목적</div>
      <textarea
        className="policy-input"
        value={policyText}
        onChange={handleInputChange}
        placeholder="개인정보 수집 및 이용목적 입력"
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

export default Privacy
