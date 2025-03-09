import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

const ColorDetail = ({ name, onUpdate }) => {
    const [sizeList, setSizeList] = useState([]);
    const [newSize, setNewSize] = useState("");
    const [newStock, setNewStock] = useState("");
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState("");


    useEffect(() => {
        onUpdate({ color: name, sizes: sizeList, images, thumbnail });
    }, [images]); 


    const handleAddSize = () => {
        if (newSize.trim() === "" || newStock.trim() === "") {
            alert("사이즈와 수량을 모두 입력해주세요!");
            return;
        }
        const updatedSizes = [...sizeList, { size: newSize.trim(), stock: parseInt(newStock) }];
        setSizeList(updatedSizes);
        setNewSize("");
        setNewStock("");

        onUpdate({ color: name, sizes: updatedSizes, images, thumbnail });
    };


    const handleRemoveSize = (index) => {
        const updatedSizes = sizeList.filter((_, i) => i !== index);
        setSizeList(updatedSizes);

        onUpdate({ color: name, sizes: updatedSizes, images, thumbnail });
    };


    const handleThumbnailChange = (imageUrl) => {
        setThumbnail(imageUrl);
        console.log(`📌 ${name} 색상의 썸네일 변경:`, imageUrl);
        onUpdate({ color: name, sizes: sizeList, images, thumbnail: imageUrl });
    };


    const handleImageUpload = (uploadedImages) => {
        if (uploadedImages.length === 0) {
            console.warn(`⚠️ ${name} 색상의 이미지가 추가되지 않았습니다.`);
            return;
        }

        setImages(uploadedImages); // ✅ 상태 업데이트

        console.log(`📌 ${name} 색상의 추가된 이미지:`, uploadedImages.map(file => file.name));
    };

    return (
        <div className="color_detail container">
            <div className="color_name">{name}</div>

      
            <div className="title">사이즈 및 수량</div>
            <div className="add_size">
                <div className="size_list">
                    {sizeList.map((item, index) => (
                        <div className="size" key={index}>
                            <div className="minus" onClick={() => handleRemoveSize(index)}>
                                -
                            </div>
                            <p>{item.size} / {item.stock}개</p>
                        </div>
                    ))}
                </div>
                <div className="plus_size">
                    <input type="text" placeholder="사이즈" value={newSize} onChange={(e) => setNewSize(e.target.value)} />
                    <input type="number" placeholder="수량" value={newStock} onChange={(e) => setNewStock(e.target.value)} />
                    <button onClick={handleAddSize}>추가</button>
                </div>
            </div>


            <div className="title">상품 이미지 
                <p>1번 이미지는 썸네일, 2번 이미지는 hover 이미지로 적용됩니다.</p>
            </div>
            <div className="images">
                <ImageUpload 
                    onThumbnailSelect={handleThumbnailChange} 
                    onImageUpload={handleImageUpload} 
                />
            </div>


            <div className="image-preview">
                {images.map((img, idx) => (
                    <p key={idx}>{img.name}</p>
                ))}
            </div>
        </div>
    );
};

export default ColorDetail;
