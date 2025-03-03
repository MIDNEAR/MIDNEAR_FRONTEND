import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const Nav = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleCategory = (category) => {
        setActiveCategory((prev) => (prev === category ? null : category));
    };

    const variants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1 },
    };

    return (
        <div className="Nav">
            <div onClick={() => toggleCategory("product")} className={`${activeCategory === "product" ? "display" : "category"}`}>
                <p>상품</p>
            </div>
            <motion.div
                className="content product"
                initial="hidden"
                animate={activeCategory === "product" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/Goods/AddGoods">상품 추가</Link>
                <Link to="/manager/Goods/GoodsManagement">상품 관리</Link>
                <Link to="/manager/Goods/CodyGoods">코디 상품 관리</Link>
                <Link to= '/manager/Goods/Shipping'>SHIPPING & RETURNS</Link>
            </motion.div>

            <div onClick={() => toggleCategory("cuppon")} className={`${activeCategory === "cuppon" ? "display" : "category"}`}>
                <p>쿠폰/포인트 지급관리</p>
            </div>
            <motion.div
                className="content cuppon"
                initial="hidden"
                animate={activeCategory === "cuppon" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/coupon/Point">포인트 지급관리</Link>
                <Link to="/manager/coupon/Coupon">쿠폰 지급관리</Link>
            </motion.div>

            <div onClick={() => toggleCategory("store")} className={`${activeCategory === "store" ? "display" : "category"}`}>
                <p>스토어관리</p>
            </div>
            <motion.div
                className="content store"
                initial="hidden"
                animate={activeCategory === "store" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/store/MainImage">메인화면 이미지 수정</Link>
                <Link to="/manager/store/Logo">로고 수정</Link>
                <Link to="/manager/store/Category">카테고리 관리</Link> 
                <Link to="/manager/store/Delivary">배송비 관리</Link> 
                <Link to="/manager/store/PrivacyPolicy">개인정보처리방침 관리</Link>
                <Link to="/manager/store/Terms">이용약관 관리</Link>
                <Link to="/manager/store/Address">주소 및 사업자 정보 관리</Link>
                <Link to="/manager/store/Privacy">개인정보 수집 및 이용 목적</Link>
            </motion.div>

            <div onClick={() => toggleCategory("graph")} className={`${activeCategory === "graph" ? "display" : "category"}`}>
                <p>통계</p>
            </div>
            <motion.div
                className="content graph"
                initial="hidden"
                animate={activeCategory === "graph" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/statistics/Data">매출 확인</Link>
            </motion.div>

            <div onClick={() => toggleCategory("notice")} className={`${activeCategory === "notice" ? "display" : "category"}`}>
                <p>공지</p>
            </div>
            <motion.div
                className="content notice"
                initial="hidden"
                animate={activeCategory === "notice" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/notice/Notice">공지사항 목록</Link>
                <p>공지사항 작성</p>
            </motion.div>

            <div onClick={() => toggleCategory("magazine")} className={`${activeCategory === "magazine" ? "display" : "category"}`}>
                <p>매거진</p>
            </div>
            <motion.div
                className="content magazine"
                initial="hidden"
                animate={activeCategory === "magazine" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/magazine/magazine">매거진 목록 및 작성</Link>
            </motion.div>

            <div onClick={() => toggleCategory("onebyone")} className={`${activeCategory === "onebyone" ? "display" : "category"}`}>
                <p>1:1문의</p>
            </div>
            <motion.div
                className="content onebyone"
                initial="hidden"
                animate={activeCategory === "onebyone" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/qna/Qna">1:1문의 목록</Link>
            </motion.div>

            <div onClick={() => toggleCategory("sales")} className={`${activeCategory === "sales" ? "display" : "category"}`}>
                <p>판매관리</p>
            </div>
            <motion.div
                className="content sales"
                initial="hidden"
                animate={activeCategory === "sales" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >
                <Link to="/manager/Sales/Search">주문 통합 검색</Link>
                <p>주문확인/배송관리</p>
                <p>구매확정 내역</p>
                <p>취소관리</p>
                <p>반품관리</p>
                <p>무통장결제</p>
                <p>교환관리</p>
            </motion.div>

            <div onClick={() => toggleCategory("block")} className={`${activeCategory === "block" ? "display" : "category"}`}>
                <p>판매 방해 고객관리</p>
            </div>
            <motion.div
                className="content block"
                initial="hidden"
                animate={activeCategory === "block" ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.3 }}
            >

                <Link to="/manager/blockedUsers/BlockedUsers">고객 ID 조회</Link>
                <Link to="/manager/blockedUsers/BlockedUsersList">판매방해 고객 List</Link>

            </motion.div>
        </div>
    );
};

export default Nav;
