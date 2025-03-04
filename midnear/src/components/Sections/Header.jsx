import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import logo from "../../assets/img/logo/header_logo.svg";
import Login from '../User/Login';
import ShoppingCart from '../Cart/ShoppingCart';
import ham from '../../assets/img/main_img/ham.svg'
import close from '../../assets/img/product/close.svg'
import MobileHeader from './MobileHeader';
import { AuthContext } from "../../action/authContext";
import axios from 'axios';


const Header = ({ onLinkClick }) => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const location = useLocation();
  const [activeSub1, setActiveSub1] = useState(false);
  const [activeSub2, setActiveSub2] = useState(false);
  const [activeSubCate1, setActiveSubCate1] = useState(false);
  const [activeSubCate2, setActiveSubCate2] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHamOpen, setHamOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [logo, setLogo] = useState('');
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('jwtToken');
  const [userInfo, setUserInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userInfo')) || {};
    } catch (error) {
      console.error("userInfo JSON 파싱 오류:", error);
      return {};
    }
  });


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

  const logout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    window.dispatchEvent(new Event("storage"));
  
    goHome();
  }

  const goHome = () => {
    navigate('/');
  };


  const fetchlogo = () => {
    axios
      .get(`${DOMAIN}/storeManagement/getLogoImage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLogo(response.data.data.imageUrl)
        }
      })
      .catch((error) => {

      });
  }
  const fetchCate = () => {
    axios
      .get(`${DOMAIN}/productManagement/categories`,)
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
      });
  };


  const openCate2 = () => {
    setActiveSub2(!activeSub2);
  };


  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  useEffect(() => {
    setShowLoginModal(false);
    fetchlogo();
    fetchCate();
    
  }, [location.pathname, isAuthenticated]);


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
  }, [navigate]);

  const mobileCart = () => {
    closeHamList();
    toggleCart();
  }
  const loadCart = () => {
    axios.get(`${DOMAIN}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setCartList(res.data.data);
      };
    })
    .catch((error) => {
      console.log('사용 중인 토큰:', token);

      console.error('장바구니 로드 실패:',error.response ||  error.message);
    });
  };

  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, [token]);


  const [activeSub, setActiveSub] = useState({});

  const toggleOpen = (categoryId) => {
    setActiveSub((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className='header-container'>
      <div className={`header ${isHamOpen ? 'border' : ''}`}>

        <div className='mobile-header'>
          <div className={`logo ${isHamOpen ? 'show' : ''}`} >
            <img src={logo} alt="logo" onClick={goHome} />
            {isAuthenticated && userInfo?.id === 'admin' && (
              <p className='gomanager' onClick={() => navigate('/manager/Goods/AddGoods')}>
                관리자페이지로
              </p>
            )}
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

              <div className="SHOP">
                {categories.map((category) => (
                  <div className="sub display" key={category.categoryId}>
                    <p
                      onClick={() => toggleOpen(category.categoryId)}
                      className={`sub_title ${activeSub[category.categoryId] ? "bold" : ""}`}
                    >
                      {category.name}
                    </p>
                    <div className="category-item">
                      <div className={`sub ${activeSub[category.categoryId] ? "display" : "close"}`}>
                        {category.children.map((sub) => (
                          <div key={sub.categoryId}>
                            <Link
                              to={`/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`}
                            >
                              {sub.name}
                            </Link>

                            {sub.children && sub.children.length > 0 && (
                              <div className="sub-children">
                                {sub.children.map((child) => (
                                  <Link
                                    key={child.categoryId}
                                    to={`/${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${child.name.toLowerCase()}`}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

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
              <Link to={`${isAuthenticated ? '/mypage/userinformaiton/confirm' : '/noauth'}`}>MY</Link>
              {isAuthenticated ? <p onClick={logout}>LOGOUT</p> : <p className="LOGIN" onClick={toggleLoginModal}>
                LOGIN
              </p>}

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
          {isMobile && isHamOpen && (
            <motion.div
              className={`sc-container2 ${isHamOpen ? 'show' : ''}`}
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
              <ShoppingCart toggleCart={toggleCart} cartList={cartList} isCartOpen={isCartOpen} loadCart={loadCart} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;