import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";

const Search = () => {
    return (
        <div className='sales_search container'>
            <div className="title">주문 통합 검색 <span>미드니어의 모든 주문을 조회할 수 있는 통합 주문조회 메뉴입니다.</span></div>
            <SearchFilter />

            <div className="result_info"></div>
            <SearchResult />
        </div>
    )
}

export default Search
