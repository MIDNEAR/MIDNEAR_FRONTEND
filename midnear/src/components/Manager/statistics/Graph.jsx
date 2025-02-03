import React, { useEffect, useState } from 'react';
import DayGraph from './DayGraph';
import WeekGraph from './WeekGraph';
import MonthGraph from './MonthGraph';
import Left from '../../../assets/img/icon/left_allow.svg'
import Right from '../../../assets/img/icon/right_allow.svg'

const Graph = ({ cate }) => {
    const [title, setTitle] = useState('일간');

    useEffect(() => {
        if (cate === 'week') setTitle('주간');
        else if (cate === 'month') setTitle('월간');
        else setTitle('일간');
    }, [cate]);

    return (
        <div className="graph container">
            <div className="title">
                <p>{title} 매출 확인</p>
                <div className="month">{cate === 'month' ? '2024년' : '2024년 12월'}</div>
                <div className="info">
                    <p>결제 금액 <span className='blue'></span></p>
                    <p>환불 금액 <span className='orange'></span></p>
                </div>
            </div>

            <div className="inner">
                {cate === 'day' && <DayGraph />}
                {cate === 'week' && <WeekGraph />}
                {cate === 'month' && <MonthGraph />}
                
            </div>
            <div className="btns">
                <img src={Left} alt="" />
                <img src={Right} alt="" />
            </div>

        </div>
    );
};

export default Graph;
