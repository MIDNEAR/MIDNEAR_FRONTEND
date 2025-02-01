import React, {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileHeader = ({
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
  }) => {
    
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{
      const checkMax =() => {
        setIsMobile(window.innerWidth <= 500);
      };
      checkMax();
      window.addEventListener("resize", checkMax);
      return () => window.removeEventListener("resize", checkMax);
    },[]);
    
    
    const closeHamList = () => {
        setHamOpen(false);
        setActiveSub1(false);  
        setActiveSub2(false); 
        setActiveSubCate1(false); 
        setActiveSubCate2(false);
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
    const toggleCart = () => {
        setIsCartOpen((prev)=>!prev);
    }
    const mobileCart = () => {
        closeHamList();
        toggleCart();
    }
  
    const subVariants = {
        hidden: { y: "-20%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
        exit: { y: "-20%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
     };
      

  return (
    <>
            <div className={`sc1 ${isHamOpen ? 'show' : ''}`}>
                <div className="SHOP">
                    <p className={` ${activeSub1 ? 'bold' : ''}`} onClick={openCate1}>
                        SHOP
                    </p>
                    <AnimatePresence>
                    { activeSub1 && (
                        <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={subVariants}
                        >
                        <div className={`sub ${activeSub1 ? 'display' : ''}`}>
                            <Link to="/shop/all" onClick={closeHamList}>ALL SHOP</Link>
                            <Link to="/shop/new" onClick={closeHamList} >NEW</Link>
                            <div className="newCloth">
                                <p onClick={openSubCate1}>NEW CLOTH</p>
                                <AnimatePresence>
                                { activeSubCate1 && (
                                    <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={subVariants}
                                    className='newCloth-sub'
                                    >
                                        <Link to="/shop/newCloth/all" onClick={closeHamList}>ALL</Link>
                                        <Link to="/shop/newCloth/top" onClick={closeHamList}>TOP</Link>
                                        <Link to="/shop/newCloth/bottom" onClick={closeHamList}>BOTTOM</Link>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>

                            <div className="second">
                                <p onClick={openSubCate2}>SECOND</p>
                                <AnimatePresence>
                                { activeSubCate2 && (
                                    <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={subVariants}
                                    className='second-sub'
                                    >
                                        <Link to="/shop/second/all" onClick={closeHamList}>ALL</Link>
                                        <Link to="/shop/second/top" onClick={closeHamList}>TOP</Link>
                                        <Link to="/shop/second/bottom" onClick={closeHamList}>BOTTOM</Link>
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
                        {activeSub2 && (
                        <motion.div
                        className="sub"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={subVariants}
                        >
                            <Link to="/others/magazine" onClick={closeHamList}>MAGAZINE</Link>
                            <Link to="/others/notice" onClick={closeHamList}>NOTICE</Link>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div  className={`sc2 ${isHamOpen ? 'show' : ''}`}>        
                <p className="SEARCH">SEARCH</p>
                <p className="LOGIN">LOGIN</p>
                <p className="ACCOUNT">ACCOUNT</p>
                <p className="BAG" onClick={mobileCart}>
                  BAG <span>({cartList.length})</span>
                </p>
            </div>
    </>
  );
};

export default MobileHeader