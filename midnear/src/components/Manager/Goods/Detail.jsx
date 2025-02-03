import React from 'react'
import Nav from '../Nav';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { name } = useParams();
    return (
        <div className="manager">
            <Nav />
            <div className="contents">
                <div className='detail container'>
                    <div className="title">코디 상품 수정</div>
                    <div className="wrap">
                        <p>대표 상품 정보</p>
                        <div className="table">
                            <div className="header">
                                <div className="cate">카테고리</div>
                                <div className="goods">상품</div>
                                <div className="color">색상</div>
                                <div className="size">상품 사이즈 별 재고 수량</div>
                            </div>
                            <div className="row">
                                <div className="cate">카테고리</div>
                                <div className="goods">상품</div>
                                <div className="color">색상</div>
                                <div className="size">상품 사이즈 별 재고 수량</div>
                            </div>
                        </div>
                    </div>
                    <div className="wrap">
                        <p>연관상품 수정 및 추가하기</p>
                        <div className="search">
                            <input type="text" placeholder='연관상품명 검색해서 추가하기' />
                            <div className="btn">조회</div>
                        </div>

                    </div>
                    <div className="result">
                        <p>검색결과</p>
                        <div className="wrap">
                            <div className="table">
                                <div className="header">
                                    <div className="cate">카테고리</div>
                                    <div className="goods">상품</div>
                                    <div className="color">색상</div>
                                    <div className="size">상품 사이즈 별 재고 수량</div>
                                </div>
                                <div className="row">
                                    <div className="cate">카테고리</div>
                                    <div className="goods">상품</div>
                                    <div className="color">색상</div>
                                    <div className="size">상품 사이즈 별 재고 수량</div>
                                </div>
                            </div>
                            <div className="btn">연관상품 추가</div>
                        </div>
                    </div>
                    <div className="wrap">
                        <p>추가된 연관상품</p>
                        <div className="wrap">
                            <div className="link_table">
                                <div className="header">
                                    <div className="cate">카테고리</div>
                                    <div className="link">상품</div>
                                    <div className="link_color">색상</div>
                                    <div className="size">상품 사이즈 별 재고 수량</div>
                                    <div className="link_day">연관상품 등록 일시</div>
                                    <div className="check">선택</div>
                                </div>
                                <div className="row">
                                    <div className="cate">카테고리</div>
                                    <div className="link">상품</div>
                                    <div className="link_color">색상</div>
                                    <div className="size">상품 사이즈 별 재고 수량</div>
                                    <div className="link_day">연관상품 등록 일시</div>
                                    <input type="checkbox" name="" className="check" />
                                </div>
                            </div>
                            <div className="btns">
                                <div className="btn">전체 선택</div>
                                <div className="btn">선택 취소</div>
                                <div className="btn gray" >삭제</div>
                            </div>
                        </div>


                    </div>
                    <div className="btn">수정 완료</div>
                </div>
            </div>
        </div>
    )
}

export default Detail
