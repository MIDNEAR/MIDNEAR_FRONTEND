import React from 'react'

const WeekGraph = () => {
    return (
        <div className='week'>
            <div className="one">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>1주차</p>
                </div>
                <div className="orange stick"></div>
            </div>
            <div className="two">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>2주차</p>
                </div>
                <div className="orange stick"></div>
            </div>
            <div className="three">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>3주차</p>
                </div>
                <div className="orange stick"></div>
            </div>
            <div className="four">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>4주차</p>
                </div>
                <div className="orange stick"></div>
            </div>
            <div className="five">
                <div className="blue stick"></div>
                <div className="day_title">
                    <span></span>
                    <p>5주차</p>
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

export default WeekGraph
