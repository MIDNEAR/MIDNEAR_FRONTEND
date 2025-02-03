import React, { useState } from 'react';


const BlockedUsers = () => {
  const [customerId, setCustomerId] = useState('');
  const [reason, setReason] = useState('');
  const [filteredIds, setFilteredIds] = useState([]);

  const reasons = [
    '이상 거래',
    '반품 과다',
    '허위 정보 제공',
    '악성 리뷰 작성',
    '기타',
  ];

  const allCustomerIds = [
    'user123', 'user456', 'user789', 'user101', 'user112',
    'user134', 'user145', 'user167', 'user789',
  ];

  // 고객 ID 검색 및 필터링 함수
  const handleSearchSubmit = () => {
    if (customerId) {
      const filtered = allCustomerIds.filter((id) => id.includes(customerId));
      setFilteredIds(filtered);
    } else {
      setFilteredIds([]);
    }
  };

  // 고객 ID 선택 후 처리
  const handleIdSelect = (id) => {
    setCustomerId(id);
    setFilteredIds([]); // 선택 후 필터링된 ID 목록 지우기
  };

  // 등록 처리
  const handleRegister = () => {
    console.log('고객 ID:', customerId, '사유:', reason);
  };

  return (
    <div className="blocked-users-container">
      <h2>고객 ID 조회</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="고객 ID 입력"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          onKeyUp={handleSearchSubmit} // 입력할 때마다 자동으로 필터링
        />
        {/* "조회" 또는 "완료" 버튼 */}
        <button
          onClick={handleSearchSubmit}
          className="search-btn"
        >
          {customerId ? '완료' : '조회'} {/* ID가 입력되면 "완료"로 바뀌고, 그렇지 않으면 "조회" */}
        </button>
      </div>

      {/* 필터링된 고객 ID 목록을 텍스트 필드 바로 아래에 표시 */}
      {filteredIds.length > 0 && (
        <ul className="filtered-ids">
          {filteredIds.map((id) => (
            <li key={id} onClick={() => handleIdSelect(id)}>
              {id}
            </li>
          ))}
        </ul>
      )}

      <h2>제한 사유 등록</h2>

      <div>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="b-select"
        >
          <option value="">-----사유 선택-----</option>
          {reasons.map((reason, index) => (
            <option key={index} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button
          onClick={handleRegister}
          className="register-btn"
          disabled={!customerId || !reason}
        >
          등록 {/* 버튼 텍스트를 항상 "등록"으로 유지 */}
        </button>
      </div>
    </div>
  );
};

export default BlockedUsers;