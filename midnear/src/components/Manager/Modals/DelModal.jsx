import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DelModal = ({show, onClose, onConfirm}) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(0);
    const ment = ["삭제하시겠습니까?", "삭제가 완료되었습니다."]
    if (!show) return null;

    const handleClose = () => {
        onConfirm();
        onClose();
        setModal(0);
    };

    const nextModal = () => {
        setModal(1);
    }
    return (
        <div className='store_modal'>
            <div className="wrap">
                <div className="modal">
                    <div className="ment">{ment[modal]}</div>
                    {modal === 0 ?
                        <>
                            <div className="btns">
                                <div className="no_btn" onClick={handleClose}>아니요</div>
                                <div className="yes_btn" onClick={nextModal}>네</div>
                            </div>

                        </>
                        :
                        <>
                            <div className="btns">
                                <div className="check_btn" onClick={handleClose}>확인</div>
                            </div>
                        </>
                    }
                </div>

            </div>


        </div >
    )
  
}

export default DelModal
