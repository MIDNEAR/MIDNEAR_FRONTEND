import React, { useState } from "react";
import axios from "axios";
import ColorDetail from "./ColorDetail";
import SelectCate from "./SelectCate";

const Goods = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(false);
  const [discountRate, setDiscountRate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [detail, setDetail] = useState("");
  const [sizeGuide, setSizeGuide] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [images, setImages] = useState([]);

  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem("jwtToken");

  const handleAddColor = () => {
    if (newColor.trim() === "") return;
    setColors([...colors, { color: newColor.trim(), sizes: [], images: [] }]);
    setNewColor("");
  };


  const handleRemoveColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleUpdateColorDetail = (index, updatedData) => {
    setColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[index] = { 
            ...newColors[index], 
            ...updatedData 
        };
        console.log(`📌 색상 업데이트됨 (${newColors[index].color}):`, newColors[index]);
        return newColors;
    });
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
    return Math.floor(price - price * (discountRate / 100)).toLocaleString();
  };

  const handleRegisterProduct = async () => {
    if (!productName || !price || !categoryId) {
        console.log("❌ 필수 입력 값 누락:", { productName, price, categoryId });
        alert("상품명, 가격, 카테고리는 필수 입력 항목입니다.");
        return;
    }

    const discountPrice = discount ? price - price * (discountRate / 100) : 0;
    const formData = new FormData();

    // ✅ 기본 상품 정보 추가
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("discountPrice", discount ? discountPrice : 0);
    formData.append("discountRate", discount ? discountRate : 0);
    formData.append("discountStartDate", discount ? startDate : null);
    formData.append("discountEndDate", discount ? endDate : null);
    formData.append("detail", detail);
    formData.append("sizeGuide", sizeGuide);
    formData.append("categoryId", categoryId);

    console.log("📌 상품 데이터 FormData 추가 완료");

    // ✅ 색상별 데이터 추가
    colors.forEach((item, index) => {
        formData.append(`colors[${index}][color]`, item.color);
        item.sizes.forEach((size, sizeIndex) => {
            formData.append(`colors[${index}][sizes][${sizeIndex}][size]`, size.size);
            formData.append(`colors[${index}][sizes][${sizeIndex}][stock]`, size.stock);
        });

        // ✅ 이미지 추가
        if (item.images && item.images.length > 0) {
            item.images.forEach((image, imgIndex) => {
                formData.append(`colors[${index}][productImages]`, image);
                console.log(`📌 ${item.color} 색상의 추가된 이미지 ${imgIndex}:`, image.name);
            });
        } else {
            console.warn(`⚠️ ${item.color} 색상에 이미지가 없습니다.`);
        }
    });

    console.log("📌 최종 FormData 확인:", formData);

    try {
        const response = await axios.post(`${DOMAIN}/productManagement/registerProducts`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            alert("✅ 상품 등록 성공!");
        } else {
            alert("❌ 상품 등록 실패");
        }
    } catch (error) {
        console.error("❌ 상품 등록 오류:", error.response ? error.response.data : error);
        alert("상품 등록 중 오류 발생!");
    }
};



  return (
    <div className="add_goods">
  <SelectCate onCategorySelect={(id) => {
    setCategoryId(id);  
}} />


      <div className="goods_name container">
        <div className="title">상품명</div>
        <input
          type="text"
          placeholder="상품명 입력"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
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
          <textarea
            placeholder="상세설명 입력"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
      </div>
      <div className="sizeguide container">
        <textarea
          placeholder="사이즈가이드 입력"
          value={sizeGuide}
          onChange={(e) => setSizeGuide(e.target.value)}
        />
      </div>
      <div className="color container">
        <div className="title">색상</div>
        <div className="color_list">
          <div className="wrap">
            {colors.map((item, index) => (
              <div className="color" key={index}>
                <div className="minus" onClick={() => handleRemoveColor(index)}>
                  -
                </div>
                <p>{item.color}</p>
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
      {colors.map((item, index) => (
        <ColorDetail
          key={index}
          name={item.color}
          onUpdate={(data) => handleUpdateColorDetail(index, data)}
        />
      ))}

      <div className="btn" onClick={() => handleRegisterProduct()}>등록 완료</div>
    </div>
  );
};

export default Goods;
