import React, { useState, useRef, useEffect } from "react";

const ImageUpload = ({ onThumbnailSelect }) => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const scrollContainerRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [maxScroll, setMaxScroll] = useState(100);

  const handleImageClick = (image) => {
    if (onThumbnailSelect) {
      onThumbnailSelect(image); 
    }
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleCheckboxChange = (index) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((id) => id !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleRemoveSelectedImages = () => {
    setImages(images.filter((_, index) => !selectedImages.includes(index)));
    setSelectedImages([]);
  };

  const handleSelectAll = () => {
    const allIndexes = images.map((_, index) => index);
    setSelectedImages(allIndexes);
  };

  const handleDeselectAll = () => {
    setSelectedImages([]);
  };

  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        const maxScrollLeft =
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        setMaxScroll(maxScrollLeft);
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    return () => {
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, [images]);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setScrollValue(value);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = value;
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollValue(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <div className="image-uploader">
      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-button">
          <span>첨부파일</span>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>

      {images.length > 0 && (
        <>
          <div className="image-preview" ref={scrollContainerRef} onScroll={handleScroll}>
            {images.map((image, index) => (
              <div key={index} className="image-container">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  className="checkbox"
                />
                <img src={image} alt={`preview-${index}`} 
                onDoubleClick={() => handleImageClick(image)} />
              </div>
            ))}
          </div>


          <div className="scrollbar">
            <div className="circle left"></div>

            <input
              type="range"
              min="0"
              max={maxScroll}
              value={scrollValue}
              onChange={handleSliderChange}
              className="scroll-slider"
            />

            <div className="circle right"></div>
          </div>
        </>
      )}

      <div className="btns">
        <button onClick={handleSelectAll}>전체 선택</button>
        <button onClick={handleDeselectAll}>선택 취소</button>
        <button onClick={handleRemoveSelectedImages}>삭제</button>
      </div>
    </div>
  );
};

export default ImageUpload;
