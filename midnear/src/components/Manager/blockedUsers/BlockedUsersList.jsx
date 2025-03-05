import React, { useState, useEffect } from 'react';


const TableComponent = () => {
  const [data, setData] = useState([]); // 테이블 데이터
  const [filter, setFilter] = useState('전체'); // 날짜 필터
  const [sortOrder, setSortOrder] = useState('최신순'); // 정렬 옵션
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [selectedIds, setSelectedIds] = useState([]); // 선택된 항목의 ID들

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

  // 초기 데이터 로드
  useEffect(() => {
    fetchFilteredData('전체', '최신순', '');
  }, []);

  // 데이터 필터링 및 정렬 함수
  const fetchFilteredData = async (filter, sortOrder, searchQuery) => {
    const allData = [
      { id: 1, reason: '시간 초과', date: '2024-12-23 12:00', selected: false },
      { id: 2, reason: '권한 없음', date: '2024-12-20 13:00', selected: true },
      { id: 3, reason: '잘못된 입력', date: '2024-11-23 14:00', selected: false },
      { id: 4, reason: '잘못된 입력', date: '2024-11-22 15:00', selected: false },
      { id: 5, reason: '시간 초과', date: '2024-12-21 16:00', selected: false },
      { id: 6, reason: '권한 없음', date: '2024-12-15 10:00', selected: true },
      { id: 7, reason: '잘못된 입력', date: '2024-12-10 12:30', selected: false },
      { id: 8, reason: '시간 초과', date: '2024-12-05 11:00', selected: false },
      { id: 9, reason: '권한 없음', date: '2024-12-23 09:00', selected: false },
      { id: 10, reason: '잘못된 입력', date: '2024-12-01 08:00', selected: false },
      { id: 11, reason: '권한 없음', date: '2024-11-30 18:00', selected: false },
      { id: 12, reason: '시간 초과', date: '2024-12-18 17:00', selected: false },
    ];

    const today = new Date();

    // 날짜 필터 조건 적용
    let filteredData = allData.filter((item) => {
      const itemDate = new Date(item.date);
      switch (filter) {
        case '오늘':
          return itemDate.toDateString() === today.toDateString();
        case '1주일':
          return itemDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        case '1개월':
          return itemDate >= new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        case '3개월':
          return itemDate >= new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        case '1년':
          return itemDate >= new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        default:
          return true;
      }
    });

    // 검색어 필터 조건 적용 (id 필터링)
    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.id.toString().includes(searchQuery)
      );
    }

    // 정렬 조건 적용
    filteredData = filteredData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === '최신순' ? dateB - dateA : dateA - dateB;
    });

    setData(filteredData);
  };

  // 날짜 필터 변경 핸들러
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    fetchFilteredData(selectedFilter, sortOrder, searchQuery);
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    fetchFilteredData(filter, selectedSortOrder, searchQuery);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchFilteredData(filter, sortOrder, query);
  };

  // 체크박스 클릭 핸들러
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        // 이미 선택된 항목이면 제거
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        // 선택되지 않은 항목이면 추가
        return [...prevSelectedIds, id];
      }
    });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션을 위해 데이터 자르기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 전체 선택
  const handleSelectAll = () => {
    setSelectedIds(data.map(item => item.id)); // 모든 항목을 선택
  };

  // 전체 선택 해제
  const handleDeselectAll = () => {
    setSelectedIds([]); // 모든 선택을 해제
  };

  // 차단 해제
  const handleUnblock = () => {
    // 차단 해제 로직 구현 (예: 선택된 ID들에 대해 차단 해제 작업)
    console.log('차단 해제된 항목 ID들:', selectedIds);
    setSelectedIds([]); // 작업 후 선택 해제
  };

  return (
    <div className="blackuser_list container">
      <div className="header1">
        <div className="qna-title">판매방해고객List</div>
        <div className="controls">
          {/* 날짜 필터 드롭다운 */}
          <div className="dropdown-container">
            <select
              className="dropdown"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="오늘">오늘</option>
              <option value="1주일">1주일</option>
              <option value="1개월">1개월</option>
              <option value="3개월">3개월</option>
              <option value="1년">1년</option>
              <option value="전체">전체</option>
            </select>
          </div>
          {/* 정렬 옵션 드롭다운 */}
          <div className="dropdown-container msort">
            <select
              className="dropdown msort"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="최신순">최신순</option>
              <option value="오래된순">오래된순</option>
            </select>
          </div>
          {/* 검색창 */}
          <div className="search-box">
            <div className="square-box">id 검색</div>
            <input
              type="text"
              className="search-bar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>제한사유</th>
              <th>일시</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.reason}</td>
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
      <div className="pageandaction">
        {/* 페이지네이션 */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>

        {/* 전체선택, 전체선택 해제, 차단해제 버튼 */}
        <div className="bul-action-buttons">
          <button onClick={handleSelectAll}>전체선택</button>
          <button onClick={handleDeselectAll}>선택취소</button>
          <button onClick={handleUnblock}>해제</button>
        </div>
      </div>


    </div>
  );
};

export default TableComponent;