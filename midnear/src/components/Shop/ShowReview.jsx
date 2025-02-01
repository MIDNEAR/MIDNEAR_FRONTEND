import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'; 
import SortMenu from './SortMenu'
import frontImg from '../../assets/img/product/prod1.png'
import backImg from '../../assets/img/product/prod2.png'
import emptyStar from '../../assets/img/product/star.svg'
import fillStar from '../../assets/img/product/fillStar.svg'
import rvDown from '../../assets/img/product/rvDown.svg'
import rvUp from '../../assets/img/product/rvUp.svg'

const ShowReview = () => {
  const [isSelected, setIsSelected] = useState(null);   
  const ref = useRef(null);
  const showComment = (item)=>{
    setIsSelected((prev) => (prev === item ? null : item));
   };
   useEffect(() => {
      const onClick = (e) => {            
        if(ref.current !== null && !ref.current.contains(e.target)){
          setIsSelected(null);
        }
      };
      if(isSelected){
        window.addEventListener("click", onClick);
      }
      return () => {
          window.removeEventListener("click", onClick);
      };
    }, []);
    const transUserId = (userId) => {    
      const firstPart = userId.slice(0, 3); // 앞 3글자
      const lastPart = userId.slice(-2);    // 뒤 2글자
      const maskedPart = '*'.repeat(userId.length - 5); // 가운데 *로 채우기
    
      return `${firstPart}${maskedPart}${lastPart}`;
    };

     const reviewList = [
        { 
          userId: "sbukkki",          
          date: "1일 전",
          star: 5,
          color: "RED",
          size: "M",          
          image: [frontImg, backImg,frontImg, backImg,frontImg],
          comment: "give me a call ~ babe babe ~~",
          owners: ["감사합니다람쥐"]
        },
        { 
            userId: "maedariku",          
            date: "1일 전",
            star: 3,
            color: "RED",
            size: "XL",          
            image: [frontImg, backImg],
            comment: "give me a call ~ babe babe ~~",
            owners: []
          },
      ]
      const allImages = reviewList.flatMap(review => review.image);
      const topImage = allImages.length > 5 ? allImages.slice(0, 4) : allImages;
  return (
    <div className='ShowReview'>
        <p className='title'>상품리뷰</p>
        <div className='all-image'>
          {topImage.map((item, index)=>(
            <img key={index} src={item} className='userImg'/>
          ))}
          {allImages.length > 5 && (
          <Link to=  "/review/images">
            <div className='moreImage'>
                {allImages.length - 4}개<br />더보기
            </div>
          </Link>
        )}
        </div>
        <div className='top-el'>
            <p className='number'>총 {reviewList.length}건</p>
            <div className='sort'>
                <SortMenu />
            </div>
        </div>
        {reviewList.map((item, index)=>(
            <div className='review' key={index}>
                <div className='horizon'></div>
                <div className='nickname'>
                   <p>{transUserId(item.userId)}</p>
                   <p>{item.date}</p>
                </div>
                <div className='star'>
                  {Array.from({length: item.star}).map((_,index)=>
                  <img src={fillStar} key={index} />
                  )}
                  {Array.from({length: 5 - item.star}).map((_,index)=>
                  <img src={emptyStar} key={index} />
                  )}
                </div>
                <div className='buyInfo'>
                   <p>{item.color}</p>
                   <p>.</p>
                   <p>{item.size}</p>
                   <p>구매</p>
                </div>
                <div className='userImgList'>
                   {item.image.map((_, index)=>(
                    <img src={item.image[index]} key={index} className='userImg'/>
                   ))}
                </div>
                <div className='comment'>
                   <p>{item.comment}</p>
                </div>
                <div className='ownersComment' ref={ref}>
                  <div className='top'>
                  <p>댓글 {item.owners.length}</p>
                  {item.owners.length > 0 && (
                    <div>
                    <img src={isSelected === item ? rvUp : rvDown} onClick={() => showComment(item.userId)} />
                   
                    </div>
                  )}
                  </div>
                  <div className='bottom'>                    
                   {isSelected === item.userId && (
                      <p>관리자<br/>{item.owners[0]}</p>
                    )}
                    </div>
                </div>
            </div>
        ))}
        
    </div>
  )
}

export default ShowReview