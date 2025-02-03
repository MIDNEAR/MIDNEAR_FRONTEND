import React, { useState } from 'react';
import Modal from '../Modals/Modal';
import CateItem from './CateItem';
import PlusCate from './PlusCate';

const Category = () => {
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cateItems, setCateItems] = useState({
    SHOP: {
      'ALL SHOP': [],
      'NEW': [],
      'NEW CLOTH': ['ALL', 'TOP', 'BOTTOM'],
    },
    OTHERS: ['MAGAZINE', 'NOTICE'],
  });

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsCompleted(true);
    setIsModalOpen(false);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleAll = () => {
    setIsAllOpen((prev) => !prev);
  };

  const addCateItem = (parentCategory, subCategory) => {
    const newCateName = `NEW CATEGORY ${Date.now()}`;
    setCateItems((prev) => {
      const newCateItems = { ...prev };
      if (subCategory) {
        if (newCateItems[parentCategory][subCategory]) {
          newCateItems[parentCategory][subCategory].push(newCateName);
        }
      } else {
        newCateItems[parentCategory][newCateName] = [];
      }
      return newCateItems;
    });
  };

  const renderCateItems = (category, subCategory) => {
    if (Array.isArray(category)) {
      return category.map((item, index) => (
        <CateItem key={index} name={item} isBot={true} />
      ));
    } else if (typeof category === 'object') {
      return Object.keys(category).map((key) => (
        <CateItem key={key} name={key} isOpen={isAllOpen}>
          <div className="bot">
            {category[key].map((subItem, subIndex) => (
              <CateItem key={subIndex} name={subItem} isBot={true} />
            ))}
            <PlusCate onAdd={() => addCateItem('SHOP', key)} />
          </div>
        </CateItem>
      ));
    }
  };

  return (
    <div className="manager_category container">
      <div className="title">
        <p className="b">카테고리 관리</p>
        <div className="btns">
          <div className="all-open" onClick={toggleAll}>
            {isAllOpen ? '전체 접기' : '전체 펼치기'}
          </div>
        </div>
      </div>
      <div className="top">
        <CateItem name="SHOP" isOpen={isAllOpen}>
          <div className="mid">
            {renderCateItems(cateItems.SHOP)}
            <PlusCate onAdd={() => addCateItem('SHOP')} />
          </div>
        </CateItem>
      </div>
      <div className="top">
        <CateItem name="OTHERS" isOthers={true}>
          <div className="mid">
            {cateItems.OTHERS.map((item, index) => (
              <CateItem key={index} name={item} isBot={true} />
            ))}
            <PlusCate onAdd={() => addCateItem('OTHERS')} />
          </div>
        </CateItem>
      </div>
      <div className="btn" onClick={handleSave}>완료</div>
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Category;
