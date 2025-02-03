import React from 'react';
import logo from "../../assets/img/logo/header_logo.svg";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/manager/Goods/AddGoods');
    }
    const goUser = () => {
        navigate('/')
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
