import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import kakao from '../../assets/img/user/login/kakao_logo.svg';
import naver from '../../assets/img/user/login/naver_logo.svg';
import google from '../../assets/img/user/login/google_logo.svg';
import StepHeader from './StepHeader';



const GotoLogin = () => {
    const location = useLocation();
    const orderDTO = location.state || [];
    const navigate = useNavigate();
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [pwdError, setPwdError] = useState(false);

    const goToFindID = () => {
        navigate('/user/find/id');
    };
    
    const goToJoin = () => {
        navigate('/user/join');
    };
    
    const handleLogin = () => {
        const isEmailEmpty = email.trim() === '';
        const isPasswordEmpty = password.trim() === '';

        setIsEmailValid(!isEmailEmpty);
        setIsPasswordValid(!isPasswordEmpty);
        setPwdError(false); 

        if (!isEmailEmpty && !isPasswordEmpty) {
            axios
                .post(`${DOMAIN}/user/login`, {
                    id: email,
                    password: password
                })
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('jwtToken', response.data.data);
                        fetchData();
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        setPwdError(true);
                    }
                    console.error('인증 요청 실패:', error.response || error.message);
                });
        }
    };

    const fetchData = () => {
        const token = localStorage.getItem('jwtToken');
        axios
            .get(`${DOMAIN}/user/user-info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 && res.data.success) {
                    localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                    navigate('/order/delivery/member')

                }
            })
            .catch(() => {
                console.log('유저정보 없음');
            });
    };

  return (
    <div className='GotoLogin'>
        <StepHeader />
        <div className='container'>
            <div className='empty'></div>

            <div className='login_content'>
                <div className='login'>
                    <div className='mid_text'>LOGIN</div>
                    <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>

                    <input 
                        type='text' 
                        className={`min_text ${!isEmailValid ? 'error' : ''}`}
                        placeholder='이메일*' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <input 
                        type='password' 
                        className={`min_text ${!isPasswordValid ? 'error' : ''}`}
                        placeholder='비밀번호*' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    {pwdError && <p className="error-text">비밀번호가 틀렸습니다.</p>}

                    <div className='button_container'>
                        <button className='kakao_btn'>
                            <img src={kakao} alt="kakao"/>
                            카카오 로그인
                        </button>
                        <button className='naver_btn'>
                            <img src={naver} alt="naver"/>
                            네이버 로그인
                        </button>
                        <button className='google_btn'>
                            <img src={google} alt="google"/>
                            구글 로그인
                        </button>
                    </div>

                    <button className='user_btn' onClick={handleLogin}>LOGIN</button>

                    <div className='option_content'>
                        <div className='check_field'>
                            <input type='checkbox' className='keep_login'/>
                            <p>로그인 상태 유지</p>
                        </div>
                        <div className='option'>
                            <p className='option_text' onClick={goToFindID}>아이디 / 비밀번호를 잊으셨나요?</p>
                            <p className='option_text' onClick={goToJoin}>회원가입하기</p>
                        </div>
                    </div>

                    <div className='no-member'>
                        <div className='mid_text'>비회원 구매</div>
                        <div className='min_text_ex'>비회원으로도 결제가 가능합니다. 아래 버튼을 눌러 결제를 진행해 주세요.</div>
                    </div>
                    <Link to='/order/delivery/no-member' state={{orderDTO}} >
                        <button className='user_btn'>비회원 구매 진행</button>
                    </Link>
                </div>
            </div>

            <div className='order_content'> </div>       
        </div>
    </div>
  )
}

export default GotoLogin;
