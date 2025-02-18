import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios';
import Back from '../../assets/img/product/back.svg'
import Pagination from './Pagination';

const ReviewImage = () => {
      const DOMAIN = process.env.REACT_APP_DOMAIN;
      const location = useLocation();
      const { imageCount } = location.state || {}; 
      const params = new URLSearchParams(location.search);
      const productName = params.get('productName');
      const [currPage, setCurrPage] = useState(1); // 현재 페이지 위치
      const navigate = useNavigate();
      const [images, setImages] = useState([]);
      const loadReviewImage = async(pageNumber = 1) => {
        await axios.get(`${DOMAIN}/review/gathering`, {
          params: {
            productName: productName,
            pageNumber,
          },
        })
        .then((res) => {
          if(res.status === 200){
            setImages(res.data.data);
          };
        })
        .catch((error) => {
          console.error('이미지 모아보기 로드 실패:', error.response || error.message);
        })
      };
    
     useEffect(()=>{
      loadReviewImage(currPage);
     },[currPage, productName]);
            
  return (
    <div className='container'>
    <div className='ReviewImage'>
      <div className='top-el'>
        <div>
          <img src={Back} className='back-btn' onClick={()=>navigate(-1)}/>
          <h2 className='title'>돌아가기</h2>
        </div>
        <p>리뷰 이미지 모아보기</p>
      </div>

      <div className='bottom-el'>
          <div className='all-imgList'>
              {images.map((it, index)=>(
                  <div key={index} className='image-box' >
                      <img src={it} className='image'/>
                  </div>
              ))}
          </div>
          <Pagination total={imageCount} limit={4} page={currPage} setPage={setCurrPage} />
      </div>
    </div>
    </div>
  )
}

export default ReviewImage