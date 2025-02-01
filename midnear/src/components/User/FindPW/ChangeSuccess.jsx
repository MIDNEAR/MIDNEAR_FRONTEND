import React from 'react'
import check from '../../../assets/img/user/login/check.svg'
import { Link } from 'react-router-dom';

const ChangeSuccess = () => {
  return (
    <div className='container'>
        <div className='result_check_field'>
            <img src={check} className='check_sign'/>
            <div className='check_title'>비밀번호 변경 완료</div>
            <div className='check_content'>
                <span>홍길동</span>
                <p>님&nbsp;</p>
                <span>helpmeee119</span>
                <p>가입된 아이디에 비밀번호가 정상적으로 변경되었습니다.</p>
            </div>

            <Link to="/" className='keep_going'>로그인 바로 하기</Link>
            <Link to="/" className='load_others'>홈 화면으로 가기</Link>
        </div>
    </div>
  )
}

export default ChangeSuccess