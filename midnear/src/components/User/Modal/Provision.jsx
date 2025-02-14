import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Provision = ({ name, onAgree, onDisagree }) => {
      const [text, setText] = useState('');
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        fetchdata();
      }, [navigate]);
    
      const fetchdata = () => {
        if(name === '개인정보처리방침'){
            axios
            .get(`${DOMAIN}/storeManagement/getPrivacyPolicy`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                  setText(response.data.data);
      
              }
            })
            .catch((error) => {
              console.log(error)
            });
        }else if(name === '이용약관'){
            axios
            .get(`${DOMAIN}/storeManagement/getTermsOfService`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                  setText(response.data.data);
      
              }
            })
            .catch((error) => {
              console.log(error)
            });
        }
       
      }
    
    
    return (
        <div className='provision_modal'>

            <h2>{name}</h2>
            <p>{text}</p>
            <div className='btns'>
                <button onClick={onAgree}>동의함</button>
                <button onClick={onDisagree}>동의하지 않음</button>
            </div>

        </div>
    );
};

export default Provision;
