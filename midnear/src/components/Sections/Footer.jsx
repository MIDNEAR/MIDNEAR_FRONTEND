import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const [footer, setFooter] = useState('');
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
   const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
          setFooter(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return (
    <div className='footer'>
      <div className="info">
        <p>{footer}
        </p>
      </div>
      <div className="doc">
        <p onClick={() => setShowTermsModal(true)}>이용약관</p>
        <p onClick={() => setShowPrivacyModal(true)}>개인정보처리방침</p>
      </div>

     

    </div>
  )
}

export default Footer
