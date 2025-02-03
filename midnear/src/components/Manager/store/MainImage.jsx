import React, { useState } from 'react';
import Modal from '../Modals/Modal';

const MainImage = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setIsModalOpen(true); 
      };

    const handleConfirm = () => {
        setIsCompleted(true);
        setIsModalOpen(false);

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mainImage">
            <div className="file">
                <h5>메인화면 이미지 수정</h5>
                <label htmlFor="file-upload" >
                    첨부파일
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <p>{fileName}</p>
            </div>

            <div className="image">
                {previewImage ? (
                    <img
                        src={previewImage}
                    />
                ) : (
                    <p> </p>
                )}
            </div>

            <div className="btn" onClick={handleSave}>완료</div>
            <Modal
                show={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
            />
        </div>

    );
};

export default MainImage;
