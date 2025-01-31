import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import {motion, AnimatePresence} from 'framer-motion';
import logo from "../../assets/img/logo/header_logo.svg";
import ShoppingCart from '../Cart/ShoppingCart';
import frontImg from '../../assets/img/product/prod1.png'
import ham from '../../assets/img/main_img/ham.svg'
import close from '../../assets/img/product/close.svg'

const Header = () => {
  const navigate = useNavigate();
  const [activeSub1, setActiveSub1] = useState(false);
  const [activeSub2, setActiveSub2] = useState(false);
  const [activeSubCate1, setActiveSubCate1] = useState(false);
  const [activeSubCate2, setActiveSubCate2] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHamOpen, setHamOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartList, setCartList] = useState([
    {
      id: 1,
      frontImg: frontImg,
      name: "CUTE SWEATER",
      price: 39000,
      dcPrice: 35100,
      color: "BLACK",
      size: "M",
      count: 2,
    },
  ]);

  const goHome = () => {
     navigate('/'); 
  };

  const openCate1 = () => {
    setActiveSub1(!activeSub1);
  };


  const openCate2 = () => {
    setActiveSub2(!activeSub2);
  };
  const openSubCate1 = () => {
    setActiveSubCate1(!activeSubCate1);
  };
  const openSubCate2 = () => {
    setActiveSubCate2(!activeSubCate2);
  };

  const toggleCart = () => {
    setIsCartOpen((prev)=>!prev);
  }

  const cartVariants = {
    hidden: { x: "43.7rem" },
    visible: { x: 0 },
    exit: { x: "43.7rem",  transition: { duration: 1, ease: "easeInOut" }  } 
  };
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const toggleHamList = () => {
    setHamOpen(!isHamOpen);
    setActiveSub1(false);  
    setActiveSub2(false); 
    setActiveSubCate1(false); 
    setActiveSubCate2(false);
  };

  const hamVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
  }
  const subVariants = {
    hidden: { y: "-20%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { y: "-20%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
  }

  useEffect(()=>{
    const checkMax =() => {
      setIsMobile(window.innerWidth <= 500);
    };
    checkMax();
    window.addEventListener("resize", checkMax);
    return () => window.removeEventListener("resize", checkMax);
},[]);


  return (
    <div className='header-container'>
    <div className={`header ${isHamOpen ? 'border' : ''}`}>

      <div className='mobile-header'>
      <div className={`logo ${isHamOpen ? 'show' : ''}`} onClick={goHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={`close ${isHamOpen ? 'show' : ''}`} onClick={toggleHamList}>
        <img src={close} alt='close' />
      </div>
      <div className='hamBar' onClick={toggleHamList}>
        <img src={ham} alt='ham' />
      </div>
      </div>

      
      <AnimatePresence>
        {!isMobile && (
          <div className='sc-container'>
            <div className="sc1">

              <div className="SHOP">
                <p className={` ${activeSub1 ? 'bold' : ''}`} onClick={openCate1}>
                  SHOP
                </p>
                <div className={`sub ${activeSub1 ? 'display' : ''}`}>
                  <Link to="/shop/all">ALL SHOP</Link>
                  <Link to="/shop/new">NEW</Link>
                  <div className="newCloth">
                      <p onClick={openSubCate1}>NEW CLOTH</p>
                      <div className={`newCloth-sub ${activeSubCate1 ? 'display' : ''}`}>
                        <Link to="/shop/newCloth/all">ALL</Link>
                        <Link to="/shop/newCloth/top">TOP</Link>
                        <Link to="/shop/newCloth/bottom">BOTTOM</Link>
                      </div>
                  </div>
                  <div className="second">
                    <p onClick={openSubCate2}>SECOND</p>
                    <div className={`second-sub ${activeSubCate2 ? 'display' : ''}`}>
                      <Link to="/shop/second/all">ALL</Link>
                      <Link to="/shop/second/top">TOP</Link>
                      <Link to="/shop/second/bottom">BOTTOM</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="OTHERS">
                <p className={` ${activeSub2 ? 'bold' : ''}`} onClick={openCate2}>
                  OTHERS
                </p>
                <div className={`sub ${activeSub2 ? 'display' : ''}`}>
                  <Link to="/others/magazine">MAGAZINE</Link>
                  <Link to="/others/notice">NOTICE</Link>
                </div>
              </div>
            </div>
            
            <div className="sc2">
              <p className="SEARCH">SEARCH</p>
              <p className="LOGIN">LOGIN</p>
              <p className="ACCOUNT">ACCOUNT</p>
              <p className="BAG" onClick={toggleCart}>
                BAG <span>({cartList.length})</span>
              </p>
            </div>
            </div>
        )}
        {isHamOpen && isMobile && (
        <motion.div
          className="sc-container"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={hamVariants}
        >
          <div className={`sc1 ${isHamOpen ? 'show' : ''}`}>
            <div className="SHOP">
              <p className={` ${activeSub1 ? 'bold' : ''}`} onClick={openCate1}>
                SHOP
              </p>
              <AnimatePresence>
              {isMobile && activeSub1 && (

                <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={subVariants}
                >
                  <div className={`sub ${activeSub1 ? 'display' : ''}`}>
                    <Link to="/shop/all" onClick={toggleHamList}>ALL SHOP</Link>
                    <Link to="/shop/new" onClick={toggleHamList} >NEW</Link>
                    <div className="newCloth">
                        <p onClick={openSubCate1}>NEW CLOTH</p>
                        <AnimatePresence>
                        {isMobile && activeSubCate1 && (
                          <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={subVariants}
                          className='newCloth-sub'
                          >
                            <Link to="/shop/newCloth/all" onClick={toggleHamList}>ALL</Link>
                            <Link to="/shop/newCloth/top" onClick={toggleHamList}>TOP</Link>
                            <Link to="/shop/newCloth/bottom" onClick={toggleHamList}>BOTTOM</Link>
                          </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <div className="second">
                      <p onClick={openSubCate2}>SECOND</p>
                      <AnimatePresence>
                      {isMobile && activeSubCate2 && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={subVariants}
                          className='second-sub'
                        >
                          <Link to="/shop/second/all" onClick={toggleHamList}>ALL</Link>
                          <Link to="/shop/second/top" onClick={toggleHamList}>TOP</Link>
                          <Link to="/shop/second/bottom" onClick={toggleHamList}>BOTTOM</Link>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
            <div className="OTHERS">
          <p className={` ${activeSub2 ? 'bold' : ''}`} onClick={openCate2}>
            OTHERS
          </p>
          <AnimatePresence>
            {isMobile && activeSub2 && (
            <motion.div
            className="sub"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={subVariants}
            >
              <Link to="/others/magazine" onClick={toggleHamList}>MAGAZINE</Link>
              <Link to="/others/notice" onClick={toggleHamList}>NOTICE</Link>
            </motion.div>
            )}
            </AnimatePresence>
        </div>

          </div>
          <div  className={`sc2 ${isHamOpen ? 'show' : ''}`}>        
            <p className="SEARCH">SEARCH</p>
            <p className="LOGIN">LOGIN</p>
            <p className="ACCOUNT">ACCOUNT</p>
            <p className="BAG" onClick={toggleCart}>
              BAG <span>({cartList.length})</span>
            </p>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <>
          <motion.div
            className="ShoppingCart"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backgroundVariants}
          />
          <motion.div
          className={`cart_content ${isCartOpen ? 'open' : ''}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cartVariants}
            transition={{ type: "tween", duration: 1, }} 
          >
            <ShoppingCart toggleCart={toggleCart} cartList={cartList}  />
          </motion.div>
          </>
        )}        
      </AnimatePresence>
    </div>
  );
};

export default Header;