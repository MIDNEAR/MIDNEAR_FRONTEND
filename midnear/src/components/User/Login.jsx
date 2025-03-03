import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kakao from '../../assets/img/user/login/kakao_logo.svg';
import naver from '../../assets/img/user/login/naver_logo.svg';
import google from '../../assets/img/user/login/google_logo.svg';
import cancel from '../../assets/img/user/login/cancel.svg';
import Header from '../Sections/Header';
import { AuthContext } from "../../action/authContext";
import axios from 'axios';

const Login = ({ onClose }) => {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [pwdError, setPwdError] = useState(true);

    const handleLogin = () => {
        const isEmailEmpty = email.trim() === '';
        const isPasswordEmpty = password.trim() === '';

        setIsEmailValid(!isEmailEmpty);
        setIsPasswordValid(!isPasswordEmpty);
        setPwdError(!pwdError);
        
        if (!isEmailEmpty && !isPasswordEmpty) {
            axios
                .post(`${DOMAIN}/user/login`, {
                    id: email,
                    password: password
                })
                .then((response) => {
                    if (response.status === 200) {
                        onClose();
                        localStorage.setItem('jwtToken', response.data.data);
                        fecthdata();
                        navigate('/');
                        setIsAuthenticated(true);
                        window.dispatchEvent(new Event("storage"));
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        setPwdError(false);
                    }
                    console.error('인증 요청 실패:', error.response || error.message);
                });
        }
    };

    const fecthdata = () => {
        const token = localStorage.getItem('jwtToken');
        axios
            .get(`${DOMAIN}/user/user-info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 && res.data.success) {
                    const userInfo = res.data.data;
                    console.log('유저정보 업데이트', userInfo);

                    localStorage.setItem('userInfo', JSON.stringify(res.data.data));

                }
            })
            .catch(() => {
                console.log('유저정보 없음');
            });
    };

 
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className='background' onKeyDown={handleKeyDown} tabIndex={0}>
            <div className='login_content'>
                <div className='login'>
                    <div className='login_nav'>
                        <img src={cancel} className='x' onClick={onClose} alt="닫기"/>
                        <Header />
                    </div>
                    <div className='mid_text'>LOGIN</div>
                    <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>

                    <input
                        type='text'
                        className={`min_text ${isEmailValid ? '' : 'invalid'}`}
                        placeholder='아이디 or 이메일*'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {!isEmailValid && <p className="error_message">아이디 or 이메일 입력은 필수입니다.</p>}

                    <input
                        type='password'
                        className={`min_text ${isPasswordValid ? '' : 'invalid'}`}
                        placeholder='비밀번호*'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {(!pwdError&&isPasswordValid) && <p className="error_message">비밀번호가 올바르지 않습니다.</p>}
                    {!isPasswordValid && <p className="error_message">비밀번호 입력은 필수입니다.</p>}

                    <div className='button_container'>
                        <button className='kakao_btn'>
                            <img src={kakao} alt="카카오 로그인" />
                            카카오 로그인
                        </button>
                        <button className='naver_btn'>
                            <img src={naver} alt="네이버 로그인" />
                            네이버 로그인
                        </button>
                        <button className='google_btn'>
                            <img src={google} alt="구글 로그인" />
                            구글 로그인
                        </button>
                    </div>

                    <button className='user_btn' onClick={handleLogin}>LOGIN</button>

                    <div className='option_content'>
                        <div className='check_field'>
                            <input type='checkbox' className='keep_login' />
                            <p>로그인 상태 유지</p>
                        </div>
                        <div className='option'>
                            <Link to='/user/find/id' className='option_text'>아이디 / 비밀번호를 잊으셨나요?</Link>
                            <Link to='/user/join' className='option_text'>회원가입하기</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
