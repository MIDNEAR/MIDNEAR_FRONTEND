import React, { useState } from 'react'
import MyPageModal from '../MyPageModal'
import defaultimage from '../../../assets/img/orderlist/default.svg'
import star from '../../../assets/img/orderlist/star.svg'
import filledstar from '../../../assets/img/orderlist/star_fill.svg'

const WritingReview = () => {
    const [isBoxVisible, setIsBoxVisible] = useState(false)
    const toggleBoxVisibility = () => {
        setIsBoxVisible(prevState => !prevState)
    };

    const [stars, setStars] = useState([false, false, false, false, false])

    const toggleStar = (index) => {
        const newStars = [...stars]
        newStars[index] = !newStars[index]
        setStars(newStars)
    };

  return (
    <div className='container'>
        <div className='field_container'>
            <MyPageModal/>
            <div className='field_container_content'>
                <div className='title'>
                    <div className='mypage_title'>주문 내역</div>
                    <div className='mypage_middle_text'>_  리뷰 작성하기</div>
                </div>
                <div className='toggle'>
                    <div className='caution' onClick={toggleBoxVisibility}>작성시 유의사항</div>
                    {isBoxVisible && (
                    <div className='caution_detail'>
                        <p className='caution_title'>작성시 유의사항</p>
                        <ul style={{ listStyleType: "disc" }} className='content'>
                            <li className='caution_content'>
                                작성하신 후기는 미드니어 이용자들에게 제공됩니다.
                            </li>
                            <li className='caution_content'>
                                아래에 해당할 경우 적립금 지급이 보류되며, 이미 지급 받으셨더라도 2차 검수를 통해 적립금을 회수할 수 있습니다. 또한 일부 후기는 
                                <br /> 
                                조건에 따라 비노출 처리 됩니다.
                            </li>
                            
                            <ul style={{ listStyleType: "disc" }} className='caution_content_detail'>
                                <li>포장이 제거되지 않았거나 상품의 전체 형태가 또렷하게 보이지 않는 후기</li>
                                <li>문자 및 기호의 단순 나열 반복된 내용의 후기 </li>
                                <li>주문하신 상품과 관련 없는 내용의 후기 </li>
                                <li>개인정보 및 광고, 비속어가 포함된 내용의 후기 </li>
                                <li>상품 상세페이지 등의 판매 이미지 사용, 관련없는 상품의 사진, 타인의 사진을 도용한 후기  </li>
                            </ul>
                            
                            <li className='caution_content'>
                            원할한 서비스 이용을 위해 후기 도용시 적립금 2배 회수, 3개월간 후기 적립금 지급이 중단되며, 일부 미드니어 이용에 제한이 발생할<br />수 있습니다.
                            </li>
                        </ul>
                    </div>
                    )}
                </div>

                <div className='mypage_middle_text_top'>이 상품이 어떠셨나요?</div>

                <div className='ordering_box'>
                        <div className='box_left'>
                            <div className='order_state'>
                                <div className='dot' />
                                <span className='date'>2024.12.25 주문</span>
                            </div>
                            <div className='order_info'>
                                <img src={defaultimage} />
                                <div className='goods_info'>
                                    <p>상품 정보 : yo, okay 나 혹시 몰라 경고하는데 지금 위험해 자꾸 나를 자극 하지마 나도 날 몰라</p>
                                    <div className='price'>
                                        <span>₩ 99,999</span>
                                        <div className='dot' />
                                        <span>1개</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='star_collection'>
                    {stars.map((isFilled, index) => (
                    <div
                        key={index}
                        className="star"
                        onClick={() => toggleStar(index)}
                        style={{
                        backgroundImage: `url(${isFilled ? filledstar : star})`,
                        }}
                    />
                    ))}
                    </div>


                <div className='review_underline' />

                <div className='mypage_middle_text'>어떤 점이 좋았나요?</div>

                <div className='review_enter_title'>
                    <div className='mypage_small_text'>본문 입력(필수)</div>
                    <div className='point'>00포인트 적립</div>
                </div>

                <textarea
                placeholder="다른 회원들이 도움받을 수 있도록 상품에 대한 의견을 자세히 공유해 주세요."
                />

                <div className='gray_text'>20자 이상</div>

                <div className='mypage_small_text'>사진 첨부</div>
                <label htmlFor="file-upload" className="image_input_label">파일 선택</label>
                <input
                    id="file-upload"
                    type="file"
                    className='image_input'
                    style={{ display: 'none' }}
                />

                <div className='submit_field'>
                    <div className='check_field'>
                        <input type='checkbox' className='check'/>
                        <p>작성된 후기는 미드니어 홍보 콘텐츠로 사용될 수 있습니다.(필수)</p>
                    </div>

                    <button className='review_submit'>리뷰 등록하기</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WritingReview;
