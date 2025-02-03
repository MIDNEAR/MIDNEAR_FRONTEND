import React from 'react';

const Modal = ({ selectedItem, editorContent, setEditorContent, handleSave, handleCloseModal }) => {
    return (
        <div className="qm-modal-overlay">
            <div className="qm-modal-content">
                <p>1:1 문의 답글</p>

                {/* 2개의 가로 영역 (왼쪽 gray900, 오른쪽 흰색) */}
                <table className="qm-modal-table">
                    <tbody>
                        <tr>
                            <td className="qm-left-column">제목</td>
                            <td>{selectedItem.title}</td>
                        </tr>
                        <tr>
                            <td className="qm-left-column">작성자</td>
                            <td>{selectedItem.writer}</td>
                        </tr>
                        <tr>
                            <td className="qm-left-column">게시일</td>
                            <td>{selectedItem.date}</td>
                        </tr>
                        <tr>
                            <td className="qm-left-column">조회수</td>
                            <td>{selectedItem.views}</td>
                        </tr>
                    </tbody>
                </table>

                {/* 내용과 편집 공간 */}
                <div className="qm-content">
                    <p>{selectedItem.content}</p>
                    <div className="qm-divider" />
                    
                    {/* 버튼과 텍스트 영역을 나란히 배치 */}
                    <div className="qm-editor-container">
                        <textarea
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                        />
                        <button
                            onClick={handleSave}
                            type="submit"
                            className="qm-submit-btn"
                        >
                            등록
                        </button>
                    </div>
                </div>
                <button onClick={handleCloseModal} className="qm-close-btn">
                    닫기
                </button>
            </div>
        </div>
    );
};

export default Modal;