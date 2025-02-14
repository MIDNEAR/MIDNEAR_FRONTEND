import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageModal from '../MyPageModal';
import axios from 'axios';

const PasswordConfirm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const [error, setError] = useState('');
  const token = localStorage.getItem('jwtToken');

  const goToInfoChange = () => {
    axios
      .get(`${DOMAIN}/user/check-password`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          password: password,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/mypage/userinformaiton/userinfo/changing');
        }
      })
      .catch((error) => {
        setError('* 잘못된 비밀번호입니다.');
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <div className='field_container'>
        <MyPageModal />
        <div className='field_container_content'>
          <div className='mypage_title'>비밀번호 입력</div>
          <div className='clarify'>
            정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.
          </div>

          <input
            type='password'
            className='mypage_input_field'
            placeholder='비밀번호* '
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='error_message'>{error}</p>}
          <button className='submit_button' onClick={goToInfoChange}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirm;
