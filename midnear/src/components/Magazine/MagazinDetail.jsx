import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import SortMenu from '../Shop/SortMenu'
import search from '../../assets/img/magazine/search.svg'

const MagazinDetail = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const magazineId = params.get('magazineId');
  const [magazine, setMagazine] = useState(null);

  const loadMagazineDetail = async() => {
    await axios.get(`${DOMAIN}/userMagazine/detail`,{
      params: { magazineId },
    })
    .then((res)=>{
      if(res.status === 200){
        const transformedData =  {
          ...res.data.data,
          createdDate: res.data.data.createdDate.replace(/-/g, '. '),
        };
        setMagazine(transformedData);
      } 
    })
    .catch((error) => {
      console.error('매거진 디테일 로드 실패:', error.response || error.message);
    })
  };

  const updateView = async() => {
    await axios.patch(`${DOMAIN}/userMagazine/updateView`, 
      null, 
      {params: {magazineId},}
    )
    .then((res)=>{
      if(res.status === 200){
        console.log('증가 완');
      } 
    })
    .catch((error) => {
      console.error('조회수 증가 실패:', error.response || error.message);
    })
  };

  useEffect(()=>{
    loadMagazineDetail();
    updateView();
  },[magazineId]);

    
  return (
    <div className='M-detail'>
    <div className='Magazine'>
      <div className='container'>

        <div className='top'>
            <div className='title'>MAGAZINE</div>
            <div className='left-el'>
            </div>
        </div>

        <div className='bottom'>
        {magazine && (
            <div className="magazine-detail">
              <h1 className="title">{magazine.title}</h1>
              <p className="date">{magazine.createdDate}</p>
              <div className="magazine-images">
                {magazine.imageUrls.map((item, index) => (
                  <img src={item} className="img1" key={index} alt={`Image ${index + 1}`} />
                ))}
              </div>
              <div className='p-container'>
                <p className="content">{magazine.content}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default MagazinDetail