import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyPageModal from '../MyPageModal'

const PasswordConfirm = () => {
  const navigate = useNavigate()
  const serverPassword = '123456'

  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  const handlePasswordCheck = () => {
    if (password === serverPassword) {
      setErrorMessage('')
      setIsInvalid(false)
      navigate('/mypage/userinformaiton/userinfo/changing')
    } else {
      setErrorMessage('* 비밀번호가 일치하지 않습니다. 비밀번호를 다시 한 번 입력해주세요.')
      setIsInvalid(true)
    }
  };

  return (
    <div className='container'>
      <div className='field_container'>
        <MyPageModal />
        <div className='field_container_content'>
          <div className='mypage_title'>비밀번호 입력</div>
          <div className='clarify'>정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.</div>

          <input
            type='password'
            className={`mypage_input_field ${isInvalid ? 'invalid' : ''}`}
            placeholder='비밀번호*'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className='error_message'>{errorMessage}</p>}

          <button className='submit_button' onClick={handlePasswordCheck}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordConfirm
