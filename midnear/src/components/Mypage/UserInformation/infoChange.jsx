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
  const modalRef = useRef();
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const token = localStorage.getItem('jwtToken');

  const showSuccessModal = () => {
    modalRef.current.openModal(
      '배송 정보를 정말 삭제할까요?',
      '/mypage/userinformaiton/userinfo/changing'
    );
  };

  useEffect(() => {
    axios
      .get(`${DOMAIN}/user/user-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      .catch((error) => {
        console.error(error.message);
      });
  }, [DOMAIN, token]);


  const ChangeInfo = () => {
    axios
      .put(
        `${DOMAIN}/user/change-user-info`,
        { 
          id: id,
          name: name,
          phoneNumber: phone,
          email: email,
        },
        {  
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('정보 변경 성공:', response.data);
        }
      })
      .catch((error) => {
        console.error('정보 변경 실패:', error.message);
        setError('정보 변경에 실패했습니다.');
      });
  };
  

  return (
    <div className='container'>
      <div className='field_container'>
        <MyPageModal />
        <div className='field_container_content'>
          <div className='mypage_title'>내 정보 변경</div>

          <input
            type='text'
            className='mypage_input_field_top'
            placeholder='이름'
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={socialType !== null}
          />
          <input
            type='text'
            className='mypage_input_field'
            placeholder='이메일'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={socialType !== null}
          />
          <input
            type='text'
            className='mypage_input_field'
            placeholder='휴대폰'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          {!error && <p className='error_message'>{error}</p>}
          <button className='submit_button' onClick={ChangeInfo}>변경 사항 저장하기</button>

          <div className='mypage_title'>배송지 관리</div>

          <div className='post_info-container'>
            <div>
              <div className='post_info-name'>홍길동</div>
              <div className='post_info-number'>010-1233-1222</div>
              <div className='post_info-address'>서울특별시 서대문구 성산로 8길 99-9 (연희동)</div>
              <div className='post_info-address-detail'>ㅇㅇ아파트 109동 109호 (종 1234)</div>
              <div className='post_info-post-number'>(123098)</div>
            </div>

            <div className='button_place'>
              <Link to='/mypage/userinformaiton/address' className='correction'>
                수정
              </Link>
              <button className='delete' onClick={showSuccessModal}>
                삭제
              </button>
            </div>
          </div>

          <Link to='/mypage/userinformaiton/address' className='submit_button'>
            배송지 추가하기
          </Link>

          <Modal ref={modalRef} />
        </div>
      </div>
    </div>
  );
};

export default InfoChange;
