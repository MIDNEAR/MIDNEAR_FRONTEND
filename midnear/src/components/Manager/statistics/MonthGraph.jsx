import React from 'react'

const MonthGraph = () => {
    return (
        <div className='month'>
            <div className="month_graph">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>9월</p>
                </div>
                <div className="orange stick"></div>
            </div>
            <div className="month_graph">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>10월</p>
                </div>
                <div className="orange stick"></div>
            </div>
            <div className="month_graph">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>11월</p>
                </div>
                <div className="orange stick"></div>
            </div>
            <div className="month_graph">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>12월</p>
                </div>
                <div className="orange stick"></div>
            </div>
        
            <div className="lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>

            </div>



        </div>
    )
}

export default MonthGraph
