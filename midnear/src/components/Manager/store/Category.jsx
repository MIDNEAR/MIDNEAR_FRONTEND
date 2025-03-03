import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../Modals/Modal';
import CateItem from './CateItem';
import PlusCate from './PlusCate';
import axios from 'axios';

const Category = () => {
  const location = useLocation();
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cateItems, setCateItems] = useState({ SHOP: {}, OTHERS: [] });

  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');

  const handleSave = () => setIsModalOpen(true);
  const handleConfirm = () => setIsModalOpen(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleAll = () => setIsAllOpen((prev) => !prev);

  const handleDeleteCategory = (parentCategory, subcate, cate = null) => {
    if (window.confirm("카테고리를 삭제하시겠습니까?")) {
      const deleteList = [parentCategory, subcate, cate].filter(item => item !== null); 
  
      axios.delete(`${DOMAIN}/storeManagement/deleteCategories`, {
        headers: { Authorization: `Bearer ${token}` },
        data: deleteList, 
      })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          console.log(response.data.message); 
          fetchCate(); 
        } else {
          console.error("삭제 실패: ", response.data.message);
        }
      })
      .catch((error) => {
        console.error("서버 오류: ", error);
      });
    }
  };
  



  const fetchCate = () => {
    axios
      .get(`${DOMAIN}/productManagement/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          const rawData = response.data.data;
          const transformData = (data) => {
            const cateObj = { SHOP: {}, OTHERS: [] };
            data.forEach((category) => {
              if (category.name === "SHOP") {
                category.children.forEach((subCategory) => {
                  cateObj.SHOP[subCategory.name] = subCategory.children.map((child) => child.name);
                });
              } else {
                cateObj.OTHERS.push(category.name);
              }
            });
            return cateObj;
          };
          setCateItems(transformData(rawData));
        }
      })
      .catch((error) => console.error("카테고리 데이터를 가져오는 중 오류 발생:", error));
  };

  useEffect(() => {
    fetchCate();
  }, [location.pathname]);


  const addCateItem = (parentCategory, subCategory = null) => {
    const newCateName = `NEW CATEGORY ${Date.now()}`;
    setCateItems((prev) => {
      const newCateItems = { ...prev };
      if (parentCategory === "SHOP") {
        if (subCategory) {
          if (newCateItems.SHOP[subCategory]) {
            newCateItems.SHOP[subCategory] = [...newCateItems.SHOP[subCategory], newCateName];
          }
        } else {
          newCateItems.SHOP[newCateName] = [];
        }
      }
      return newCateItems;
    });
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
        <CateItem name="SHOP" isOpen={isAllOpen} isFirst={true}>
          <div className="mid">
            {Object.keys(cateItems.SHOP).map((key, index) => (
              <CateItem
                key={key}
                name={key}
                isOpen={isAllOpen}
                isFirst={index === 0}
                onDelete={() => handleDeleteCategory("SHOP", key)}
              >
                <div className="bot">
                  {cateItems.SHOP[key].map((subItem, subIndex) => (
                    <CateItem
                      key={subIndex}
                      name={subItem}
                      isBot={true}
                      onDelete={() => handleDeleteCategory(0, index, subIndex)}
                    />
                  ))}
                  <PlusCate onAdd={() => addCateItem('SHOP', key)} />
                </div>
              </CateItem>
            ))}
            <PlusCate onAdd={() => addCateItem('SHOP')} />
          </div>
        </CateItem>
      </div>




      <div className="top">
        <CateItem name="OTHERS" isOthers={true} isFirst={true}>
          <div className="mid">
            {cateItems.OTHERS.map((item, index) => (
              <CateItem key={index} name={item} isBot={true} isFirst={true} />
            ))}
          </div>
        </CateItem>
      </div>

      <div className="btn" onClick={handleSave}>완료</div>

      <Modal show={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirm} />
    </div>
  );
};

export default Category;
