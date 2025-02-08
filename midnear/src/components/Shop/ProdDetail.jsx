import React, { useState, useEffect } from 'react';
import { color, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import down from '../../assets/img/product/down.svg'
import up from '../../assets/img/product/up.svg'
import ShippingModal from './ShippingModal';
import ShowReview from './ShowReview';

const ProdDetail = () => {
     const DOMAIN = process.env.REACT_APP_DOMAIN;
     const location = useLocation();
     const pageSize = location.state?.items || 1; 
     const params = new URLSearchParams(location.search);
     const colorId = params.get('colorId');

     const [selectSize, setSelectSize] = useState(null); 
     const [isSelected, setIsSelected] = useState(null);     
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [prod, setProd] = useState(null);     
     const [images, setImages] = useState([]);
     const [withItems, setWithItems] = useState([]);
     const [otherColors, setOtherColors] = useState([]);
     const [prodName, setProdName] = useState(null);
     const [size, setSize] = useState([]);
     const [isSale, setIsSale] = useState(false);
     const [isSoldOut, setIsSoldOut] = useState(false);
     const today = new Date();

     const openModal = () => setIsModalOpen(true);
     const closeModal = () => setIsModalOpen(false);
     

     const showDetail = (item)=>{
      setIsSelected((prev) => (prev === item.name ? null : item.name));
     };

     const variants = {
      hidden: { height: 0, opacity: 0 },
      visible: { height: "auto", opacity: 1,  marginBottom: "2.7rem", marginTop: "1rem", zIndex: 1},
      };

     const loadProdDetail = async() => {
        await axios.get(`${DOMAIN}/product/detail`, {
          params: {colorId: colorId},
        })
        .then((res) => {
          if(res.status === 200){
            setProd(res.data.data);
            setImages(res.data.data.images);
            setOtherColors(res.data.data.colors);
            setProdName(res.data.data.productName);

            const findColor = res.data.data.colors.find(color => color.productColorId === Number(colorId));
            if (findColor) {
              const sizeArray = findColor.sizes.map(size => size.size);
              setSize(sizeArray); 
              console.log(findColor.saleStatus);
              if(findColor.saleStatus === "품절"){
                setIsSoldOut(true);
              } else {
                setIsSoldOut(false);
              }
            }

            const discountStartDate = res.data.data.discountStartDate;
            const discountEndDate = res.data.data.discountEndDate;      
            if (discountStartDate === null || discountEndDate === null) {
              setIsSale(false);
            } else {
              const startDate = new Date(discountStartDate);
              const endDate = new Date(discountEndDate);
              if (startDate <= today && endDate >= today) {
                setIsSale(true); 
              } else {
                setIsSale(false);
              }
            }

          };
        })
        .catch((error) => {
          console.error('상품 디테일 로드 실패:', error.response || error.message);
        })
     };

     const coordinates = async() => {
      await axios.get(`${DOMAIN}/product/coordinates`, {
        params: {productColorId: colorId},
      })
      .then((res) => {
        if(res.status === 200){
            setWithItems(res.data.data);
        };
      })
      .catch((error) => {
        console.error('위드 아이템 로드 실패:', error.response || error.message);
      })
     }

     useEffect(() => {
      loadProdDetail();
      coordinates();
     },[colorId]);
    
     const information = [
      {
        name: 'DETAILS',
        content: (<>{prod &&(<>{prod.detail}</>)}</>)
      },
      {
        name: 'SIZE GUIDE',
        content: (<>{prod &&(<>{prod.sizeGuide}</>)}</>)
      },
      {
        name: 'SHIPPING & RETURNS',
        content: (
          <>
          <p className='delivery'>00택배 (1588-3223)</p>
          <p>구매하신 제품은 수령하신 날로부터 7일 이내에 접수해 주셔야 합니다.</p>
          <p className='open-modal' onClick={openModal}>자세히 보기.</p>
          <ShippingModal isOpen={isModalOpen} closeModal={closeModal} />
          </>
          )
      },
      {
        name: 'STYLED WITH',
        content: (
          <>
          <div className='with-item'>
            {withItems[0] !== null ? (
              <>
              {withItems.map((item, index)=>(
              <Link to={`/products/detail?colorId=${item.productColorId}`}  key={index}>
                <img src={item.frontImageUrl} alt='withItem' />
              </Link>
              ))}
              </>
            ): (<p>코디된 상품이 없습니다.</p>)}
          </div>
          </>
        )
      },
      {
        name: 'REVIEW',
        content: ( <> <ShowReview productName={prodName}/> </> )
      }
     ]
     

  return (
    <div className='container'>
      { prod && (
        <div className='prod-detail'>
          <div className='left-img'>
            {images.map((item, index) => (
                <img src={item} alt='image' key={index}/>
            ))}
          </div>
        <div className='right-info'>
          <div className='empty'></div>

          <div className='basic'>
            <div className='info'>
              <p className='name'>{prod.productName}</p>
              <p className={`price ${isSale ? 'display' : ''}`}>&#xffe6; {prod.price.toLocaleString('ko-KR')}</p>
              
              <div className={`discount ${isSale ? 'display' : ''}`}>
                <p className='dc-price'>&#xffe6; {prod.discountPrice.toLocaleString('ko-KR')}</p>
                <p className='coupon'>{prod.discountRate}% 할인가</p>
              </div>
            </div>
            <div className='size'>
              {size.map((item, index)=>(
                <div key={index} className={selectSize === item ? 'bold' : ''} onClick={() => {
                  setSelectSize((prev) => (prev === item ? null : item));
                }}>{item}</div>
              ))}
            </div>
          </div>

          <div className='color'>{prod.currentColor}</div>
          <div className='other-color'>
            {otherColors.map((item, index) => (
              <Link to={`/products/detail?colorId=${item.productColorId}`}  key={index}>
                <img src={item.mainImage} alt='image' />
              </Link>  
            ))}
                      
          </div>

          {/** 기본 display none 해당 상품이 품절 상태면 flex */}
          <div className={`soldout ${isSoldOut ? 'display' : ''}`}>SOLD OUT</div>
          {/** 기본 display flex 해당 상품이 품절 상태면 none */}
          <div className={`box ${isSoldOut ? 'display' : ''}`}>구매하기</div>
          <div className={`box ${isSoldOut ? 'display' : ''}`}>장바구니 담기</div>
          
          <div className='detail-box'>
            {information.map((item, index)=>(
              <div key={index} className='detail' >
                <div className='title'>
                  <p className={`${isSelected === item.name ? 'bold' : ''} ${isSelected === item.name ? 'display' : item.name}`} onClick={()=>showDetail(item)}>{item.name}</p>
                  <img src={isSelected === item.name ? up : down}
                    className={`down ${isSelected === item.name ? 'display' : item.name}`} onClick={()=>showDetail(item)}/>
                </div>
                <motion.div
                    className='content'
                    initial='hidden'
                    animate={isSelected === item.name ? 'visible' : 'hidden'}
                    variants={variants}
                    transition={{duration:0.3}}
                >
                  <div>{item.content}</div>
                </motion.div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default ProdDetail