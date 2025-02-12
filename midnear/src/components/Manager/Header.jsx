import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [logo, setLogo] = useState('');
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const token = localStorage.getItem('jwtToken');

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/manager/Goods/AddGoods');
    }
    const goUser = () => {
        navigate('/')
    }
    useEffect(() => {
        fetchdata();
    }, [navigate]);


    const fetchdata = () => {
        fetchlogo();
    }
    const fetchlogo = () => {
        axios
            .get(`${DOMAIN}/storeManagement/getLogoImage`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setLogo(response.data.data.imageUrl)
                }
            })
            .catch((error) => {

            });
    }

    return (
        <div className='manager-header'>
            <div className="logo">
                <img src={logo} alt="logo" onClick={goHome} />
            </div>
            <div className="goUser" onClick={goUser} >
                <p>사용자 페이지로</p>
            </div>
            <div className="logout">
                <p>
                    로그아웃
                </p>

            </div>
        </div>
    )
}

export default Header
