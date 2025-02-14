import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modals/Modal';
import axios from 'axios';


const Logo = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [fileName, setFileName] = useState("");
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');


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

        const formData = new FormData();
        const fileInput = document.getElementById("file-upload");

        if (fileInput.files.length > 0) {
            formData.append("file", fileInput.files[0]);

            axios
                .post(`${DOMAIN}/storeManagement/modify/logoImage`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.error("이미지 업로드 실패:", error.response || error.message);
                });
        } else {
            alert("업로드할 파일을 선택해 주세요.");
        }


    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchdata();
    }, [navigate, isCompleted]);

    const fetchdata = () => {
        axios
            .get(`${DOMAIN}/storeManagement/getLogoImage`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setFileName(response.data.data.imageName)
                    setImage(response.data.data.imageUrl)
                }
            })
            .catch((error) => {

            });
    }


    return (
        <div className="logo container">
            <div className="file">
                <h5>로고 수정</h5>
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
                    <img
                    src={image}
                />
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
}

export default Logo
