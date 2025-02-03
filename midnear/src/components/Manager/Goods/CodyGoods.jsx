import React, { useState } from 'react';
import Left from '../../../assets/img/icon/left_allow.svg';
import Right from '../../../assets/img/icon/right_allow.svg';
import SearchWrap from './SearchWrap';
import { useNavigate } from 'react-router-dom';

const CodyGoods = () => {
    const [rows, setRows] = useState([
        { id: 1, category: '카테고리', goods: '상품', color: '색상', size: '사이즈', link: '연관상품' },
        { id: 2, category: '카테고리2', goods: '상품2', color: '색상2', size: '사이즈2', link: '연관상품2' },
    ]);
    const navigate = useNavigate();

    const [selectedRows, setSelectedRows] = useState([]);

    const toggleSelectAll = () => {
        if (selectedRows.length === rows.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(rows.map(row => row.id));
        }
    };

    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const deleteSelectedRows = () => {
        setRows(rows.filter(row => !selectedRows.includes(row.id)));
        setSelectedRows([]);
    };

    const gotoDetail = (name) =>{
        navigate(`/manager/Goods/Detail/${name}`);
    }

    return (
        <div className='cody container'>
            <div className="hd">
                <div className="title">코디 상품 관리</div>
                <SearchWrap />
            </div>

            <div className="table">
                <div className="header">
                    <div className="cate">카테고리</div>
                    <div className="goods">상품</div>
                    <div className="color">색상</div>
                    <div className="size">상품 사이즈 별 재고 수량</div>
                    <div className="link">연관상품</div>
                    <div className="check">선택</div>
                </div>
                {rows.map(row => (
                    <div className="row" key={row.id} onDoubleClick={() => gotoDetail(row.goods)}>
                        <div className="cate">{row.category}</div>
                        <div className="goods">{row.goods}</div>
                        <div className="color">{row.color}</div>
                        <div className="size">{row.size}</div>
                        <div className="link">{row.link}</div>
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => toggleRowSelection(row.id)}
                            className="check"
                        />
                    </div>
                ))}
            </div>

            <div className="paging">
                <img src={Left} alt="" />
                <div className="pages">1</div>
                <div className="pages">2</div>
                <div className="pages">3</div>
                <img src={Right} alt="" />
            </div>
            <div className="btns">
                <div className="select">
                    <div className="btn" onClick={toggleSelectAll}>전체 선택</div>
                    <div className="btn" onClick={() => setSelectedRows([])}>선택 취소</div>
                    <div className="btn gray" onClick={deleteSelectedRows}>삭제</div>
                </div>
            </div>

        </div>
    );
}

export default CodyGoods;
