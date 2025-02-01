import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PrivacyModal from './PrivacyModal'
import check from '../../../assets/img/cart/check.svg'
import StepHeader from '../StepHeader'

const NewAddress = () => {    
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [receiver, setReceiver] = useState('');
    const [receiverNum, setReceiverNum] = useState('');
    const [destination, setDestination] = useState('');
    const [isChecked, setIsChecked] = useState([]);
    
    const selectAdd = () => {
        navigate('/order/delivery/select-address');
    };

    const newAdd = () => {
        navigate('/order/delivery/new-address');
    };

    useEffect(() => {
        const areFieldsFilled = receiver.trim() !== '' && receiverNum.trim() !== '' && receiver.trim() !== '' && receiverNum.trim() !== '';
        const isPrivacyChecked = isChecked.includes(2);
        setIsButtonEnabled(areFieldsFilled && isPrivacyChecked);
    }, [receiver, receiverNum, isChecked]);

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
    <div className='address'>
    <StepHeader />
    <div className='container'>
        <div className='find'>
            <div className='title'>배송 정보 변경</div>
            <div className='select_content'>
                <div className='unactivate_box' onClick={selectAdd}>
                    배송지 선택
                </div>
                <div className='activate_box' onClick={newAdd}>
                    신규입력
                </div>
                <div className='empty'></div>
            </div>

            <div className='bottom'>
                <input type='text' name='receiver' className='min_text' placeholder='수취인명*'  onChange={(e) => setReceiver(e.target.value)}/>
                <input type='text' name='receiverNum' className='min_text' placeholder='수취인 번호*' onChange={(e) => setReceiverNum(e.target.value)}/>
                <input type='text' name='destination' className='min_text' placeholder='배송지명' onChange={(e) => setDestination(e.target.value)} />
                <div className='post_code'>
                    <input type='text' name='postNum' className='text' placeholder='*우편번호' disabled />
                    <div className='search'>우편번호 검색</div>
                </div>
                <input type='text' name='firstAdd' className='min_text' placeholder='*주소' disabled/>
                <input type='text' name='secondAdd' className='min_text' placeholder='상세주소 입력' />
                
                <input type='text' name='memo' className='min_text' placeholder='배송 메모를 입력해 주세요.' />
            </div>
                
            <div className='check'>
                <label className='checkbox'>
                    <input type='checkbox' name='checkbox' className='default' 
                    id={1}
                    checked={isChecked.includes(1)}
                    onChange={(e) => isCheckItem(e, 1)}
                    />
                    {isChecked.includes(1) && ( 
                        <img src={check} alt='check' className='checkImg'/>
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
                        <img src={check} alt='check' className='checkImg'/>
                    )}
                </label>
                <p className='privacy' onClick={openModal}>[필수] 개인정보 수집 및 이용 동의</p>
                <PrivacyModal isOpen={isModalOpen} closeModal={closeModal} setIsChecked={setIsChecked} isChecked={isChecked}  />
            </div>
            <Link to='/order/delivery/select-address'>
            <button 
            className={`btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
            disabled={!isButtonEnabled}
            >
                저장
            </button>
            </Link>
        </div>
        
    </div>
    </div>
  )
}

export default NewAddress