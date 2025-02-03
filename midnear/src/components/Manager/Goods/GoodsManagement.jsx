import React, { useState } from 'react';
import Left from '../../../assets/img/icon/left_allow.svg';
import Right from '../../../assets/img/icon/right_allow.svg';
import DelModal from '../Modals/DelModal';
import SearchWrap from './SearchWrap';

const GoodsManagement = () => {

    const [rows, setRows] = useState(["Row 1", "Row 2", "Row 3"]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSave = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsCompleted(true);
        setIsModalOpen(false);

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        handleDeleteSelected();
    };

   

    const handleSelectAll = () => {
        setSelectedRows(rows.map((_, index) => index));
    };

    const handleDeselectAll = () => {
        setSelectedRows([]);
    };

    const handleDeleteSelected = () => {
        setRows(rows.filter((_, index) => !selectedRows.includes(index)));
        setSelectedRows([]);
    };

    const handleStatusChange = (status) => {
        alert(`선택된 행의 상태가 '${status}'로 변경되었습니다.`);
    };

    const handleCheckboxChange = (index) => {
        setSelectedRows(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    return (
        <div className='goodsManagement container'>
            <div className="hd">
                <div className="title">상품 관리</div>
               <SearchWrap />
            </div>

            <div className="table">
                <div className="header">
                    <div className="category">카테고리</div>
                    <div className="name">상품명</div>
                    <div className="color">색상</div>
                    <div className="price">판매가</div>
                    <div className="dis_persent">할인율</div>
                    <div className="dis_price">할인가</div>
                    <div className="status">판매상태</div>
                    <div className="size">사이즈 별 재고 수량</div>
                    <div className="day">등록 일시</div>
                    <div className="check">선택</div>
                </div>
                {rows.map((row, index) => (
                    <div key={index} className="row">
                        <div className="category">{row}</div>
                        <div className="name"></div>
                        <div className="color">
                            <div className="color_name"></div>
                            <div className="dropdown_icon"></div>
                        </div>
                        <div className="price"></div>
                        <div className="dis_persent"></div>
                        <div className="dis_price"></div>
                        <div className="status"></div>
                        <div className="size"></div>
                        <div className="day"></div>
                        <input
                            type='checkbox'
                            className="check"
                            checked={selectedRows.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
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
                <div className="changes">
                    <div className="btn" onClick={() => handleStatusChange('판매중')}>판매중으로 변경</div>
                    <div className="btn" onClick={() => handleStatusChange('SOLD OUT')}>SOLD OUT으로 변경</div>
                    <div className="btn" onClick={() => handleStatusChange('숨김처리')}>숨김처리로 변경</div>
                </div>
                <div className="select">
                    <div className="btn" onClick={handleSelectAll}>전체 선택</div>
                    <div className="btn" onClick={handleDeselectAll}>선택 취소</div>
                    <div className="btn gray" onClick={handleSave}>삭제</div>
                </div>
            </div>
            <DelModal
                show={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm} />
        </div>
    );
}

export default GoodsManagement;
