import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const NoticeTableComponent = () => {
    const [noticesTop, setNoticesTop] = useState([]);
    const [notices, setNotices] = useState([]);
    const [totalNotice, setTotalNotice] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateRange, setDateRange] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 10;
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    useEffect(() => {
        loadFixedNotice();
        loadUnfixedNotice(currentPage);
        totalNoticeNum();
    }, [currentPage, dateRange, searchTerm]);

    // 고정글 불러오기
    const loadFixedNotice = () => {
        axios.get(`${DOMAIN}/notice/fixed`)
            .then((res) => {
                if (res.status === 200) {
                    setNoticesTop(res.data.data.map((item) => ({
                        ...item,
                        createdDate: item.createdDate.split("T")[0].replace(/-/g, ". "),
                    })));
                }
            })
            .catch((error) => console.error("고정글 불러오기 실패:", error));
    };

    // 일반글 불러오기
    const loadUnfixedNotice = (page = 1) => {
        axios.get(`${DOMAIN}/notice/unfixed`, {
            params: { page, dateRange, searchText: searchTerm }
        })
        .then((res) => {
            if (res.status === 200) {
                setNotices(res.data.data.map((item) => ({
                    ...item,
                    createdDate: item.createdDate.split("T")[0].replace(/-/g, ". "),
                })));
            }
        })
        .catch((error) => console.error("일반글 불러오기 실패:", error));
    };

    // 전체 공지사항 개수 불러오기
    const totalNoticeNum = () => {
        axios.get(`${DOMAIN}/notice/totalPageNum`)
            .then((res) => {
                if (res.status === 200) {
                    setTotalNotice(res.data.data);
                }
            })
            .catch((error) => console.error("공지사항 개수 로드 실패:", error));
    };

    // 삭제 기능
    const handleDeleteSelected = () => {
        if (window.confirm("정말로 선택한 항목을 삭제하시겠습니까?")) {
            setNotices(notices.filter((item) => !selectedIds.includes(item.id)));
            setSelectedIds([]);
        }
    };

    // 필터 변경
    const handleFilterChange = (event) => {
        setDateRange(event.target.value);
        setCurrentPage(1);
    };

    // 검색어 변경
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 체크박스 선택/해제
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) => 
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // 전체 선택/해제
    const handleSelectAll = () => {
        setSelectedIds(notices.map((item) => item.id));
    };

    const handleDeselectAll = () => {
        setSelectedIds([]);
    };

    // 페이지 변경
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지네이션 계산
    const totalPages = Math.ceil(totalNotice / itemsPerPage);

    return (
        <div className="manager-notice container">
            <div className="notice-header1">
                <div className="notice-title">공지사항</div>
                <div className="notice-controls">
                    <select className="dropdown" value={dateRange} onChange={handleFilterChange}>
                        <option value="오늘">오늘</option>
                        <option value="1주일">1주일</option>
                        <option value="1개월">1개월</option>
                        <option value="3개월">3개월</option>
                        <option value="전체">전체</option>
                    </select>
                    <div className="notice-search-box">
                        <input
                            type="text"
                            className="notice-search-bar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="검색"
                        />
                    </div>
                </div>
            </div>

            <div className="notice-table-container">
                <table className="notice-table">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>내용</th>
                            <th>일시</th>
                            <th>선택</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.length > 0 ? (
                            notices.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.content}</td>
                                    <td>{item.createdDate}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="notice-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={currentPage === number ? "active" : ""}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <div className="notice-btn-group">
                <div className="notice-action-buttons">
                    <button>선택 글 고정</button>
                    <button>선택 글 고정 해제</button>
                </div>
                <div className="notice-action-buttons">
                    <button onClick={handleSelectAll}>전체 선택</button>
                    <button onClick={handleDeselectAll}>전체 해제</button>
                    <button className="notice-delete-btn" onClick={handleDeleteSelected}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticeTableComponent;
