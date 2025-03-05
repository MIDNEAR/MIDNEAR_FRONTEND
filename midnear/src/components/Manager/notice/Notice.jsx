import React, { useState, useEffect } from 'react';


const NoticeTableComponent = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('전체');
    const [sortOrder, setSortOrder] = useState('최신순');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchNoticeData();
    }, []);

    const fetchNoticeData = () => {
        const allData = [
            {
                id: 1,
                title: '신제품 출시 안내',
                content: '새로운 제품이 출시되었습니다. 많은 관심 부탁드립니다.',
                date: '2025-01-07 14:00',
            },
            {
                id: 2,
                title: '서비스 점검 안내',
                content: '시스템 점검이 예정되어 있으니, 이용에 참고해 주세요.',
                date: '2025-01-06 13:00',
            },
            {
                id: 3,
                title: '이벤트 종료 안내',
                content: '이번 주에 진행된 이벤트가 종료되었습니다. 많은 참여 감사드립니다.',
                date: '2025-01-05 12:00',
            },
        ];

        let filteredData = allData;

        // 날짜 필터 적용
        const today = new Date();
        switch (filter) {
            case '오늘':
                filteredData = filteredData.filter((item) => new Date(item.date).toDateString() === today.toDateString());
                break;
            case '1주일':
                filteredData = filteredData.filter((item) => new Date(item.date) >= new Date(today.setDate(today.getDate() - 7)));
                break;
            case '1개월':
                filteredData = filteredData.filter((item) => new Date(item.date) >= new Date(today.setMonth(today.getMonth() - 1)));
                break;
            case '3개월':
                filteredData = filteredData.filter((item) => new Date(item.date) >= new Date(today.setMonth(today.getMonth() - 3)));
                break;
            default:
                break;
        }

        // 검색 적용
        if (searchQuery) {
            filteredData = filteredData.filter((item) =>
                item.title.includes(searchQuery) || item.content.includes(searchQuery)
            );
        }

        // 정렬
        filteredData = filteredData.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === '최신순' ? dateB - dateA : dateA - dateB;
        });

        setData(filteredData);
    };

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        fetchNoticeData(selectedFilter, sortOrder, searchQuery);
    };

    const handleSortChange = (event) => {
        const selectedSortOrder = event.target.value;
        setSortOrder(selectedSortOrder);
        fetchNoticeData(filter, selectedSortOrder, searchQuery);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        fetchNoticeData(filter, sortOrder, query);
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === currentItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(currentItems.map((item) => item.id));
        }
    };

    const handleDeselectAll = () => {
        setSelectedIds([]);
    };

    const handleDeleteSelected = () => {
        const confirmDelete = window.confirm("정말로 선택한 항목을 삭제하시겠습니까?");
        if (confirmDelete) {
            setData((prevData) => prevData.filter((item) => !selectedIds.includes(item.id)));
            setSelectedIds([]);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="manager-notice contents">
            <div className="notice-header1">
                <div className="notice-title">공지사항</div>
                <div className="notice-controls">
                <div className="dropdown-container">
                    <select className="dropdown" value={filter} onChange={handleFilterChange}>
                        <option value="오늘">오늘</option>
                        <option value="1주일">1주일</option>
                        <option value="1개월">1개월</option>
                        <option value="3개월">3개월</option>
                        <option value="전체">전체</option>
                    </select>
                    </div>
                <div className="dropdown-container">

                    <select className="notice-dropdown" value={sortOrder} onChange={handleSortChange}>
                        <option value="최신순">최신순</option>
                        <option value="오래된순">오래된순</option>
                    </select>
                    </div>
                    <div className="notice-search-box">
                        <div className="notice-square-box">검색</div>
                        <input
                            type="text"
                            className="notice-search-bar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            <div className="notice-table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>내용</th>
                            <th>일시</th>
                            <th>선택</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.date}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan="4">데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="notice-pagination">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={currentPage === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <div className="notice-btn-group">

                <div className="notice-action-buttons">
                    <button >선택 글 고정</button>
                    <button >선택 글 고정 해제</button>
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