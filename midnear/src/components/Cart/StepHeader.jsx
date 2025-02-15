import React, {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'; 
import axios from 'axios';
import Header from '../Sections/Header';

const StepHeader = () => {  
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');

  const navigate = useNavigate();
  const [logo, setLogo] = useState('');

  const goHome = () => {
    navigate('/'); 
  };
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
      const checkMax =() => {
        setIsMobile(window.innerWidth <= 500);
      };
      checkMax();
      window.addEventListener("resize", checkMax);
      return () => window.removeEventListener("resize", checkMax);
  },[]);

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
  useEffect(()=>{
    fetchlogo();
  })
  
  return (
    <div className='step-header'>
        <div className="header2">
            <div className="logo2" onClick={goHome}>
                <img src={logo} alt="logo" />
            </div>

            <div className='center'>
                <div className='title'>결제</div> 
                <div className='step'>
                    <p className='login'>[1] 로그인</p>
                    <p className='delivery-info'>[2] 배송정보</p>
                    <p className='pay'>[3] 결제완료</p>
                </div>
                <div className='title'></div>
            </div>

            <div className='continue'><p onClick={goHome}>쇼핑 계속하기</p></div>
            {isMobile && (
              <Header/>
            )}
        </div>
    </div>
  )
}

export default StepHeader