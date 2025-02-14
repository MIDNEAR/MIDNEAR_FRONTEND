import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {useDaumPostcodePopup}  from 'react-daum-postcode';
import axios from 'axios';
import PrivacyModal from './PrivacyModal'
import check from '../../../assets/img/cart/check.svg'
import StepHeader from '../StepHeader'

const NewAddress = () => {       
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const token = localStorage.getItem('jwtToken');
    
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    
    const [receiver, setReceiver] = useState('');
    const [receiverNum, setReceiverNum] = useState('');
    const [destination, setDestination] = useState('');
    const [zonecode, setZonecode] = useState(''); 
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [memo, setMemo] = useState('');
    const [isChecked, setIsChecked] = useState([]);
    const [defaultAddressStatus, setDefaultAddressStatus] = useState(0);

    const postcodeScriptUrl =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(postcodeScriptUrl);
    const completeHandler = (data) => {
        const { address,zonecode, bname, buildingName } = data;
        let extraAddress = "";
        let fullAddress = "";
        if(data.addressType === "R"){
            if(bname !== ""){
                extraAddress += bname;
            };
            if(buildingName !== ""){
                if(extraAddress !== ""){
                    extraAddress += `,${buildingName}`;
                } else {extraAddress += buildingName;}
            };
            if(extraAddress !== ""){
                fullAddress = address + `(${extraAddress})`;
            }
        }
        setZonecode(zonecode);
        setAddress(fullAddress);
    };
        
    const toggleHandler = () => {
        open({ onComplete: completeHandler });
    };

    const selectAdd = () => {
        navigate('/order/delivery/select-address');
    };

    const newAdd = () => {
        navigate('/order/delivery/new-address');
    };

    useEffect(() => {
        const areFieldsFilled = receiver.trim() !== '' && receiverNum.trim() !== ''  && zonecode.trim() !== ''  && address.trim() !== '';
        const isPrivacyChecked = isChecked.includes(2);
        setIsButtonEnabled(areFieldsFilled && isPrivacyChecked);
    }, [receiver, receiverNum, zonecode, address, isChecked]);

    const checkItemHandler = (id, isChecked) => {
        setIsChecked((prev) =>
            isChecked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
          );
    };
    
    const isCheckItem = (e, id) => {
      const { checked } = e.target;
      if (id === 1) {
        setDefaultAddressStatus(checked ? 1 : 0); 
      }
      checkItemHandler(id, checked);
    };

    const handleReceiverNumChange = (e) => {
        let input = e.target.value.replace(/[^0-9]/g, '');
        if (input.length > 3 && input.length <= 7) {
            input = `${input.slice(0, 3)}-${input.slice(3)}`;
        } else if (input.length > 7) {
            input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
        }
        setReceiverNum(input);
    };

    // 배송지 신규 입력
    const postNewAddr = () => {
        const formattedReceiverNum = receiverNum.replace(/-/g, ''); 
        axios.post(`${DOMAIN}/delivery/createAddr`,{
            deliveryAddressId: 0,
            recipient: receiver,
            recipientContact: formattedReceiverNum,
            deliveryName: destination,
            postalCode: zonecode,
            address: address,
            detailAddress: detailAddress,
            defaultAddressStatus: defaultAddressStatus,
            deliveryRequest: memo,
            userId: 0,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        .then((res) => {
          if(res.status === 200){
            console.log('배송지 등록 성공:', res.data.data);
          };
        })
        .catch((error) => {
          console.error('배송지 등록 실패:', error.message);
        });
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
                <input type='text' name='receiver' className='min_text' placeholder='수취인명*' value={receiver} onChange={(e) => setReceiver(e.target.value)}/>
                <input type='text' name='receiverNum' className='min_text' placeholder='수취인 번호*' value={receiverNum}  onChange={handleReceiverNumChange}/>
                <input type='text' name='destination' className='min_text' placeholder='배송지명' value={destination} onChange={(e) => setDestination(e.target.value)} />
                <div className='post_code'>
                    <input type='text' name='postNum' className='text' placeholder='*우편번호' disabled value={zonecode}/>
                    <div className='search'  onClick={toggleHandler}>우편번호 검색</div>
                </div>
                <input type='text' name='firstAdd' className='min_text' placeholder='*주소' disabled value={address}/>
                <input type='text' name='secondAdd' className='min_text' placeholder='상세주소 입력' value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)}/>
                
                <input type='text' name='memo' className='min_text' placeholder='배송 메모를 입력해 주세요.' value={memo}  onChange={(e) => setMemo(e.target.value)}/>
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
                onClick={postNewAddr}
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