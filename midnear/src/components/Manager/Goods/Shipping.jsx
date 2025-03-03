import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modals/Modal';
import axios from 'axios';

const Shipping = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shippingData, setShippingData] = useState({
    shippingInfo: '',
    shippingNotice: '',
    shippingReturnsPolicy: ''
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get(`${DOMAIN}/productManagement/shippingReturns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShippingData(response.data.data || {});
        }
      })
      .catch((error) => {
        console.error("데이터 불러오기 오류:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const infoSave = () => {
    setIsModalOpen(true);
  }

  const policySave = () => {
    setIsModalOpen(true);
  }
  
  const handleConfirm = () => {
    setIsCompleted(true);
    setIsModalOpen(false);

    axios
      .post(`${DOMAIN}/productManagement/shippingReturns`, shippingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("저장 성공", response.data);
        }
      })
      .catch((error) => {
        console.error("저장 오류:", error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='shipping_return'>
      <div className="top container">
        <div className="title">SHIPPING & RETURNS</div>
        <div className="input">
          <input
            type="text"
            placeholder="택배사 및 번호"
            className="left"
            name="shippingInfo"
            value={shippingData.shippingInfo}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="배송관련 유의사항"
            className="right"
            name="shippingNotice"
            value={shippingData.shippingNotice}
            onChange={handleChange}
          />
        </div>
        <div className="btn" onClick={()=> infoSave}>완료</div>
      </div>
      <div className="bot container">
        <div className="title">SHIPPING & RETURNS 세부약관</div>
        <textarea
          placeholder="SHIPPING & RETURNS"
          name="shippingReturnsPolicy"
          value={shippingData.shippingReturnsPolicy}
          onChange={handleChange}
        ></textarea>
        <div className="btn" onClick={()=> policySave}>완료</div>
      </div>
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Shipping;
