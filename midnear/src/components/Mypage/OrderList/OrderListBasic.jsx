import React, { useEffect, useRef, useState } from "react";
import MyPageModal from "../MyPageModal";
import OrderItem from "./Orderitem";
import search from "../../../assets/img/orderlist/search.svg";
import defaultimage from "../../../assets/img/orderlist/default.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderListBasic = () => {
  const modalRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortResent, setSortResent] = useState(true)
  const [order, setOrder] = useState([]); 
  const totalPages = 5;
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem("jwtToken");

  const showSuccessModal = () => {
    modalRef.current.openModal(
      "정말 주문취소를 하시겠습니까?",
      "/mypage/orderlist/cancel"
    );
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    console.log(currentPage);
    axios
    .get(`${DOMAIN}/orders/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: currentPage,
        sort: sortResent ? "latest" : "oldest",
      },
    })
    .then((res) => {
      if (res.status === 200 && res.data.success) {
        setOrder(res.data.data || []);
        
      }
    })
    .catch((error) => {
      
    });
  
  }, [DOMAIN, token, currentPage, sortResent]);

  

  return (
    <div className="container">
      <div className="field_container">
        <MyPageModal ref={modalRef} />
        <div className="field_container_content">
          <div>
            <div className="mypage_title">주문 내역</div>
            <div className="search-bar-order">
              <input
                className="order_search"
                type="text"
                placeholder="주문한 상품을 검색할 수 있어요!"
              />
              <img src={search} className="search-button" alt="검색" />
            </div>

            <div className='order_title'
              onClick={() => setSortResent(!sortResent)}>{sortResent ? '최신순' : '오래된순'}
            </div>

            {order.length > 0 ? (
              order.map((item) => (
                <OrderItem
                  key={item.orderId}
                  date={item.orderDate}
                  orderItem={item.userOrderProductCheckDtos || []}
                  actions={
                    <>
                      <Link to={`/mypage/orderlist/detail?orderId=${item.orderId}`} className="order_detail">
                        주문 상세보기 &gt;
                      </Link>
                      <button className="order_option">배송조회</button>
                      {item.state === "배송완료" ? (
                        <Link to="/mypage/orderlist/writingReview" className="order_option">
                          리뷰 작성하기
                        </Link>
                      ) : (
                        <button className="order_option" onClick={showSuccessModal}>
                          주문취소
                        </button>
                      )}
                    </>
                  }
                />
              ))
            ) : (
              <div>주문 내역이 없습니다.</div>
            )}

            <div className="pagination">
              <button
                className="page-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="page-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListBasic;
