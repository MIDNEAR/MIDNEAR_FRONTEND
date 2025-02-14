import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Home = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const [mainImg, setMainImg] = useState(null);
  const [popup, setPopup] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      const checkMax = () => {
        setIsMobile(window.innerWidth <= 500);
      };
      checkMax();
      window.addEventListener("resize", checkMax);
      return () => window.removeEventListener("resize", checkMax);
    }, []);

  // 메인 이미지 불러오기
  const loadImage = () => {
    axios.get(`${DOMAIN}/storeManagement/getMainImage`)
    .then((res)=>{
      if(res.status === 200){
        setMainImg(res.data.data.imageUrl);
      } 
    })
    .catch((error) => {
      console.error('이미지 로드 실패:', error.response || error.message);
    })  
  }
  // 공지 팝업 띄우기
  const loadPopup = () => {
    axios.get(`${DOMAIN}/notice/popupImages`)
    .then((res)=>{
      if(res.status === 200){
        const hiddenPopups = getHiddenPopups();
        const filteredPopups = res.data.data.filter(item => !hiddenPopups.includes(item.noticeId));
        setPopup(filteredPopups);
      } 
    })
    .catch((error) => {
      console.error('팝업 로드 실패:', error.response || error.message);
    })  
  }

  useEffect(() => {
    loadImage();
    loadPopup();
  }, []);

  // 팝업 닫기
  const closePopup = (noticeId) => {
    setPopup((prev) => prev.filter((item) => item.noticeId !== noticeId));
  };
  // 하루동안 닫기
  const hideForToday = (noticeId) => {
    const storedData = JSON.parse(localStorage.getItem("hiddenPopups")) || [];
    storedData.push({ noticeId, timestamp: Date.now() }); // 현재 시간 저장
    localStorage.setItem("hiddenPopups", JSON.stringify(storedData));
    closePopup(noticeId);
  }
  // 스토리지에 저장된 팝업
  const getHiddenPopups = () => {
    const storedData = JSON.parse(localStorage.getItem("hiddenPopups")) || [];
    const now = Date.now();
    const validData = storedData.filter(item => now - item.timestamp < 86400000);
    localStorage.setItem("hiddenPopups", JSON.stringify(validData)); // 유효한 데이터만 다시 저장
    return validData.map(item => item.noticeId);
  }


  return (
    <div className='container'>
      <div  className="mainImg">
        <img src={mainImg} alt='mainImage'/>
      </div>
      {popup && (
        <div className='popup-container'>
        {popup.map((item)=>(
         <div className='popup' key={item.noticeId} 
         style={isMobile ? {} : { top: `${item.noticeId * 20}px`, left: `${item.noticeId * 20}px` }} >
            <div  className='popup-img'>
            <Link to={`/others/notice/detail?noticeId=${item.noticeId}`}>     
              <img src={item.imageUrl}/>
            </Link>
            </div>
            <div className='outer'>
              <p className='txt'>미드니어 공지사항</p>
              <div className='bottom'>
                <p onClick={() => hideForToday(item.noticeId)}>오늘 하루동안 보지 않기</p>
                <p onClick={() => closePopup(item.noticeId)}>닫기</p>
              </div>
            </div>
         </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default Home
