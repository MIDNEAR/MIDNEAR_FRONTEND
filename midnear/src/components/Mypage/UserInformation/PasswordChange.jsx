import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyPageModal from '../MyPageModal'

const PasswordChange = () => {
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  const handlePasswordChange = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setErrorMessage('변경할 비밀번호를 입력해 주세요.');
      setIsInvalid(true)
    } else if (newPassword === confirmPassword) {
      setErrorMessage('')
      navigate('/user/change/success')
      setIsInvalid(false)
    } else {
      setIsInvalid(true)
      setErrorMessage(
        '* 비밀번호가 일치하지 않습니다. 새 비밀번호와 비밀번호 확인이 일치하는지 다시 한 번 확인해주세요.'
      )
    }
  }

  return (
    <div className='container'>
      <div className='field_container'>
        <MyPageModal />
        <div className='field_container_content'>
          <div className='mypage_title'>비밀번호 변경</div>

          <input
            type='password'
            className={`mypage_input_field_top ${isInvalid ? 'invalid' : ''}`}
            placeholder='새 비밀번호'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type='password'
            className={`mypage_input_field ${isInvalid ? 'invalid' : ''}`}
            placeholder='비밀번호 확인'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {errorMessage && <p className='error_message'>{errorMessage}</p>}

          <button className='submit_button' onClick={handlePasswordChange}>
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordChange