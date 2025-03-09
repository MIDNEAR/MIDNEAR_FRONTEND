import React, { useEffect, useState } from 'react';
import MyPageModal from '../MyPageModal';
import more from '../../../assets/img/orderlist/more.svg';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

const DeliveryAddress = () => {
    const navigate = useNavigate();
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const token = localStorage.getItem('jwtToken');
    const [recipient, setRecipient] = useState(userInfo.name);
    const [recipientContact, setRecipientContact] = useState("");
    const [deliveryName, setDeliveryName] = useState("");
    const [userFullAddress, setFullAddress] = useState("");
    const [userZoneCode, setUserZoneCode] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [memo, setMemo] = useState("");
    const [defaultAddressStatus, setDefaultAddressStatus] = useState(false);
    const [privacyAgreement, setPrivacyAgreement] = useState(false);
    const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(postcodeScriptUrl);
    const [addressList, setAddressList] = useState([]);


    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        if (data.addressType === "R") {
            if (data.bname) extraAddress += data.bname;
            if (data.buildingName) extraAddress += (extraAddress ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += extraAddress ? ` (${extraAddress})` : "";
        }
        setFullAddress(fullAddress);
        setUserZoneCode(data.zonecode);
    };

    const handleClick = () => open({ onComplete: handleComplete });

    const saveAddress = () => {
        if (!privacyAgreement) {
            alert("개인정보 수집 및 이용에 동의해야 합니다.");
            return;
        }

        axios.post(`${DOMAIN}/delivery/createAddr`, {
            recipient,
            recipientContact,
            deliveryName,
            postalCode: userZoneCode,
            address: userFullAddress,
            detailAddress,
            defaultAddressStatus: defaultAddressStatus ? 1 : 0,
            deliveryRequest: memo,
            userId: userInfo.id
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("주소가 저장되었습니다.");
                    setAddressList(response.data)

                }
            })
            .catch((error) => console.error(error));
    };

    const addressload = () => {
        axios.get(`${DOMAIN}/delivery/getAddrList`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("주소가 저장되었습니다.");
                    setAddressList(response.data)
                    console.log(response.data)
                }
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        addressload();
    }, []); 
    
    return (
        <div className='container'>
            <div className='field_container'>
                <MyPageModal />
                <div className='field_container_content'>
                    <div className='mypage_title'><div className="back" onClick={() => navigate(-1)}>&lt;</div> 배송지 관리</div>
                    <div className='mypage_address-midtitle'>배송 정보 수정</div>
                    <div className='mypage_address-container'>
                        <input type='text'
                            className='mypage_address-field'
                            placeholder='수취인명*'
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        />
                        <input type='text'

                            className='mypage_address-field'
                            placeholder='수취인 번호*'
                            value={recipientContact}
                            onChange={(e) => setRecipientContact(e.target.value)}

                        />

                        <input type='text' className='mypage_address-field' placeholder='배송지 명' value={deliveryName} onChange={(e) => setDeliveryName(e.target.value)} />
                        <div className='post_number_field'>
                            <input type='text' className='mypage_address-field' placeholder='*우편 번호' value={userZoneCode} readOnly />
                            <button className='certi_btn' onClick={handleClick}>우편 번호 검색</button>
                        </div>
                        <input type='text' className='mypage_address-field' value={userFullAddress} placeholder='*주소' readOnly />
                        <input type='text' className='mypage_address-field' placeholder='상세 주소 입력' value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
                        <div className='post_memo-contianer'>
                            <div className='post_memo-title'>배송 메모</div>
                            <div className='post_memo-select-contianer'>
                                <select className="post_memo-select" value={memo} onChange={(e) => setMemo(e.target.value)}>
                                    <option value="">배송 메모를 선택해 주세요.</option>
                                    <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                                    <option value="직접 전달해 주세요">직접 전달해 주세요</option>
                                    <option value="경비실에 맡겨 주세요">경비실에 맡겨 주세요</option>
                                    <option value="택배함에 넣어 주세요">택배함에 넣어 주세요</option>
                                </select>
                                <img src={more} alt="more" />
                            </div>
                        </div>
                        <div className='check_field-container'>
                            <div className='check_field'>
                                <input type='checkbox' className='check' checked={defaultAddressStatus} onChange={() => setDefaultAddressStatus(!defaultAddressStatus)} />
                                <p>기본 배송지로 설정</p>
                            </div>
                            <div className='check_field'>
                                <input type='checkbox' className='check' checked={privacyAgreement} onChange={() => setPrivacyAgreement(!privacyAgreement)} />
                                <p className='check-underline'>[필수] 개인정보 수집 및 이용 동의</p>
                            </div>
                        </div>
                        <button className='submit_button-address' onClick={saveAddress}>저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddress;
