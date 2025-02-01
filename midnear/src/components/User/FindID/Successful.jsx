import React from 'react'
import check from '../../../assets/img/user/login/check.svg'
import { Link } from 'react-router-dom';

const Successful = () => {
  return (
    <div className='container'>
        <div className='result_check_field'>
            <img src={check} className='check_sign'/>
            <div className='check_title'>아이디 찾기 완료</div>
            <div className='check_content'>
                <span>홍길동</span>
                <p>님&nbsp;</p>
                <span>helpmeee119</span>
                <p>로 가입된 아이디가 존재합니다.</p>
            </div>

            <Link to="/" className='keep_going'>로그인 바로 하기</Link>
            <Link to="/user/find/pw" className='load_others'>비밀번호 찾기</Link>
        </div>
    </div>
  )
}

export default Successful