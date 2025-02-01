import React, { useState } from 'react';
import triangle from '../../assets/img/notice/triangle.svg';
import search from '../../assets/img/orderlist/search.svg';
import { Link } from 'react-router-dom';

const NoticeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [array, setArray] = useState(''); 

  const noticesTop = [
    {
      id: 1,
      title:
        '긴급 공지 / 안녕하세요 공지사항입니다. 뭐 쓸말이 없어서 그냥 막 써봅니다.',
      date: '2025. 02. 07',
      name: '관리자 아이디',
    },
    { id: 2, title: '공지 / 공지사항입니다.', 
        date: '2025. 02. 07', 
        name: '관리자 아이디' },
  ];

  const notices = [
    { id: 3, title: '공지 / 공지사항인데 어디까지 가나 길게 한번 적어보겠습니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 4, title: '공지 / 삼행시 한번 해보겠습니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 5, title: '공지 / 자동차는 빠릅니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 6, title: '공지 /  동물은 빠르다네요..', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 7, title: '공지 / 차도 빠르답니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 8, title: '공지 /  제목이라 길게 쓰진 않을거같은데 예시용으로 적습니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 9, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 10, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 11, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 12, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 13, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 14, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 15, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 16, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 17, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 18, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
    { id: 19, title: '공지 / 안녕하세요 공지사항입니다.', date: '2025. 02. 07', name: '관리자 아이디' },
  ];

  const itemsPerPage = 13;
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleArrrayChange = (event) => {
      setArray(event.target.value);
    };

  return (
    <div className="container">
      <div className="notice">
        <div className="mypage_title">NOTICE</div>
        <div className='notice_nav_contianer'>
            <div className='notice_nav-time'>
            <select 
                  className="array-select" 
                  value={array} 
                  onChange={handleArrrayChange}
              >
                  <option value="">일주일</option>
                  <option value="한 달">한 달</option>
                  <option value="전체">전체</option>
              </select>
              <img src={triangle} />
            </div>
            <div className="notice-search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search} className="search-button" />
            </div>
        </div>

        <ul className="notice-list">
        {/* 고정 공지 */}
        {noticesTop.map((notice) => (
            <li key={notice.id} className="notice-item-top">
            <Link to="/others/notice/detail">
                <div className="notice-title">{notice.title}</div>
            </Link>
            <div className="notice_information">
                <div className="notice-name">{notice.name}</div>
                <div className="notice-date">작성일 : {notice.date}</div>
            </div>
            </li>
        ))}

        {/* 일반 공지 */}
        {paginatedNotices.map((notice) => (
            <li key={notice.id} className="notice-item">
            <Link to="/others/notice/detail">
                <div className="notice-title">{notice.title}</div>
            </Link>
            <div className="notice_information">
                <div className="notice-name">{notice.name}</div>
                <div className="notice-date">작성일 : {notice.date}</div>
            </div>
            </li>
        ))}
        </ul>


        {/* 페이지네이션 */}
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
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
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
      </div>
    </div>
  );
};

export default NoticeList