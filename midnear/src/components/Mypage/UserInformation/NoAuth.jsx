import React from 'react'
import {  Link } from 'react-router-dom';

const NoAuth = () => {
  return (
    <div className='container noauth'>
        <h1>로그인 후 이용 가능한 페이지입니다.</h1>
        <Link to="/" className="btn">로그인 하러 가기</Link>
    </div>
  )
}

export default NoAuth
