import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kakao from '../../assets/img/user/login/kakao_logo.svg'
import naver from '../../assets/img/user/login/naver_logo.svg'
import google from '../../assets/img/user/login/google_logo.svg'
import cancel from '../../assets/img/user/login/cancel.svg'
import axios from 'axios';

const Login = ({ onClose }) => {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleLogin = () => {
        const isEmailEmpty = email.trim() === '';
        const isPasswordEmpty = password.trim() === '';

        setIsEmailValid(!isEmailEmpty);
        setIsPasswordValid(!isPasswordEmpty);

        if (!isEmailEmpty && !isPasswordEmpty) {
            axios
                .post(`${DOMAIN}/user/login`, {
                    id: email,
                    password: password
                })
                .then((response) => {
                    if (response.status === 200) {
                        navigate('/');
                        onClose();
                        localStorage.setItem('jwtToken', response.data.data);
                    }
                })
                .catch((error) => {
                    console.error('인증 요청 실패:', error.response || error.message);
                });

        }
    };

    return (
        <div className='background'>
            <div className='login_content'>
                <div className='login'>
                    <div className='login_nav'>
                        <img src={cancel} className='x' onClick={onClose} />

                        <div className="sc2">
                            <p className="SEARCH">SEARCH</p>
                            <p className="LOGIN">LOGIN</p>
                            <p className="ACCOUNT">ACCOUNT</p>
                            <p className="BAG">
                                BAG <span>(1)</span>
                            </p>
                        </div>
                    </div>
                    <div className='mid_text'>LOGIN</div>
                    <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>

                    <input type='text'
                        className={`min_text ${isEmailValid ? '' : 'invalid'}`}
                        placeholder='아이디 or 이메일*'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    {!isEmailValid && <p className="error_message">아이디 or 이메일 입력은 필수입니다.</p>}

                    <input type='password'
                        className={`min_text ${isPasswordValid ? '' : 'invalid'}`}
                        placeholder='비밀번호*'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    {!isPasswordValid && <p className="error_message">비밀번호 입력은 필수입니다.</p>}

                    <div className='button_container'>
                        <button className='kakao_btn'>
                            <img src={kakao} />
                            카카오 로그인
                        </button>
                        <button className='naver_btn'>
                            <img src={naver} />
                            네이버 로그인
                        </button>

                        <button className='google_btn'>
                            <img src={google} />
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
    )
}

export default Login