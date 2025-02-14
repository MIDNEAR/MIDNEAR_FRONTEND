import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import StepHeader from '../StepHeader';
import { DelModal } from './DelModal';
 
const SelectAdd = () => {    
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');

  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [defaultStatus, setDefaultStatus] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);    
  const openModal = (id, status) => {
    setSelectedAddress(id);
      setDefaultStatus(status === 1);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  const selectAdd = () => {
    navigate('/order/delivery/select-address');
  };
  const newAdd = () => {
    navigate('/order/delivery/new-address');
  };
  const changeAdd = () => {
    changeDefaultAddr();
    navigate('/order/delivery/member');
  };
  
  // 배송지 리스트 가져오기
  const loadAddrList = () => {
    axios.get(`${DOMAIN}/delivery/getAddrList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setAddressList(res.data.data);
        console.log('배송지 리스트 조회 성공:', res.data.data);
      };
    })
    .catch((error) => {
      console.error('배송지 리스트 조회 실패:',error.response ||  error.message);
    });
  };
  useEffect(()=>{
    loadAddrList(token);
  },[token]);

  // 배송지 삭제하기    
  const deleteAddress =() => {
    deleteAddr();
    setAddressList((prev) => prev.filter((address) => address.deliveryAddressId !== selectedAddress));
    closeModal();
  };
  const deleteAddr = () => {
    axios.delete(`${DOMAIN}/delivery`, {
        params: {addrId: selectedAddress},
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
      .then((res) => {
        if(res.status === 200){
            console.log('삭제 완료');
            return true;
        };
      })
      .catch((error) => {
        console.log(selectedAddress);
        console.error('삭제 실패:', error.response || error.message);
      })
  };
  // 기본 배송지로 변경하기
  const changeDefaultAddr= async() => {
    console.log('기본 배송지 변경 요청');
    await axios.patch(`${DOMAIN}/delivery/setDefault`, 
      null, 
      {
        params: {deliveryAddrId: selectedAddress}, 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res)=>{
      if(res.status === 200){
        console.log('기본 배송지로 변경');
      } 
    })
    .catch((error) => {
      console.error('기본 배송지 변경 실패:', error.response || error.message);
    })
  };

  return (
    <div className={`address ${isModalOpen ? 'modal-open' : ''}`}>
    <StepHeader />
    <div className='container'>
        <div className='find'>
            <div className='title'>배송 정보 변경</div>
            <div className='select_content'>
                <div className='activate_box' onClick={selectAdd}>
                    배송지 선택
                </div>
                <div className='unactivate_box' onClick={newAdd}>
                    신규입력
                </div>
                <div className='empty'></div>
            </div>
            <div className='addList'>
                {addressList.map((item)=>(
                <div className='default_add' key={item.deliveryAddressId}>
                  <label
                    className={`radio-label ${selectedAddress === item.deliveryAddressId ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={item.deliveryAddressId}
                      checked={selectedAddress === item.deliveryAddressId}
                      onChange={() => setSelectedAddress(item.deliveryAddressId)}
                    />
                    <div className='left'>
                        <div className='userInfo'>
                        <div>
                            <div className='desti-info'>
                                <p className='b_txt'>{item.recipient}</p>
                                {item.defaultAddressStatus === 1 && (
                                    <div>기본</div>
                                )}
                                <div>{item.deliveryName}</div>
                            </div>
                            <p className='g_txt'>{item.recipientContact}</p>
                        </div>
                        <div className='edit'>
                            <div className='edit-btn' onClick={() => openModal(item.deliveryAddressId, item.defaultAddressStatus )}>삭제</div>
                            <DelModal isOpen={isModalOpen} closeModal={closeModal} deleteAddress={deleteAddress} defaultStatus={defaultStatus}/>
                        </div>
                        </div>
                    
                        <p className='b_txt'>{item.address}</p>
                        <p className='b_txt'>{item.detailAddress}</p>
                        <p className='g_txt'>({item.postalCode})</p>
                    </div>
                </label>
                </div>
                ))}
                <button className='add-btn'  onClick={changeAdd}>기본 배송지 변경하기</button>
            </div>
        </div>
        
    </div>
    </div>
  )
}

export default SelectAdd