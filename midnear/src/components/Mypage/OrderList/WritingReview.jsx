import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MyPageModal from '../MyPageModal'
import defaultimage from '../../../assets/img/orderlist/default.svg'
import star from '../../../assets/img/orderlist/star.svg'
import filledstar from '../../../assets/img/orderlist/star_fill.svg'

const WritingReview = () => {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const token = localStorage.getItem('jwtToken');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderProductId = params.get('orderProductId');
    const {item,  date } = location.state || {}; 
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [file, setFile] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);
    const [isBoxVisible, setIsBoxVisible] = useState(false)
    const toggleBoxVisibility = () => {
        setIsBoxVisible(prevState => !prevState)
    };

    const [stars, setStars] = useState([false, false, false, false, false])

    const toggleStar = (index) => {
        if (stars[index] && stars.slice(index + 1).every((s) => !s)) {
            setStars([false, false, false, false, false]);
            setRating(0);
        } else {
            const newStars = stars.map((_, i) => i <= index);
            setStars(newStars);
            const lastIndex = newStars.lastIndexOf(true);
            setRating(lastIndex + 1);
                       
        }
    };
    
    const imageUpload = (e) =>{
        const file = Array.from(e.target.files);
        setFile((prev)=> [...prev, ...file]);
        file.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {                
                setPreviewImage((prev)=>[...prev, reader.result]);
            }; 
            reader.readAsDataURL(file);
        }); 
    };
    
    const deleteImage = (index) => {
        const updatedFiles = [...file];
        const updatedPreviews = [...previewImage];

        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setFile(updatedFiles);
        setPreviewImage(updatedPreviews);
    };

    // 리뷰 작성
    const writeReview = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('review', content);
        formData.append('orderProductId', orderProductId);
        if (file.length > 0) {
            file.forEach(item=>formData.append("files", item));
        }

        axios.post(`${DOMAIN}/review/create`,formData,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
          if(res.status === 200){
            
          };
        })
        .catch((error) => {
        });
      };      

  useEffect(() => {
    setIsButtonEnabled(rating > 0 && content.trim().length >= 20 && isChecked);
  }, [rating, content, isChecked]);

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
                                <span className='date'>{date} 주문</span>
                            </div>
                            <div className='order_info'>
                                <img src={item.productMainImage} />
                                <div className='goods_info'>
                                    <p>상품 정보 : {item.productName}</p>
                                    <div className='price'>
                                        <span>₩ {item.payPrice.toLocaleString('ko-KR')}</span>
                                        <div className='dot' />
                                        <span>{item.quantity}개</span>
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />

                <div className='gray_text'>20자 이상</div>

                <div className='mypage_small_text'>사진 첨부</div>
                <div className='upload-images'>
                    {previewImage && (
                        <>
                        {previewImage.map((item, index) => 
                            <div className='image-box' key={index}>
                                <button className='delete-btn' type='button' onClick={()=>deleteImage(index)}>삭제</button>
                                <img className='prev-img' alt={item} src={item} />
                            </div>
                        )}
                        </>
                    )}
                    {previewImage.length < 5 && (
                        <>
                        <label htmlFor="file-upload" className="image_input_label">파일 선택</label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className='image_input'
                            style={{ display: 'none' }}
                            onChange={imageUpload}
                        />
                        </>
                    )}
                        
                </div>

                <div className='submit_field'>
                    <div className='check_field'>
                        <input type='checkbox' className='check' onChange={(e) => setIsChecked(e.target.checked)}/>
                        <p>작성된 후기는 미드니어 홍보 콘텐츠로 사용될 수 있습니다.(필수)</p>
                    </div>

                    <button 
                    className={`review_submit ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                    disabled={!isButtonEnabled}
                    onClick={writeReview}
                    >
                        리뷰 등록하기
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WritingReview;
