import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import frontImg from '../../assets/img/product/prod1.png'
import backImg from '../../assets/img/product/prod2.png'
import down from '../../assets/img/product/down.svg'
import up from '../../assets/img/product/up.svg'
import ShippingModal from './ShippingModal';
import ShowReview from './ShowReview';

const ProdDetail = () => {
     const [selectSize, setSelectSize] = useState(null); 
     const [isSelected, setIsSelected] = useState(null);     
     const [isModalOpen, setIsModalOpen] = useState(false);

     const openModal = () => setIsModalOpen(true);
     const closeModal = () => setIsModalOpen(false);
     

     const showDetail = (item)=>{
      setIsSelected((prev) => (prev === item.name ? null : item.name));
     };

     const variants = {
      hidden: { height: 0, opacity: 0 },
      visible: { height: "auto", opacity: 1,  marginBottom: "2.7rem", marginTop: "1rem", zIndex: 1},
      };

     const dummyList = [
        { 
          id: 1,
          frontImg: frontImg,
          backImg: backImg,
          name: "CUTE SWEATER",
          price: 39000,
          dcPrice: 35100,
          coupon: "10%할인쿠폰적용가",
          soldout: "SOLD OUT"
        },
     ]
     const size = ['S', 'M', 'L', 'XL'];
     const information = [
      {
        name: 'DETAILS',
        content: 'Classic fit shirt in brushed cotton flannel.\n\n\nFeatures a patch pocket,\nfront button closure and topstitching along the seams.\nMidnear stock flag label stitched at the side.\n\n- Longsleeve\n- Collared neckline\n- Buttoned front closure and cuffs\n- Single patch pocket\n- Back yoke\n- Curved hem\n- Classic fit\n- Unisex\n- Material: 100% cotton\n- Imported'
      },
      {
        name: 'SIZE GUIDE',
        content: 'S- 어깨 48 기장 70 소매 64 가슴55\nM- 어깨 48 기장 70 소매 64 가슴55\nL- 어깨 48 기장 70 소매 64 가슴55\nXL- 어깨 48 기장 70 소매 64 가슴55'
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
          <Link to="/products/detail"><img src={dummyList[0].frontImg} /></Link>          
          <Link to="/products/detail"><img src={dummyList[0].backImg} /></Link>
          </div>
          </>
        )
      },
      {
        name: 'REVIEW',
        content: (
        <>
        <ShowReview />
        </>
        )
      }
     ]
     

  return (
    <div className='container'>
      <div className='prod-detail'>
        <div className='left-img'>
          <img src={dummyList[0].frontImg}/>
          <img src={dummyList[0].backImg}/>
        </div>
        <div className='right-info'>
          <div className='empty'></div>

          <div className='basic'>
            <div className='info'>
              <p className='name'>{dummyList[0].name}</p>
              <p className='price'>&#xffe6; {dummyList[0].price.toLocaleString('ko-KR')}</p>
              {/** 기본 display none 해당 상품이 할인 기간일 때 flex */}
               <div className='discount'>
                  <p className='dc-price'>&#xffe6; {dummyList[0].dcPrice.toLocaleString('ko-KR')}</p>
                  <p className='coupon'>{dummyList[0].coupon}</p>
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

          <div className='color'>BLACK</div>
          <div className='other-color'>
            <Link to="/products/detail"><img src={dummyList[0].frontImg} /></Link>          
            <Link to="/products/detail"><img src={dummyList[0].backImg} /></Link>
          </div>

          {/** 기본 display none 해당 상품이 품절 상태면 flex */}
          <div className='soldout'>SOLD OUT</div>
          {/** 기본 display flex 해당 상품이 품절 상태면 none */}
          <div className='box'>구매하기</div>
          <div className='box'>장바구니 담기</div>
          
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
    </div>
  )
}

export default ProdDetail