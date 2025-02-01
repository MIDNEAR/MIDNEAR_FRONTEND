import React, { useState } from 'react'
import MyPageModal from '../MyPageModal'
import search from '../../../assets/img/orderlist/search.svg'
import lock from '../../../assets/img/orderlist/lock.svg'
import { Link } from 'react-router-dom'

const AskedList = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const inquiries = [
    { id: 1, title: '고민이 있는데요', date: '2022.12.22', isLocked: true },
    { id: 2, title: '고민이 뭘까요', date: '2022.12.22', isLocked: false },
    { id: 3, title: '옷이 작아요', date: '2022.12.22', isLocked: false },
    { id: 4, title: '옷이 커요', date: '2022.12.22', isLocked: false },
    { id: 5, title: '왜 전화 안받으세요', date: '2022.12.22', isLocked: false },
    { id: 6, title: '왜 답글 안달아주세요', date: '2022.12.22', isLocked: false },
    { id: 7, title: '고민상담이에요', date: '2022.12.22', isLocked: false },
    { id: 8, title: '고민중독', date: '2022.12.22', isLocked: false },
    { id: 9, title: '고민고민하지마', date: '2022.12.22', isLocked: false },
    { id: 10, title: '문의 나문의 나문희 나문희의 첫사랑.', date: '2022.12.22', isLocked: false },
    { id: 11, title: '문의 내용', date: '2022.12.22', isLocked: false },
    { id: 12, title: '나문희의 첫사랑.', date: '2022.12.22', isLocked: false },
    { id: 13, title: '지금 문의해도 되나요.', date: '2022.12.22', isLocked: false },
    { id: 14, title: '아니면 문희해도 되나요.', date: '2022.12.22', isLocked: false }
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);

  const filteredInquiries = inquiries.filter((inquiry) =>
    inquiry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='container'>
        <div className='field_container'>
            <MyPageModal />
            <div className='field_container_content'>
            <div className="inquiry-list-container">
                <h2>고객지원/1:1문의</h2>
                <div className='search-bar-container'>
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="검색"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img src={search} className="search-button" />
                  </div>
                </div>

                <ul className="inquiry-list">
                  {paginatedInquiries.map((inquiry) => (
                    <li key={inquiry.id} className="inquiry-item">
                      <Link to='/mypage/question/detail' className="inquiry-title">
                        {inquiry.isLocked ? (
                          <img src={lock} className="lock-icon" />
                        ) : (
                          <span className="dot-icon"></span>
                        )}
                        {inquiry.title}
                      </Link>
                      <div className="inquiry-date">작성일 : {inquiry.date}</div>
                    </li>
                  ))}
                </ul>

                <div className='bottom_menu-ask'>
                  <div className="pagination">
                  <button
                      className="page-button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {'<'}
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`page-button ${
                          currentPage === index + 1 ? 'active' : ''
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
                      {'>'}
                    </button>
                  </div>

                  <Link to="/mypage/question/create" className="new-inquiry-button">1:1 문의하기</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AskedList