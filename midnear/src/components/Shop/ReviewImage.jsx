import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import frontImg from '../../assets/img/product/prod1.png'
import backImg from '../../assets/img/product/prod2.png'
import Back from '../../assets/img/product/back.svg'
import Pagination from './Pagination';

const ReviewImage = () => {
      const [limit, setLimit] = useState(8); // 한 페이지 당 보여줄 게시물 개수, 추후에 수정
      const [page, setPage] = useState(1); // 현재 페이지 위치
      const offset = (page -1) * limit; // 현재 페이지의 첫 번째 게시물 오프셋
      const navigate = useNavigate();

      const reviewList = [
              { 
                userId: "sbukkki",          
                date: "1일 전",
                star: "5",
                color: "RED",
                size: "M",          
                image: [frontImg, backImg],
                comment: "give me a call ~ babe babe ~~"
              },
              { 
                  userId: "maedariku",          
                  date: "1일 전",
                  star: " ",
                  color: "RED",
                  size: "XL",          
                  image: [frontImg, backImg],
                  comment: "give me a call ~ babe babe ~~"
                },
                { 
                  userId: "hangyodong",          
                  date: "3일 전",
                  star: " ",
                  color: "RED",
                  size: "M",          
                  image: [frontImg],
                  comment: "give me a call ~ babe babe ~~"
                },
                { 
                  userId: "helloworld",          
                  date: "3일 전",
                  star: " ",
                  color: "RED",
                  size: "M",          
                  image: [frontImg, backImg,frontImg, backImg,frontImg, backImg,frontImg, backImg,frontImg, backImg],
                  comment: "give me a call ~ babe babe ~~"
                },
            ]
            const allImages = reviewList.flatMap(review => review.image);

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
              {allImages.slice(offset, offset + limit).map((it, index)=>(
                  <div key={index} className='image-box' >
                      <img src={it} className='image'/>
                  </div>
              ))}
          </div>
          <Pagination total={allImages.length} limit={limit} page={page} setPage={setPage} />
      </div>
    </div>
    </div>
  )
}

export default ReviewImage