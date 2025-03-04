import React, { useState, useEffect } from 'react';
import triangle from '../../assets/img/notice/triangle.svg';
import search from '../../assets/img/orderlist/search.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NoticeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [array, setArray] = useState('');
  const token = localStorage.getItem('jwtToken');
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const [notices, setNotices] = useState([]);
  const [noticesTop, setNoticesTop] = useState([]);

  const fetchList = () => {
    axios
      .get(`${DOMAIN}/noticeManagement/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setNotices(response.data.data.notices);
        }
      })
      .catch((error) => {
        console.error('일반 공지사항 불러오기 실패:', error);
      });
  };

  const fetchFixedList = () => {
    axios
      .get(`${DOMAIN}/noticeManagement/fixed`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setNoticesTop(response.data.data);
        }
      })
      .catch((error) => {
        console.error('고정 공지사항 불러오기 실패:', error);
      });
  };

  useEffect(() => {
    fetchList();
    fetchFixedList();
  }, []);

  const itemsPerPage = 13;
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <div className="notice">
        <div className="mypage_title">NOTICE</div>
        <div className="notice_nav_contianer">
          <div className="notice_nav-time">
            <select className="array-select" value={array} onChange={(e) => setArray(e.target.value)}>
              <option value="">일주일</option>
              <option value="한 달">한 달</option>
              <option value="전체">전체</option>
            </select>
            <img src={triangle} alt="triangle" />
          </div>
          <div className="notice-search-bar">
            <input
              type="text"
            
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search} className="search-button" alt="search" />
          </div>
        </div>

        <ul className="notice-list">
          {/* 고정 공지 */}
          {noticesTop.map((notice) => (
            <li key={notice.noticeId} className="notice-item-top">
              <Link to={`/others/notice/detail/${notice.noticeId}`}>
                <div className="notice-title">{notice.title}</div>
              </Link>
              <div className="notice_information">
                <div className="notice-name">관리자</div>
                <div className="notice-date">작성일 : {new Date(notice.createdDate).toLocaleDateString()}</div>
              </div>
            </li>
          ))}

          {/* 일반 공지 */}
          {paginatedNotices.map((notice) => (
            <li key={notice.noticeId} className="notice-item">
              <Link to={`/others/notice/detail/${notice.noticeId}`}>
                <div className="notice-title">{notice.title}</div>
              </Link>
              <div className="notice_information">
                <div className="notice-name">관리자</div>
                <div className="notice-date">작성일 : {new Date(notice.createdDate).toLocaleDateString()}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button className="page-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
          <button className="page-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeList;
