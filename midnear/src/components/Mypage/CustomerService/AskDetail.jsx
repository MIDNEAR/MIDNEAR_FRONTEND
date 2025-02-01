import React, { useState } from 'react'
import MyPageModal from '../MyPageModal'
import { Link } from 'react-router-dom'

const AskDetail = () => {
  const [showComments, setShowComments] = useState(false);

  const showtheComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className='container'>
        <div className='field_container'>
            <MyPageModal />
            <div className='field_container_content'>
              <div className="inquiry-list-container">
                <h2>고객지원/1:1문의</h2>

                <div className='inquiry_information'>
                  <div className='inquiry_information-contianer'>
                    <div className='inquiry_information-name'>제목</div>
                    <div className='inquiry_information-value-top'>고민이 있는데요</div>
                  </div>
                  <div className='inquiry_information-contianer'>
                    <div className='inquiry_information-name'>작성자</div>
                    <div className='inquiry_information-value'>dl******</div>
                  </div>
                  <div className='inquiry_information-contianer'>
                    <div className='inquiry_information-name'>게시일</div>
                    <div className='inquiry_information-value'>2022.12.22</div>
                  </div>
                  <div className='inquiry_information-contianer'>
                    <div className='inquiry_information-name'>조회수</div>
                    <div className='inquiry_information-value'>1</div>
                  </div>
                </div>

                <div className='inquiry_detail'>
                yo.okay sexy 나 혹시 몰라 경고하는데 잘 들어 <br />
                지금 위험해 so dangerous <br />
                자꾸 나를 자극하지마 (큰일나) 나도 날 몰라 <br />
                숨이 자꾸 멎는다 네가 날 향해 걸어 온다 <br />
                나를 보며 웃는다 너도 내게 끌리는지 <br />
                눈 앞이 다 캄캄해 네가 뚫어져라 쳐다볼 땐 <br />
                귓가에 가까워진 숨소리 날 미치게 만드는 너인 걸​ <br /> <br />
                아무도 널 못 보게 품에 감추고 싶어 <br />
                널 노리는 시선들 내 안에 닐어난 거센 소용돌이 <br />
                검은 그림자 내 안에 깨어나 널 보는 두눈에 불꽃이 튄다 <br />
                그녀 곁에서 모두 다 물러나 이젠 조금식 사나워진다 <br />
                나 으르렁 으르렁 으르렁 대 으르렁 으르렁 으르렁 대 <br />
                나 으르렁 으르렁 으르렁 대 물러서지 않으면 다쳐도 물라 <br />
                ​날이 선 눈빛과 베일 듯한 긴장감 지금 탐색중이야 너의 주위를 봐 baby oh <br />
                넌 그냥 그대로 있어 나만을 바라보면서 절대 널 보내지 않아 두고 봐 <br /> <br />
                흐린 공간 속에서 선명하게 빛나는 널 노리는 시선들 내 안에 울리는 경보 울림소리 <br />
                검은 그림자 내 안에 깨어나 널 보는 두 눈에 불꽃이 튄다 <br />
                그녀 곁에서 모두 다 물러나 이젠 조금씩 사나워진다 <br />
                나 으르렁 으르렁 으르렁 대 나 으르렁 으르렁 으르렁 대 <br />
                </div>

                <div className='inquiry_detail_option'>
                  <button 
                  className={`comment ${showComments ? 'active' : ''}`}
                  onClick={showtheComments}
                  >댓글 1</button>
                  <Link to='/mypage/question/list' className='inquiry_list'>목록</Link>
                </div>

                {showComments && (
                <div className="comment_section">
                  <div className="comment_item">
                    <span>관리자 (2022.12.22 오후 12:12)</span>
                    <p>나 으르렁 으르렁 으르렁 대 으르렁 으르렁 으르렁 대 나 으르렁 으르렁 으르렁 대 물러서지 않으면 다쳐도 물라 날이 선 눈빛과 베일 듯한 긴장감 지금 탐색중이야 너의 주위를 봐 baby oh 넌 그냥 그대로 있어 나만을 바라보면서 절대 널 보내지 않아 두고 봐</p>
                  </div>
                </div>
                )}
              </div>
            </div>
        </div>
    </div>
  )
}

export default AskDetail