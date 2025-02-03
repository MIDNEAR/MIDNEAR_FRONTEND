import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    async function loadImage() {
      const DOMAIN = process.env.REACT_APP_DOMAIN;
      await axios.get(`${DOMAIN}/storeManagement/getMainImage`)
      .then((res)=>{
        if(res.status === 200){
          setMainImg(res.data.data.imageUrl);
        } 
      })
      .catch((error) => {
        console.error('이미지 로드 실패:', error.response || error.message);
      })
    }
    loadImage();
  }, []);

  return (
    <div className='container'>
      <div  className="mainImg">
        <img src={mainImg} alt='mainImage'/>
      </div>
    </div>
  )
}

export default Home
