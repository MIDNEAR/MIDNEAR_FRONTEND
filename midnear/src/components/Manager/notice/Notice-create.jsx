import React, { useState } from 'react';
// import '../../../assets/sass/manager/magazine/_magazine-create.scss';

const NoticeCreateComponent = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    // 제목 입력 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // 내용 입력 핸들러
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // 이미지 파일 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

    // 제출 버튼 클릭 시
    const handleSubmit = () => {
        alert('공지사항 작성 완료!');
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('Attached Image:', image);
    };

    return (
        <div className="nc">
            <div className="nc-create-container">
                {/* 제목 입력 */}
                <div className="nc-create-title">
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력해주세요"
                        className="nc-title-input"
                    />
                </div>
                <div className="nc-idtime">
                    <div>관리자</div>
                    <div>2024-01-22 15:35</div>
                </div>

                {/* 첨부파일 추가 */}
                <div className="nc-add-file">
                    <input
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        onChange={handleImageUpload}
                    />
                </div>

                {/* 첨부된 이미지 미리보기 */}
                {image && (
                    <div className="notice-image-preview">
                        <img src={image} alt="Uploaded preview" className="notice-image" />
                    </div>
                )}

                {/* 내용 입력 */}
                <div className="nc-create-content">
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        placeholder="내용을 입력해주세요"
                        className="nc-content-textarea"
                    />
                </div>
            </div>

            {/* 등록 완료 버튼 */}
            <div className="nc-create-actions">
                <button onClick={handleSubmit} className="nc-submit-btn">
                    등록 완료
                </button>
            </div>
        </div>
    );
};

export default NoticeCreateComponent;