import React, { useState } from "react";
import ColorDetail from './ColorDetail'
import SelectCate from './SelectCate'

const Goods = ({detail}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(" ");
  const [discount, setDiscount] = useState(false);
  const [price, setPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [color, setColor] = useState([]);
  const [newColor, setNewColor] = useState("");

  const handleAddColor = () => {
    if (newColor.trim() === "") return;
    setColor([...color, newColor.trim()]);
    setNewColor("");
  };

  const handleRemoveColor = (index) => {
    setColor(color.filter((_, i) => i !== index));
  };

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


  const calculateDiscountPrice = () => {
    if (!price || !discountRate) return "";
    const discountedPrice = price - price * (discountRate / 100);
    return Math.floor(discountedPrice).toLocaleString();
  };


  return (
    <div className='add_goods' >
      <SelectCate />
      <div className="goods_name container">
        <div className="title">상품명</div>
        <input type="text" name="name" placeholder='상품명 입력' />
      </div>
      <div className="wrap">
        <div className="price">
          <div className="title">상품가격</div>
          <div className="input">
            <input
              type="number"
              name="price"
              placeholder="숫자만 입력"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <p>원</p>
          </div>
          <div className="discount">
            <div className="wrap">
              <p>할인</p>
              {discount && (
                <>
                  <div className="input">
                    <input
                      type="number"
                      name="discountRate"
                      placeholder={discountRate}

                      onChange={(e) => setDiscountRate(Number(e.target.value))}
                    />
                    <p>%</p>
                  </div>
                  <div className="discount_price">
                    할인가 {calculateDiscountPrice()}
                  </div>
                </>
              )}


              <div className="btns">
                {discount ? (
                  <div className='noset' onClick={() => setDiscount(!discount)}>설정안함</div>

                ) : (
                  <div className='set' onClick={() => setDiscount(!discount)}>설정함</div>
                )}
              </div>
            </div>

            {discount && (
              <div className="term">
                <p>기간</p>
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
            )}
          </div>
        </div>
        <div className="info">
          <div className="title">상세설명</div>
          <textarea name="info" placeholder="상세설명 입력" />
        </div>
      </div>
      <div className="sizeguide container">
        <div className="title">사이즈 가이드</div>
        <textarea name="size" placeholder="사이즈가이드 입력" />
      </div>
      <div className="color container">
        <div className="title">색상</div>
        <div className="color_list">
          <div className="wrap">
            {color.map((item, index) => (
              <div className="color" key={index}>
                <div className="minus" onClick={() => handleRemoveColor(index)}>
                  -
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="plus_color">
            <input
              type="text"
              placeholder="컬러 이름"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
            <button onClick={handleAddColor}>추가</button>
          </div>
        </div>
      </div>
      {color.map((item, index) => (
        <ColorDetail name={item} key={index} />
      ))}
    </div>
  );
};

export default Goods;
