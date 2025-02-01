import React, {useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import OrderList from '../OrderList'
import StepHeader from '../StepHeader'
import PrivacyModal from './PrivacyModal'
import check from '../../../assets/img/cart/check.svg'

const NoMemInfo = () => {    
    const location = useLocation();
    const items = location.state?.items || [];
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState([]);
    
    const [name, setName] =useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [memo, setMemo] = useState('');
    const [receiver, setReceiver] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [receiverNum, setReceiverNum] = useState('');
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    
    useEffect(() => {
        const areFieldsFilled = name.trim() !== '' && phone.trim() !== '' && receiver.trim() !== '' && receiverNum.trim() !== '';
        const isPrivacyChecked = isChecked.includes(2);
        setIsButtonEnabled(areFieldsFilled && isPrivacyChecked);
     }, [name, phone, receiver, receiverNum, isChecked]);
    
     const checkItemHandler = (id, isChecked) => {
        setIsChecked((prev) =>
            isChecked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
          );
      };
    
      const isCheckItem = (e, id) => {
        const { checked } = e.target;
        checkItemHandler(id, checked);
      };

  return (
    <div className='no-member'>
    <div className='info'>
        <StepHeader />
        <div className='container'>
            <div className='empty'></div>
            <div className='info_content'>
                <div className='mid_text'>주문자 정보</div>
                <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>

                <input type='text' name='name' className='min_text' placeholder='홍길동*'  onChange={(e) => setName(e.target.value)}/>
                <input type='text' name='phone' className='min_text' placeholder='010-9999-9999*' onChange={(e) => setPhone(e.target.value)}/>
                <input type='text' name='email' className='min_text' placeholder='이메일'  onChange={(e) => setEmail(e.target.value)}/>

                <div className='bottom'>
                <div className='title'>배송 정보</div>
                <input type='text' name='receiver' className='min_text' placeholder='수취인*'  onChange={(e) => setReceiver(e.target.value)}/>
                <input type='text' name='receiverNum' className='min_text' placeholder='수취인 번호*'  onChange={(e) => setReceiverNum(e.target.value)}/>
                <input type='text' name='memo' className='min_text' placeholder='배송 메모를 입력해 주세요.'  onChange={(e) => setMemo(e.target.value)}/>
                <div className='post_code'>
                    <input type='text' name='postNum' className='text' placeholder='*우편번호' disabled />
                    <div className='search'>우편번호 검색</div>
                </div>
                <input type='text' name='firstAdd' className='min_text' placeholder='*주소' disabled/>
                <input type='text' name='secondAdd' className='min_text' placeholder='상세주소 입력' />
                </div>
                
                <div className='check'>
                    <label className='checkbox'>
                        <input type='checkbox' name='checkbox' className='default' 
                         id={1}
                         checked={isChecked.includes(1)}
                         onChange={(e) => isCheckItem(e, 1)}
                         />
                         {isChecked.includes(1) && ( 
                             <img src={check} className='checkImg'/>
                         )}
                    </label>
                    <p>기본 배송지로 설정</p>
                 </div>
                 <div className='check'>
                     <label className='checkbox'>
                         <input type='checkbox' name='checkbox' className='agree' 
                         id={2}
                         checked={isChecked.includes(2)}
                         onChange={(e) => isCheckItem(e, 2)} 
                         />
                         {isChecked.includes(2)  && ( 
                             <img src={check} className='checkImg'/>
                         )}
                    </label>
                    <p className='privacy' onClick={openModal}>[필수] 개인정보 수집 및 이용 동의</p>
                    <PrivacyModal isOpen={isModalOpen} closeModal={closeModal} setIsChecked={setIsChecked} isChecked={isChecked}  />
                </div>
                <Link to='/order/pay-succeed' className='pay-link'>
                <button 
                    className={`btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                    disabled={!isButtonEnabled}
                >
                    결제하기
                </button>
                </Link>
            </div>

            <div className='order_content'> </div>
        </div>
    </div>
    </div>
  )
}

export default NoMemInfo