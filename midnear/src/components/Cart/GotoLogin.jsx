import React, {useState} from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import kakao from '../../assets/img/user/login/kakao_logo.svg'
import naver from '../../assets/img/user/login/naver_logo.svg'
import google from '../../assets/img/user/login/google_logo.svg'
import StepHeader from './StepHeader';
import OrderList from './OrderList';


const GotoLogin = () => {
    const location = useLocation();
    const addCart = location.state || [];
    console.log(addCart);

    const navigate = useNavigate();

    const goToFindID = () => {
        navigate('/user/find/id');
    };
    
    const goToJoin = () => {
        navigate('/user/join');
    };
    
    const [inputValue, setInputValue] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    
  return (
    <div className='GotoLogin'>
    <StepHeader />
    <div className='container'>
        <div className='empty'></div>

        <div className='login_content'>
                    <div className='login'>
                        <div className='mid_text'>LOGIN</div>
                        <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>
        
                        <input type='text' className='min_text' placeholder='이메일*' />
        
                        <input type='password' className='min_text' placeholder='비밀번호*' />
        
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
        
                        <button className='user_btn'>LOGIN</button>
        
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
                        <Link to='/order/delivery/no-member' state={{addCart}} ><button className='user_btn'>비회원 구매 진행</button></Link>
                    </div>
        </div>
        
        <div className='order_content'> </div>       
        
    </div>
    </div>
  )
}

export default GotoLogin