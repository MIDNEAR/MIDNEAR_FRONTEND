import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MyPageModal from '../MyPageModal';
import Modal from '../../User/Modal/Modal';
import { Link } from 'react-router-dom';

const InfoChange = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [socialType, setSocialType] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const modalRef = useRef();
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');

  // Load user info
  useEffect(() => {
    axios
      .get(`${DOMAIN}/user/user-info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          const userInfo = res.data.data;
          setName(userInfo.name || '');
          setEmail(userInfo.email || '');
          setPhone(userInfo.phoneNumber || '');
          setId(userInfo.id || '');
          setSocialType(userInfo.socialType);
        }
      })
      .catch((error) => console.error(error.message));
  }, [DOMAIN, token]);

  // Load address list
  useEffect(() => {
    axios
      .get(`${DOMAIN}/delivery/getAddrList`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setAddressList(res.data);
          console.log(res.data)
        }
      })
      .catch((error) => console.error("Failed to load addresses:", error));
  }, [DOMAIN, token]);

  // Update user info
  const ChangeInfo = () => {
    axios
      .put(`${DOMAIN}/user/change-user-info`, { id, name, phoneNumber: phone, email }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("정보가 성공적으로 변경되었습니다.");
        }
      })
      .catch((error) => {
        console.error("정보 변경 실패:", error.message);
        setError("정보 변경에 실패했습니다.");
      });
  };

  // Delete Address
  const deleteAddress = (addressId) => {
    axios
      .delete(`${DOMAIN}/delivery/deleteAddr/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("배송지가 삭제되었습니다.");
          setAddressList((prev) => prev.filter((addr) => addr.id !== addressId));
        }
      })
      .catch((error) => console.error("삭제 실패:", error));
  };

  return (
    <div className='container'>
      <div className='field_container'>
        <MyPageModal />
        <div className='field_container_content'>
          <div className='mypage_title'>내 정보 변경</div>

          <input type='text' className='mypage_input_field_top' placeholder='이름'
            onChange={(e) => setName(e.target.value)} value={name} disabled={socialType !== null} />
          <input type='text' className='mypage_input_field' placeholder='이메일'
            onChange={(e) => setEmail(e.target.value)} value={email} disabled={socialType !== null} />
          <input type='text' className='mypage_input_field' placeholder='휴대폰'
            onChange={(e) => setPhone(e.target.value)} value={phone} />

          {!error && <p className='error_message'>{error}</p>}

          <button className='submit_button' onClick={ChangeInfo}>변경 사항 저장하기</button>

          <div className='mypage_title'>배송지 관리</div>

          {addressList.length > 0 ? (
            addressList.map((address) => (
              <div key={address.id} className='post_info-container'>
                <div>
                  <div className='post_info-name'>{address.recipient}</div>
                  <div className='post_info-number'>{address.recipientContact}</div>
                  <div className='post_info-address'>{address.address}</div>
                  <div className='post_info-address-detail'>{address.detailAddress}</div>
                  <div className='post_info-post-number'>({address.postalCode})</div>
                </div>

                <div className='button_place'>
                  <Link to='/mypage/userinformaiton/address' className='correction'>수정</Link>
                  <button className='delete' onClick={() => deleteAddress(address.id)}>삭제</button>
                </div>
              </div>
            ))
          ) : (
            <div  className='post_info-container'>
              <p>저장된 배송지가 없습니다.</p>
              </div>
            
          )}

          <Link to='/mypage/userinformaiton/address' className='submit_button'>배송지 추가하기</Link>

          <Modal ref={modalRef} />
        </div>
      </div>
    </div>
  );
};

export default InfoChange;
