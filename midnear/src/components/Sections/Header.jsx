import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../assets/img/logo/header_logo.svg";
import Login from '../User/Login';
import ShoppingCart from '../Cart/ShoppingCart';
import frontImg from '../../assets/img/product/prod1.png'
import ham from '../../assets/img/main_img/ham.svg'
import close from '../../assets/img/product/close.svg'
import MobileHeader from './MobileHeader';


const Header = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSub1, setActiveSub1] = useState(false);
  const [activeSub2, setActiveSub2] = useState(false);
  const [activeSubCate1, setActiveSubCate1] = useState(false);
  const [activeSubCate2, setActiveSubCate2] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    }
  ]);
  const subStates = {
    activeSub1,
    setActiveSub1,
    activeSub2,
    setActiveSub2,
    activeSubCate1,
    setActiveSubCate1,
    activeSubCate2,
    setActiveSubCate2,
    cartList,
    isCartOpen,
    setIsCartOpen,
    showLoginModal,
    setShowLoginModal,
    isHamOpen,
    setHamOpen,
  };


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

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  useEffect(() => {
    setShowLoginModal(false);
  }, [location.pathname]);


  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  }

  const cartVariants = {
    hidden: { x: "43.7rem" },
    visible: { x: 0 },
    exit: { x: "43.7rem", transition: { duration: 1, ease: "easeInOut" } }
  };
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  };
  const hamVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
  };


  const openHamList = () => {
    setHamOpen(true);
  };
  const closeHamList = () => {
    setHamOpen(false);
    setActiveSub1(false);
    setActiveSub2(false);
    setActiveSubCate1(false);
    setActiveSubCate2(false);
  };

  useEffect(() => {
    const checkMax = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    checkMax();
    window.addEventListener("resize", checkMax);
    return () => window.removeEventListener("resize", checkMax);
  }, []);

  const mobileCart = () => {
    closeHamList();
    toggleCart();
  }
  return (
    <div className='header-container'>
      <div className={`header ${isHamOpen ? 'border' : ''}`}>

        <div className='mobile-header'>
          <div className={`logo ${isHamOpen ? 'show' : ''}`} onClick={goHome}>
            <img src={logo} alt="logo" />
          </div>
          <div className={`open-ham ${isHamOpen ? 'show' : ''}`} >
            <div className={`close ${isHamOpen ? 'show' : ''}`} onClick={closeHamList}>
              <img src={close} alt='close' />
            </div>
            <div className='hamBar' onClick={openHamList}>
              <img src={ham} alt='ham' />
            </div>
          </div>
        </div>


        {!isMobile && (
          <div className='sc-container'>
            <div className="sc1">

              <div className="SHOP" onClick={openCate1}>
                <p className={`sub_title ${activeSub1 ? 'bold' : ''}`}>
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

              <div className="OTHERS" onClick={openCate2}>
                <p className={`sub_title ${activeSub2 ? 'bold' : ''}`} >
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
              <p className="LOGIN" onClick={toggleLoginModal}>
                LOGIN
              </p>
              <Link to='/user/join' className="ACCOUNT">ACCOUNT</Link>
              <p className="BAG" onClick={toggleCart}>
                BAG <span>({cartList.length})</span>
              </p>
            </div>
            {showLoginModal && (
              <Login onClose={toggleLoginModal} />
            )}
          </div>
        )}

        <AnimatePresence>
          {isHamOpen && isMobile && (
            <motion.div
              className="sc-container"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={hamVariants}
            >
              <MobileHeader {...subStates} mobileCart={mobileCart} toggleCart={toggleCart} onLinkClick={onLinkClick} />
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
              <ShoppingCart toggleCart={toggleCart} cartList={cartList} isCartOpen={isCartOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;