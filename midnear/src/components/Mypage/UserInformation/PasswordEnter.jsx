import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyPageModal from '../MyPageModal'

const PasswordEnter = () => {
  const navigate = useNavigate(); 

  const serverPassword = '123456';

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handlePasswordCheck = () => {
    if (password === serverPassword) {
      setErrorMessage('');
      setIsInvalid(false);
      navigate('/mypage/userinformaiton/password/changing');
    } else {
      setErrorMessage('* 비밀번호가 일치하지 않습니다. 비밀번호를 다시 한 번 입력해주세요.');
      setIsInvalid(true); 
    }
  };

  return (
    <div className='container'>
        <div className='field_container'>
            <MyPageModal/>
            <div className='field_container_content'>
                <div className='mypage_title'>비밀번호 변경</div>
                <div className='clarify'>비밀번호 변경을 위해 현재 비밀번호를 입력해 주세요.</div>

                <input 
                type='password' 
                className={`mypage_input_field ${isInvalid ? 'invalid' : ''}`}
                placeholder='현재 비밀번호*'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>

                {errorMessage && <p className='error_message'>{errorMessage}</p>}

                <button className='submit_button' onClick={handlePasswordCheck}>확인</button>
            </div>
        </div>
    </div>
  )
}

export default PasswordEnter