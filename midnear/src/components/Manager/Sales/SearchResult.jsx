import React from 'react'

const SearchResult = () => {
    return (
        <div className='search_result'>
            <div className="wrap">
                <div className="hd">
                    <div className="cate">
                        {[
                            { label: "선택", className: "select" },
                            { label: "주문번호", className: "order_number" },
                            { label: "주문상태", className: "order_status" },
                            { label: "클레임상태", className: "claim_status" },
                            { label: "결제일", className: "date" },
                            { label: "상품명", className: "name" },
                            { label: "옵션정보", className: "option_info" },
                            { label: "수량", className: "amount" },
                            { label: "총 주문 금액", className: "price" },
                            { label: "배송비 포함 최종 주문 금액", className: "sum" },
                            { label: "구매자명", className: "buyer_name" },
                            { label: "구매자 ID", className: "buyer_id" },
                            { label: "수취인명", className: "receiver_name" },
                            { label: "발송처리일", className: "deliver_date" },
                            { label: "구매자연락처", className: "buyer_contact" },
                            { label: "구매자 배송지", className: "buyer_place" },
                        ].map(({ label, className }) => (
                            <div key={label} className={className}>
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
