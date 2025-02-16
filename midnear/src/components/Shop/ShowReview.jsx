import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'; 
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import emptyStar from '../../assets/img/product/star.svg'
import fillStar from '../../assets/img/product/fillStar.svg'
import rvDown from '../../assets/img/product/rvDown.svg'
import rvUp from '../../assets/img/product/rvUp.svg'

const ShowReview = ({productName}) => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const useref = useRef(null);
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);
  const [isSelected, setIsSelected] = useState(null);   
  const [isMobile, setIsMobile] = useState(false);
  const [reviewObj, setReviewObj] = useState({});
  const [reviews, setReviews] = useState([]);
  const [allImages,setAllImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const today = new Date();
  
  const loadReview = () => {
    axios.get(`${DOMAIN}/review/byProduct`, {
      params: {
        productName,
        pageNumber: page,
      },
    })
    .then((res) => {
      if(res.status === 200){
        const addReview = res.data.data.reviewList;
        setReviewObj(res.data.data);
        setReviews((prev)=>[...prev, ...addReview]);
        setPage((page) => page + 1);
        setAllImages(res.data.data.allReviewImages);
        setImageCount(res.data.data.imageReviewCount);
      };
    })
    .catch((error) => {
      console.log(productName);
      console.error('리뷰 로드 실패:', error.response || error.message);
    })
  };

  useEffect(()=>{
    if(inView){
      loadReview();
    }
  },[inView, productName]);
  
  useEffect(()=>{
      const checkMax =() => {
        setIsMobile(window.innerWidth <= 500);
        };
        checkMax();
        window.addEventListener("resize", checkMax);
        return () => window.removeEventListener("resize", checkMax);
  },[]);

  const showComment = (item)=>{
    setIsSelected((prev) => (prev === item ? null : item));
  };
  useEffect(() => {
    const onClick = (e) => {            
      if(useref.current !== null && !useref.current.contains(e.target)){
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
    const firstPart = userId.slice(0, 3); 
    const lastPart = '*'.repeat(userId.length - 3);  
    return `${firstPart}${lastPart}`;
  };
  const topImage = imageCount > 5 ? allImages.slice(0, 4) : allImages;
  const mobileTopImage = imageCount > 3 ? allImages.slice(0,2) : allImages;

  const diffDays = (createdDate) => {
    const created = new Date(createdDate);
    const diffTime = today - created;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className='ShowReview'>
        <p className='title'>상품리뷰</p>
        <div className='all-image'>
          {!isMobile && (
              <>
                {topImage.map((item, index)=>(
                  <img key={index} src={item} className='userImg'/>
                ))}
                {reviewObj.imageReviewCount > 5 && (
                <Link to={`/review/images?productName=${productName}`} state={{totalImage: allImages}}>
                  <div className='moreImage'>
                      {reviewObj.imageReviewCount - 4}개<br />더보기
                  </div>
                </Link>
                )}
              </>
            )}
            {isMobile && reviewObj.imageReviewCount > 3 && (
              <>
                {mobileTopImage.map((item, index)=>(
                  <img key={index} src={item} className='userImg'/>
                ))}
                {reviewObj.imageReviewCount > 3 && (
                <Link to={`/review/images?productName=${productName}`} state={{totalImage: allImages}}>
                  <div className='moreImage'>
                  {reviewObj.imageReviewCount - 2}개<br />더보기
                  </div>
                </Link>
                )}
              </>
            )}
        </div>
        <div className='top-el'>
            <p className='number'>총 {reviewObj.reviewCount}건</p>
            <div className='sort'>
                <p>최신순</p>
            </div>
        </div>
        {reviewObj.reviewCount === 0 ? (
          <p>리뷰가 없습니다.</p>
        ) : (
            <>            
            {reviews.map((item, index)=>(
                <div className='review' key={index}>
                    <div className='horizon'></div>
                    <div className='nickname'>
                      <p>{transUserId(item.id)}</p>
                      <p>{diffDays(item.created)}일 전</p>
                    </div>
                    <div className='star'>
                      {Array.from({length: item.rating}).map((_,index)=>
                      <img src={fillStar} key={index} />
                      )}
                      {Array.from({length: 5 - item.rating}).map((_,index)=>
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
                      {item.imagesPerReview.map((_, index)=>(
                        <img src={item.imagesPerReview[index]} key={index} className='userImg'/>
                      ))}
                    </div>
                    <div className='comment'>
                      <p>{item.comment}</p>
                    </div>
                    <div className='ownersComment' ref={useref}>
                      <div className='top'>
                      <p>댓글 {item.isReply}</p>
                      {item.isReply > 0 && (
                        <div>
                        <img src={isSelected === item ? rvUp : rvDown} onClick={() => showComment(item.userId)} />
                      
                        </div>
                      )}
                      </div>
                      <div className='bottom'>                    
                      {isSelected === item.userId && (
                          <p>관리자<br/>{item.comment}</p>
                        )}
                        </div>
                    </div>
                </div>
              ))}
              <div ref={ref}></div>
            </>
          )}        
    </div>
  )
}

export default ShowReview