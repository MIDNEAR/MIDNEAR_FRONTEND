import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import eximage from '../../assets/img/orderlist/Mask group.png'

const NoticeDetail = () => {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const noticeId = params.get('noticeId');
    const [notice, setNotice] = useState(null);
    const [nextNotice, setNextNotice] = useState(null);

    const loadNoticeDetail = async() => {
        await axios.get(`${DOMAIN}/notice/${noticeId}`)
        .then((res)=>{
          if(res.status === 200){
            const transformedData =  {
              ...res.data.data,
              createdDate: res.data.data.createdDate.split("T")[0].replace(/-/g, ". "),
            };
            setNotice(transformedData);
          } 
        })
        .catch((error) => {
          console.error('공지 디테일 로드 실패:', error.response || error.message);
        })
    };
    const loadNextDetail = async() => {
        await axios.get(`${DOMAIN}/notice/next/${noticeId}`)
        .then((res)=>{
          if(res.status === 200){
            setNextNotice(res.data.data);
          } 
        })
        .catch((error) => {
          console.error('다음 공지 로드 실패:', error.response || error.message);
        })
    };
    useEffect(()=>{
        loadNoticeDetail();
        loadNextDetail();
    },[noticeId]);

  return (
    <div className='container'>
        {notice && (
        <div className='notice'>
            <div className='top-el'>
            <div className='mypage_title'>NOTICE</div>
            <div className='notice_nav_contianer'>
                <Link to='/others/notice' className='back-to-notice-list'>목록</Link>
            </div>
            </div>
            <ul className="notice-detail">
                <li className="notice-item-top">
                    <div className='notice-title'>{notice.title}</div>
                    <div className='notice_information'>
                        <div className="notice-name">관리자</div>
                        <div className="notice-date">작성일 :{notice.createdDate}</div>
                    </div>
                </li>
            </ul>

            <div className='notice-detail_content'>
                <img src={notice.imageUrl} className='detail_image'/>
                <div className='notice-detail_text'>
                    <p>{notice.content}</p>
                </div>
            </div>

            <div className='next_list-section'>
                <div className='next_list-next'>다음 글</div>
                {nextNotice ? (
                    <Link to={`/others/notice/detail?noticeId=${nextNotice.noticeId}`}>
                        <div className='next_list-name'>{nextNotice.title}</div>
                    </Link>
                ) : (
                    <div className='next_list-name'>다음 공지가 없습니다.</div>
                )}
            </div>
            
        </div>
        )}
    </div>
  )
}

export default NoticeDetail