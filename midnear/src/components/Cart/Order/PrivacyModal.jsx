import React from 'react'
import Close from '../../../assets/img/product/close.svg'

const PrivacyModal = ({isOpen, closeModal, setIsChecked, isChecked}) => {
    const handleAgree = () => {
        setIsChecked((prev) => (prev.includes(2) ? prev : [...prev, 2])); // ID 2 추가
        closeModal();
      };
    
      const handleDisagree = () => {
        setIsChecked((prev) => prev.filter((itemId) => itemId !== 2)); // ID 2 제거
        closeModal();
      };
    
  return (
    <div className='PrivacyModal'>
    <div className='ShippingModal' style={{display:isOpen ? "flex" : "none"}}>
        <div className='modal'>
                <div className='modal-top'>
                    <h2>개인정보 수집 및 이용 목적</h2>
                    <img src={Close} onClick={closeModal} className='close'/>
                </div>
                <div className='content'>
                    <p>{`1. 개인정보 수집 및 이용 목적
(1) 비회원 구매 서비스 제공
비회원 구매에 따른 본인 확인, 물품 배송, 서비스 제공, 계약서․청구서 발송, 본인인증, 연령인증, 요금결제 및 정산, 채권추심, 서비스 부정 이용 방지, 각종 고지 및 통지 등의 목적

(2) 고충처리
민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등

2. 수집하는 개인정보 항목
성명, 주소, 휴대폰번호, 이메일, 결제 정보

3. 개인정보 보유 및 이용 기간
전자상거래법 등 관계 법령에 의거 구매 후 5년간 보관

※ 동의를 거부할 수 있으나 거부 시 비회원 구매 서비스 이용이 불가합니다.`}
                    </p>
                </div>
                <div className='modal-bottom'>
                    <div onClick={handleDisagree}>동의하지않음</div>
                    <div onClick={handleAgree}>동의함</div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default PrivacyModal