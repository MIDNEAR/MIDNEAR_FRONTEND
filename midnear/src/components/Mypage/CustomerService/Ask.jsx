import React, { useRef } from 'react'
import MyPageModal from '../MyPageModal'
import Modal from '../../User/Modal/Modal';

const Ask = () => {

    const modalRef = useRef();

    const showSuccessModal = () => {
        modalRef.current.openModal(
          "문의가 작성되었습니다.",
          "/mypage/question/list"
        );
      };

  return (
    <div className='container'>
        <div className='field_container'>
            <MyPageModal />
            <div className='field_container_content'>
                <div className="inquiry-form">
                    <h1>고객지원/1:1문의</h1>
                    <form>
                        <input type="text" name="title" placeholder="제목을 입력하세요" />

                        <textarea id="content" name="content" placeholder="문의 내용을 입력하세요"></textarea>

                        <div className="submit_field-ask">
                            <div className='check_field-ask'>
                            <input type='checkbox' className='check-ask'/>
                            <p>비공개로 작성하기</p>
                            </div>
                            <button className='ask_submit' onClick={showSuccessModal}>글쓰기</button>
                        </div>
                    </form>
                </div>
                <Modal ref={modalRef} />
            </div>
        </div>
    </div>
  )
}

export default Ask