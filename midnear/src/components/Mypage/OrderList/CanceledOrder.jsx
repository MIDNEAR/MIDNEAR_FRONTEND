import React, { useState } from 'react'
import MyPageModal from '../MyPageModal'
import CanceledItem from './CanceledItem'
import search from '../../../assets/img/orderlist/search.svg'
import defaultimage from '../../../assets/img/orderlist/default.svg'
import { Link } from 'react-router-dom'

const CanceledOrder = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState("전체")
  const totalPages = 1

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  };

  const orders = [
    {
      state: "반품 완료",
      date: "2024.12.25 주문",
      image: defaultimage,
      info: "예시 상품입니다.",
      price: "₩ 99,999",
      quantity: 1,
    },
    {
      state: "교환 완료",
      date: "2024.12.25 주문",
      image: defaultimage,
      info: "예시 상품입니다.",
      price: "₩ 99,999",
      quantity: 1,
    },
    {
      state: "취소 진행 중",
      date: "2024.12.25 주문",
      image: defaultimage,
      info: "예시 상품입니다.",
      price: "₩ 99,999",
      quantity: 1,
    },
  ]

  const filteredOrders =
    filter === "전체"
      ? orders
      : orders.filter((order) => order.state.includes(filter));

  return (
    <div className="container">
      <div className="field_container">
        <MyPageModal />
        <div className="field_container_content">
          <div>
            <div className="mypage_title">주문 내역</div>
            <div className="search-bar-order">
              <input
                className="order_search"
                type="text"
                placeholder="주문한 상품을 검색할 수 있어요!"
              />
              <img src={search} className="search-button" alt="search" />
            </div>

            <div className="array_list">
              {["전체", "취소", "반품", "교환"].map((category) => (
                <div
                  key={category}
                  className={`Show_list ${
                    filter === category ? "valid" : ""
                  }`} // 선택된 카테고리에 스타일 적용
                  onClick={() => setFilter(category)}
                >
                  {category} 내역
                </div>
              ))}
            </div>

            {filteredOrders.map((order, index) => (
              <CanceledItem
                key={index}
                className="canceled_order"
                state={order.state}
                date={order.date}
                image={order.image}
                info={order.info}
                price={order.price}
                quantity={order.quantity}
                actions={
                    <Link
                      to="/mypage/orderlist/detail"
                      className="order_detail"
                    >
                      주문 상세보기 &gt;
                    </Link>
                }
              />
            ))}

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
                  className={`page-button ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
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
  )
}

export default CanceledOrder
