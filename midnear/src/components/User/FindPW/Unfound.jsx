import React from 'react'
import fail from '../../../assets/img/user/login/fail.svg'
import { Link } from 'react-router-dom';

const Unfound = () => {
    return (
        <div className='container'>
            <div className='result_check_field'>
                <img src={fail} className='check_sign'/>
                <div className='check_title'>아이디 찾기 실패</div>
                <div className='check_content'>
                    <h3>해당 정보로 가입된 아이디가 존재하지 않습니다. <br />
                    문제가 계속될 경우 고객센터로 문의하시기 바랍니다.</h3>
                </div>
    
                <Link to="/user/find/id" className='keep_going'>다시 아이디 찾기</Link>
                <Link to="/" className='load_others'>비회원으로 쇼핑하기</Link>
            </div>
        </div>
      )
}

export default Unfound