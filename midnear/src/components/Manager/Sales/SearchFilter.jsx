import React, { useState, useEffect, useRef } from "react";
import Semo from '../../../assets/img/icon/semo.svg';

const SearchFilter = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isConditionsOpen, setIsConditionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("결제일");
    const [selectedCondition, setSelectedCondition] = useState("전체");
    const [selectedTerm, setSelectedTerm] = useState("1주일");

    const optionsRef = useRef(null);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        if (endDate && e.target.value > endDate) {
            setEndDate("");
        }
    };

    const handleEndDateChange = (e) => {
        if (startDate && e.target.value < startDate) {
            alert("종료 날짜는 시작 날짜보다 이전일 수 없습니다.");
            return;
        }
        setEndDate(e.target.value);
    };

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const toggleConditions = () => {
        setIsConditionsOpen(!isConditionsOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOptionsOpen(false);
    };

    const handleConditionSelect = (condition) => {
        setSelectedCondition(condition);
        setIsConditionsOpen(false);
    };

    const handleTermSelect = (term) => {
        setSelectedTerm(term);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setIsOptionsOpen(false);
                setIsConditionsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="filter_wrap">
            <div className="terms">
                <div className="semi_title">조회기간</div>
                <div className="wrap">
                    <div className="select" onClick={toggleOptions}>
                        <p>{selectedOption}</p>
                        <img src={Semo} alt="" className={isOptionsOpen ? "open" : ""} />
                    </div>
                    {isOptionsOpen && (
                        <div className="options" ref={optionsRef}>
                            <div className="option" onClick={() => handleOptionSelect("발송처리일")}>
                                발송처리일
                            </div>
                        </div>
                    )}
                    <div className="terms_select">
                        {["오늘", "1주일", "1개월", "3개월", "6개월"].map((term) => (
                            <div
                                key={term}
                                className={`term ${selectedTerm === term ? "selected" : ""}`}
                                onClick={() => handleTermSelect(term)}
                            >
                                {term}
                            </div>
                        ))}
                    </div>
                    <div className="dates">
                        <input
                            type="date"
                            className="start"
                            value={startDate}
                            onChange={handleStartDateChange}
                            placeholder="시작 날짜"
                        />
                        <span> ~ </span>
                        <input
                            type="date"
                            className="end"
                            value={endDate}
                            onChange={handleEndDateChange}
                            placeholder="종료 날짜"
                            min={startDate}
                        />
                    </div>
                </div>
            </div>
            <div className="condition">
                <div className="semi_title">상세조건</div>
                <div className="con_wrap">
                    <div className="select" onClick={toggleConditions}>
                        <p>{selectedCondition}</p>
                        <img src={Semo} alt="" className={isConditionsOpen ? "open" : ""} />
                    </div>
                    {isConditionsOpen && (
                        <div className="options" ref={optionsRef}>
                            {["전체", "주문번호", "주문상태", "클레임상태", "결제일", "구매자명", "구매자 ID", "수취인명", "송장번호", "구매자연락처"].map((condition) => (
                                <div
                                    key={condition}
                                    className="option"
                                    onClick={() => handleConditionSelect(condition)}
                                >
                                    {condition}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <input type="text" className="input" disabled={true} />
            </div>
            <div className="btn">입력</div>
        </div>
    );
}

export default SearchFilter;
