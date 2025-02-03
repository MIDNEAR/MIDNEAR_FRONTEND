import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SelectCate = () => {
    const [tmb, setTmb] = useState([0, 0, 0]);
    const [dropdownVisible, setDropdownVisible] = useState([false, false, false]);

    

    const top = ['SHOP'];
    const middle = [['ALL', 'NEW', 'NEW CLOTH']];
    const bottom = [[[], [], ['ALL', 'TOP', 'BOT']]];

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
    };

    const dropdownVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
    };

    return (
        <div className="select_cate container">
            <div className="title">카테고리</div>
            <div className="cate_wrap">
        
                <div className="dropdown">
                    <div className="selected">
                        <p>{top[tmb[0]]}</p>
                        <div
                            className={`semo ${dropdownVisible[0] ? 'open' : ''}`}
                            onClick={() => toggleDropdown(0)}
                        ></div>
                    </div>
                    <motion.div
                        className="dropdown_menu"
                        initial="hidden"
                        animate={dropdownVisible[0] ? 'visible' : 'hidden'}
                        variants={dropdownVariants}
                    >
                        {top.map((item, index) => (
                            <div
                                key={index}
                                className={`dropdown_item ${tmb[0] === index ? 'active' : ''}`}
                                onClick={() => handleSelect(0, index)}
                            >
                                {item}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {middle[tmb[0]] && middle[tmb[0]].length > 0 && (
                    <>
                        <div className="line"></div>
                        <div className="dropdown">
                            <div className="selected">
                                <p>{middle[tmb[0]][tmb[1]] || '선택'}</p>
                                <div
                                    className={`semo ${dropdownVisible[1] ? 'open' : ''}`}
                                    onClick={() => toggleDropdown(1)}
                                ></div>
                            </div>
                            <motion.div
                                className="dropdown_menu"
                                initial="hidden"
                                animate={dropdownVisible[1] ? 'visible' : 'hidden'}
                                variants={dropdownVariants}
                            >
                                {middle[tmb[0]].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`dropdown_item ${tmb[1] === index ? 'active' : ''}`}
                                        onClick={() => handleSelect(1, index)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </>
                )}

                {bottom[tmb[0]][tmb[1]] && bottom[tmb[0]][tmb[1]].length > 0 && (
                    <>
                        <div className="line"></div>
                        <div className="dropdown">
                            <div className="selected">
                                <p>{bottom[tmb[0]][tmb[1]][tmb[2]] || '선택'}</p>
                                <div
                                    className={`semo ${dropdownVisible[2] ? 'open' : ''}`}
                                    onClick={() => toggleDropdown(2)}
                                ></div>
                            </div>
                            <motion.div
                                className="dropdown_menu"
                                initial="hidden"
                                animate={dropdownVisible[2] ? 'visible' : 'hidden'}
                                variants={dropdownVariants}
                            >
                                {bottom[tmb[0]][tmb[1]].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`dropdown_item ${tmb[2] === index ? 'active' : ''}`}
                                        onClick={() => handleSelect(2, index)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SelectCate;
