import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const SelectCate = ({ onCategorySelect }) => {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const token = localStorage.getItem('jwtToken');
    const [tmb, setTmb] = useState([0, 0, 0]);
    const [dropdownVisible, setDropdownVisible] = useState([false, false, false]);
    const [categories, setCategories] = useState({ top: [], middle: [], bottom: {} });
    const [categoryMap, setCategoryMap] = useState({}); 

    const fetchCate = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/productManagement/categories`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 && response.data.success) {

                const rawData = response.data.data;
                const transformData = (data) => {
                    const cateObj = { top: [], middle: [], bottom: {} };
                    const cateMap = {}; 

                    data.forEach((category) => {
                        cateObj.top.push({ name: category.name, id: category.categoryId });
                        cateMap[category.name] = category.categoryId;

                        if (category.children) {
                            category.children.forEach((subCategory) => {
                                cateObj.middle.push({ name: subCategory.name, id: subCategory.categoryId });
                                cateMap[subCategory.name] = subCategory.categoryId;

                                if (subCategory.children) {
                                    cateObj.bottom[subCategory.name] = subCategory.children.map((child) => ({
                                        name: child.name,
                                        id: child.categoryId,
                                    }));

                                    subCategory.children.forEach((child) => {
                                        cateMap[child.name] = child.categoryId;
                                    });
                                }
                            });
                        }
                    });

                    console.log("카테고리 매핑 확인:", cateMap); 
                    setCategoryMap(cateMap);
                    return cateObj;
                };

                setCategories(transformData(rawData));
            }
        } catch (error) {
            console.error('카테고리 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchCate();
    }, []);

    const toggleDropdown = (index) => {
        setDropdownVisible((prev) =>
            prev.map((visible, i) => (i === index ? !visible : false))
        );
    };

    const handleSelect = (level, index) => {
        const newTmb = [...tmb];
        newTmb[level] = index;
        for (let i = level + 1; i < newTmb.length; i++) {
            newTmb[i] = 0;
        }
        setTmb(newTmb);
        setDropdownVisible([false, false, false]);
    
        let selectedCategory = null;
        let selectedCategoryId = null;
    
        if (level === 0) {
            selectedCategory = categories.top[index]?.name;
        } 
   
        else if (level === 1) {
            selectedCategory = categories.middle[index]?.name;
        } 
        else if (level === 2 && categories.middle[tmb[1]]) {
            selectedCategory = categories.bottom[categories.middle[tmb[1]]?.name]?.[index]?.name;
        }
    
        if (selectedCategory) {
            selectedCategoryId = categoryMap[selectedCategory] || null;
        }
    
    
        if (onCategorySelect && selectedCategoryId) {
            onCategorySelect(selectedCategoryId);
        }
    };
    
    
    const dropdownVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
    };

    const renderDropdown = (level, items) => {
        return (
            <motion.div
                className="dropdown_menu"
                initial="hidden"
                animate={dropdownVisible[level] ? 'visible' : 'hidden'}
                variants={dropdownVariants}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`dropdown_item ${tmb[level] === index ? 'active' : ''}`}
                        onClick={() => handleSelect(level, index)}
                    >
                        {item.name}
                    </div>
                ))}
            </motion.div>
        );
    };

    return (
        <div className="select_cate container">
            <div className="title">카테고리</div>
            <div className="cate_wrap">
                <div className="dropdown">
                    <div className="selected">
                        <p>{categories.top[tmb[0]]?.name || '선택'}</p>
                        <div
                            className={`semo ${dropdownVisible[0] ? 'open' : ''}`}
                            onClick={() => toggleDropdown(0)}
                        ></div>
                    </div>
                    {renderDropdown(0, categories.top)}
                </div>

                {categories.middle.length > 0 && (
                    <>
                        <div className="line"></div>
                        <div className="dropdown">
                            <div className="selected">
                                <p>{categories.middle[tmb[1]]?.name || '선택'}</p>
                                <div
                                    className={`semo ${dropdownVisible[1] ? 'open' : ''}`}
                                    onClick={() => toggleDropdown(1)}
                                ></div>
                            </div>
                            {renderDropdown(1, categories.middle)}
                        </div>
                    </>
                )}

                {categories.bottom[categories.middle[tmb[1]]?.name]?.length > 0 && (
                    <>
                        <div className="line"></div>
                        <div className="dropdown">
                            <div className="selected">
                                <p>{categories.bottom[categories.middle[tmb[1]]?.name][tmb[2]]?.name || '선택'}</p>
                                <div
                                    className={`semo ${dropdownVisible[2] ? 'open' : ''}`}
                                    onClick={() => toggleDropdown(2)}
                                ></div>
                            </div>
                            {renderDropdown(2, categories.bottom[categories.middle[tmb[1]]?.name])}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SelectCate;
