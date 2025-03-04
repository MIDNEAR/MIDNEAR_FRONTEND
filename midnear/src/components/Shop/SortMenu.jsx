import React, { useState, useEffect, useRef } from 'react';
import triangle from '../../assets/img/product/triangle.svg';

const SortMenu = ({ SortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [select, setSelect] = useState('latest');
    const ref = useRef(null);
    const options = [
        { value: 'latest', label: '최신순' },
        { value: 'popularity', label: '인기순' },
    ];

    const removeHandler = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (value) => {
        setSelect(value);
        SortChange(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const onClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false); 
            }
        };
        if (isOpen) {
            window.addEventListener('click', onClickOutside);
        }
        return () => {
            window.removeEventListener('click', onClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="sort-dropdown" ref={ref}>
            <div className="selected" onClick={removeHandler}>
                <div className="option">
                    {options.find((option) => option.value === select).label}
                </div>
                <div className={`triangle ${isOpen ? 'open' : ''}`}>
                    <img src={triangle} alt="triangle" />
                </div>
            </div>

            {isOpen && (
                <div className="no-selected">
                    {options
                        .filter((option) => option.value !== select)
                        .map((option) => (
                            <div
                                className="option"
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default SortMenu;
