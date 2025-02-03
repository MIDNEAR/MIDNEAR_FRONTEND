import React, { useState } from 'react';
// import '../../../assets/sass/manager/magazine/_magazine-create.scss';

const MagazineCreateComponent = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImage = URL.createObjectURL(file);
            setImages([...images, newImage]);
        }
    };

    const handleImageRemove = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleSubmit = () => {
        alert('매거진 작성 완료!');
    };

    return (
        <div className='mcc'>
        <div className="magazine-create-container">
            <div className="magazine-create-title">
                <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    className="magazine-title-input"
                />
            </div>

            <div className="magazine-images">
                <div className="magazine-image-scroll">
                    {images.map((image, index) => (
                        <div key={index} className="magazine-image-container">
                            <img src={image} alt={`Uploaded ${index}`} className="magazine-image" />
                            <button
                                className="magazine-remove-btn"
                                onClick={() => handleImageRemove(index)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <div className="magazine-add-image">
                        <input
                            type="file"
                            accept="image/*"
                            id="image-upload"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload" className="magazine-upload-btn">
                            +
                        </label>
                    </div>
                </div>
            </div>

            <div className="magazine-create-content">
                <textarea
                    placeholder="내용을 입력해주세요"
                    className="magazine-content-textarea"
                />
            </div>
        </div>
        <div className="magazine-create-actions">
            <button onClick={handleSubmit} className="mcc-submit-btn">작성 완료</button>
        </div>
        </div>

        
    );
};

export default MagazineCreateComponent;