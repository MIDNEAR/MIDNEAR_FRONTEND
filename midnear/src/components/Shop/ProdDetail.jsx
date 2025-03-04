import React, { useState, useEffect } from 'react';
import { color, motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import down from '../../assets/img/product/down.svg'
import up from '../../assets/img/product/up.svg'
import ShippingModal from './ShippingModal';
import ShowReview from './ShowReview';
import Login from '../User/Login';

const ProdDetail = () => {
     const DOMAIN = process.env.REACT_APP_DOMAIN;
     const token = localStorage.getItem('jwtToken');
     const navigate = useNavigate();
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
     const [errorMessage, setErrorMessage] = useState('');  
     const [showLoginModal, setShowLoginModal] = useState(false);
     const [modalContent, setModalContent] = useState(false);
     const [orderDTO, setOrderDTO] = useState([]);
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

     // 상품 정보 로드 
     const loadProdDetail = () => {
        axios.get(`${DOMAIN}/product/detail`, {
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
            const orderItem = {
              productColorId: colorId,
              productName: res.data.data.productName,
              imageUrl: res.data.data.images[0],
              price: res.data.data.price,
              discountPrice: res.data.data.discountPrice,
              discountRate: res.data.data.discountRate,
              discountStartDate: res.data.data.discountStartDate,
              discountEndDate: res.data.data.discountEndDate,
              currentColor: res.data.data.currentColor,
              size: null, 
              quantity: 1, 
              deliveryCharge: 0,
              couponDiscount: 0,
              pointDiscount: 0,
            };
            setOrderDTO([orderItem]);
          };
        })
        .catch((error) => {
          
        })
     };
     // 같이 코디된 상품
     const coordinates = () => {
      axios.get(`${DOMAIN}/product/coordinates`, {
        params: {productColorId: colorId},
      })
      .then((res) => {
        if(res.status === 200){
            setWithItems(res.data.data);
        };
      })
      .catch((error) => {
        
      })
     }

    useEffect(() => {
      loadProdDetail();
      coordinates();
    },[colorId]);
    // 사이즈 선택
    const handleSizeClick = (item) => {
      const newSize = selectSize === item ? null : item;
      setSelectSize(newSize);  
      if (newSize !== null) {
        setErrorMessage('');
      }
      setOrderDTO((prev) => 
        prev.map((order, index) => 
          index === 0 ? { ...order, size: newSize } : order
        )
      );
    };
    
    const addShoppingCart = () => {
      axios.post(`${DOMAIN}/cart/add`,null,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {      
          productColorId: colorId,
          quantity: orderDTO[0].quantity,
          size: orderDTO[0].size,
        }
      })
      .then((res) => {
        if(res.status === 200){
          
          window.location.reload();
        };
      })
      .catch((error) => {
        
      });
    };
    
    const toggleLoginModal = () => {
      setShowLoginModal(!showLoginModal);
    };
    
    useEffect(() => {
      setShowLoginModal(false);
    }, [location.pathname]);

    const handleButtonClick = (action) => {
      if (selectSize === null) {
        setErrorMessage('상품을 선택해주세요'); 
      } else {
        setErrorMessage('');   

        if (!token) {
          if (action === 'buy') {
            navigate('/order/login', {state: orderDTO}); 
          } else if (action === 'cart') {
            toggleLoginModal();
          }
        } else {
          if (action === 'buy') {
            navigate('/order/delivery/member', {state: orderDTO});
          } else if (action === 'cart') {
            addShoppingCart(); 
          }
        }
      }
    };
    // 배송 반품 모달
    const loadShippingModal = () => {
       axios.get(`${DOMAIN}/productManagement/shippingReturns`)
      .then((res) => {
        if(res.status === 200){
          setModalContent(res.data.data);
        };
      })
      .catch((error) => {
        
      })
  };
  useEffect(()=>{
    loadShippingModal();
  },[]);

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
          <p className='delivery'>{modalContent.shippingInfo}</p>
          <p>{modalContent.shippingNotice}</p>
          <p className='open-modal' onClick={openModal}>자세히 보기.</p>
          <ShippingModal isOpen={isModalOpen} closeModal={closeModal} content={modalContent.shippingReturnsPolicy} />
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
    ];
     

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
                <div key={index} className={selectSize === item ? 'bold' : ''} onClick={() => handleSizeClick(item)}>{item}</div>
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
          <div className={`box ${isSoldOut ? 'display' : ''}`} onClick={() => handleButtonClick('buy')}>구매하기</div>
          <div className={`box ${isSoldOut ? 'display' : ''}`} onClick={() => handleButtonClick('cart')}>장바구니 담기</div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {showLoginModal && (
              <Login onClose={toggleLoginModal} />
            )}
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