import React, { useEffect, useState } from 'react';
import axios from 'axios';
import search from '../../assets/img/orderlist/search.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SortMenu from '../Shop/SortMenu';
import Pagination from '../Shop/Pagination';

const NoticeList = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSort = params.get("dateRange") || "전체";
  const initialPage = parseInt(params.get("page")) || 1;

  const [dateRange, setDateRange] = useState(initialSort);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [noticesTop, setNoticeTop] = useState([]);
  const [notices, setNotices] = useState([]);
  const [totalNotice, setTotalNotice] = useState(0);


  // 정렬
  const handleSortChange = (newSort) => {
    setDateRange(newSort);
    navigate(`?dateRange=${newSort}&page=${currentPage}`);
  };
  useEffect(() => {
    if (!params.get("dateRange")) {
      navigate(`?dateRange=${dateRange}&page=${currentPage}`, { replace: true }); 
    }
  }, [dateRange, currentPage, navigate, params]);

  // 고정글 불러오기
  const loadFixedNotice = () => {
    axios.get(`${DOMAIN}/notice/fixed`)
    .then((res)=>{
      if(res.status === 200){
        const transformedData = res.data.data.map((item) => ({
          ...item,
          createdDate: item.createdDate.split("T")[0].replace(/-/g, ". "), 
        }));
        setNoticeTop(transformedData);
      } 
    })
    .catch((error) => {
      console.error('고정글 불러오기 실패:', error.response || error.message);
    })
  };
  //일반글 불러오기
  const loadUnfixedNotice = (page = currentPage) => {
    axios.get(`${DOMAIN}/notice/unfixed`,{
      params: {
        page,
        dateRange,
        searchText: searchTerm,
      }
    })
    .then((res)=>{
      if(res.status === 200){
        const transformedData = res.data.data.map((item) => ({
          ...item,
          createdDate: item.createdDate.split("T")[0].replace(/-/g, ". "),
        }));
        setNotices(transformedData);
      } 
    })
    .catch((error) => {
      console.error('일반글 불러오기 실패:', error.response || error.message);
    })
  };
    // 전체 공지사항 개수
    const totalNoticeNum = () => {
      axios.get(`${DOMAIN}/notice/totalPageNum`)
      .then((res)=>{
        if(res.status === 200){
          setTotalNotice(res.data.data);
        } 
      })
      .catch((error) => {
        console.error('공지사항 개수 로드 실패:', error.response || error.message);
      })
    };
    
  useEffect(()=>{
    loadFixedNotice();
    loadUnfixedNotice();
    totalNoticeNum();
  },[currentPage, dateRange, searchTerm]);

  return (
    <div className="container">
      <div className="notice">

        <div className='top-el'>
          <div className="mypage_title">NOTICE</div>

          <div className='notice_nav_contianer'>
              <div className='sort'>
                <SortMenu SortChange={handleSortChange} isNotice={true}/>
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
        </div>

        <ul className="notice-list">
        {/* 고정 공지 */}
        {noticesTop.map((notice) => (
            <li key={notice.noticeId} className="notice-item-top">
            <Link to={`/others/notice/detail?noticeId=${notice.noticeId}`}>
                <div className="notice-title">{notice.title}</div>
            </Link>
            <div className="notice_information">
                <div className="notice-name">관리자</div>
                <div className="notice-date">작성일 : {notice.createdDate}</div>
            </div>
            </li>
          ))}

        {/* 일반 공지 */}
        {notices.map((notice) => (
            <li key={notice.noticeId} className="notice-item">
            <Link to={`/others/notice/detail?noticeId=${notice.noticeId}`}>
                <div className="notice-title">{notice.title}</div>
            </Link>
            <div className="notice_information">
                <div className="notice-name">관리자</div>
                <div className="notice-date">작성일 : {notice.createdDate}</div>
            </div>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        <Pagination total={totalNotice} limit={10} page={currentPage} setPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default NoticeList;
