import React from 'react'
import check from '../../../assets/img/user/login/check.svg'
import { Link } from 'react-router-dom';

const SuccessJoin = ({usename, userid}) => {
  return (
    <div className='success_join'>
        <div className='result_check_field'>
            <img src={check} className='check_sign'/>
            <div className='check_title'>회원가입 완료</div>
            <div className='check_content'>
                <span>{usename}</span>
                <p>님&nbsp;</p>
                <span>{userid}</span>
                <p>의 회원가입이</p> <br />
                <p>성공적으로 완료되었습니다.</p>
            </div>

            <div className='toggle_join'>
              <p>*회원가입 내역 확인 및 수정은 <span>마이페이지 &gt; 회원정보수정</span>에서 가능합니다.</p>
            </div>

            <Link to="/" className='keep_going'>로그인 바로 하기</Link>
        </div>
    </div>
  )
}

export default SuccessJoin