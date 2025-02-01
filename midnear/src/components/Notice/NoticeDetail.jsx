import React from 'react'
import { Link } from 'react-router-dom'
import eximage from '../../assets/img/orderlist/Mask group.png'

const NoticeDetail = () => {

  return (
    <div className='container'>
        <div className='notice'>
            <div className='mypage_title'>NOTICE</div>
            <div className='notice_nav_contianer'>
                <Link to='/others/notice' className='back-to-notice-list'>목록</Link>
            </div>
            <ul className="notice-list">
                <li className="notice-item-top">
                    <div className='notice-title'>긴급 공지 / 안녕하세요 공지사항입니다. 뭐 쓸말이 없어서 그냥 막 써봅니다. 반갑습니다. 우린 어제까지만 해도 좋았는데 you so mad 풀어볼게 이 넌센스 데여도 어때 불을 뿜는 널 달래 Okay I lose you</div>
                    <div className='notice_information'>
                        <div className="notice-name">관리자 아이디</div>
                        <div className="notice-date">작성일 :2025. 02. 07</div>
                    </div>
                </li>
            </ul>

            <div className='notice-detail_content'>
                <img src={eximage} className='detail_image'/>
                <div className='notice-detail_text'>
                <h1>소설은 대표적 산문 문학으로서 근대 이후 많이 사랑받고 있는 문학의 장르다.</h1> <br />

                그 종류만 해도 무척 다양하며, 그 만큼 읽고 즐기는 사람들의 계층도 매우 다양하다. <br />
                근대 소설을 뜻하는 영어 Novel은 중세기 말 이탈리아에서 유행하던 노벨라(이탈리아어: Novella[5])에서 <br />
                온 것으로 이 말은 새로운 것, 신기한 것이란 뜻을 담고 있다. <br /> <br />
                
                사실 '소설'이라는 말 그대로 풀이하자면 '작은 이야기'이고 이는 그대로 중국 고대 문학의 한 양식, 혹은 보잘 것 없는 이야기잡설를 일컫는 말이었다. <br />
                대강 때려맞추면 중국의 소설(小說)이란 본래 고대 시기에 왕이나 황제를 비롯한 궁중 사람들을 대상으로 한 궁중문학을 비롯해서 유교 경전이 아닌 온갖 잡설을 가리키는 말이다. <br /> <br />
                
                최초의 소설(Novel) 작품으로 11세기 초 헤이안시대의 궁녀였던 무라사키 시키부가 쓴 장편소설인 겐지모노가타리를 꼽기도 한다. <br />
                다만 여기에는 상당한 논쟁의 여지가 있다. 겐지모노가타리 이전에 이미 세계 각지에 다수의 소설(Fiction, 가상의 이야기로서의 소설) 전통이 존재하기 때문이며[6], <br />
                그렇다고 근대적 의미의 소설(Novel, 장르로서의 소설)의 시초로 겐지모노가타리를 꼽기에는 직간접적 조상인 것도 아닐 뿐 아니라 근대소설이 요구하는 내용적 측면[7]도 충분히 만족하지 못하기 때문이다. <br />

                현재도 대다수의 소설들은 캐릭터의 내면과 행위 모두를 골고루 묘사하는 것이 당연시 되어 있다.<br /> <br />
                
                <h2>전문가들 중에도 그 의견에 반대하는 사람이 많다.</h2>
                따라서 부연 설명 없이 겐지모노가타리가 최초의 소설이라고만 하면 별다른 문학 지식이 없는 일반인은 그 이전에는 산문 픽션 자체가 없었던 것처럼 오해할 수도 있고, <br />
                예를 들어 기준을 완화해서 겐지모노가타리를 소설로 볼 경우, 같은 맥락에서 더 기준을 완화해 황금 당나귀를 최초의 소설로 볼 수도 있기 때문이다. <br />
                따라서 오해와 논쟁의 여지를 막기 위해 최초의 '심리' 소설(psychological fiction)이라고 하기도 한다. <br />
                </div>
            </div>

            <div className='next_list-section'>
                <div className='next_list-next'>다음 글</div>
                <div className='next_list-name'>공지 / 안녕하세요 공지사항입니다.</div>
            </div>
            
        </div>
    </div>
  )
}

export default NoticeDetail