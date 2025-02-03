import React, { useState } from 'react';
import searchlogo from "../../../assets/img/logo/searchIcon.png";

const PaymentComponent = () => {
    const [selectedTab, setSelectedTab] = useState('전체'); 
    const [paymentReason, setPaymentReason] = useState(''); 
    const [paymentAmount, setPaymentAmount] = useState(''); 
    const [userId, setUserId] = useState(''); 
    const [selectedUsers, setSelectedUsers] = useState([]); 
    const [textReviewPoint, setTextReviewPoint] = useState(''); 
    const [photoReviewPoint, setPhotoReviewPoint] = useState(''); 

    const users = Array.from({ length: 100 }, (_, index) => `user${index + 1}`); // 100명 데이터 가정
    const [currentPage, setCurrentPage] = useState(0); 
    const usersPerPage = 10; 

    const handleUserSelect = (user) => {
        setSelectedUsers((prev) =>
            prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
        );
    };

    const handleSelectAll = () => {
        const startIdx = currentPage * usersPerPage;
        const endIdx = startIdx + usersPerPage;
        setSelectedUsers(users.slice(startIdx, endIdx)); // 현재 페이지의 유저들만 선택
    };

    const handleDeselectAll = () => setSelectedUsers([]);

    const handlePayment = () => {
        console.log('지급 사유:', paymentReason);
        console.log('지급 금액:', paymentAmount);
        console.log('선택된 사용자:', selectedUsers);
        alert('지급이 완료되었습니다.');
    };

    const startIdx = currentPage * usersPerPage;
    const endIdx = startIdx + usersPerPage;
    const paginatedUsers = users.slice(startIdx, endIdx); // 현재 페이지의 유저만 가져오기

    return (
        <div className="payment-container">
            <div className="payment-header">
                <h2>포인트 지급 관리</h2>
                <div className="payment-action-buttons">
                    <button onClick={() => setSelectedTab('전체')} className={selectedTab === '전체'? 'active' : ''}>전체 포인트</button>
                   
                    <button onClick={() => setSelectedTab('개별')} className={selectedTab === '개별'? 'active' : ''}>개별 포인트</button>
                    <button onClick={() => setSelectedTab('리뷰')} className={selectedTab === '리뷰' ? 'active' : ''}>리뷰 포인트</button>
                </div>
            </div>

            {selectedTab === '전체' && (
                <div className="payment-fields">
                    <label htmlFor="reason" >지급 사유</label>
                    <input type="text" id="reason" className='couponinput' value={paymentReason} onChange={(e) => setPaymentReason(e.target.value)} placeholder="지급 사유를 입력하세요" />
                    <label htmlFor="amount" >지급 금액</label>
                    <input type="number" id="amount" className='couponinput' value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="지급 금액을 입력하세요" />
                </div>
            )}

            {selectedTab === '개별' && (
                <div className="payment-fields">
                    <label htmlFor="userId">사용자 아이디 검색</label>
                    <div className="input-group">
                        <div class="search-container">
                            <input type="text"  id="userId" 
                                value={userId} 
                                onChange={(e) => setUserId(e.target.value)} 
                                placeholder="사용자 아이디 입력" class="search-input" />
                            <img src={searchlogo} alt="검색" class="search-icon" />
                        </div>
                    </div>
                    <div className="cp-table-container">
                        <table className="cp-user-table">
                            <tbody>
                                {paginatedUsers.map((user) => (
                                    <tr key={user}>
                                        <td className="cp-user-table-user">{user}</td>
                                        <td className="cp-user-table-checkbox ">
                                            <input type="checkbox" checked={selectedUsers.includes(user)} onChange={() => handleUserSelect(user)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="cp-pagination">
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
                        이전
                        </button>

                        {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
                        <button 
                            key={index} 
                            onClick={() => setCurrentPage(index)} 
                            className={currentPage === index ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                        ))}

                        <button 
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(users.length / usersPerPage) - 1))} 
                        disabled={endIdx >= users.length}
                        >
                        다음
                        </button>
                    </div>

                    <div className="payment-action-buttons">
                        <button onClick={handleSelectAll}>전체 선택</button>
                        <button onClick={handleDeselectAll}>전체 해제</button>
                    </div>

                    <div className="payment-fields">
                        <label htmlFor="reason" className='couponinput'>지급 사유</label>
                        <input type="text" id="reason" className='couponinput' value={paymentReason} onChange={(e) => setPaymentReason(e.target.value)} placeholder="지급 사유 입력" />
                        <label htmlFor="amount" className='couponinput'>금액 입력</label>
                        <input type="number" id="amount" className='couponinput' value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="지급 금액 입력" />
                    </div>
                </div>
            )}

            {selectedTab === '리뷰' && (
                <div className="payment-fields-review">
                    <div className="input-group">
                    <span>텍스트 리뷰</span>
                    <input type="number" id="textReview" value={textReviewPoint} 
                        onChange={(e) => setTextReviewPoint(e.target.value)} placeholder="KRW" />
                </div>
            
                <div className="input-group">
                    <span>포토 리뷰</span>
                    <input type="number" id="photoReview" value={photoReviewPoint} 
                        onChange={(e) => setPhotoReviewPoint(e.target.value)} placeholder="KRW" />
                </div>
            </div>
            )}

            <button className="payment-button" onClick={handlePayment}>지급</button>
        </div>
    );
};

export default PaymentComponent;