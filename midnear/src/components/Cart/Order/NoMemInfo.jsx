import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDaumPostcodePopup } from 'react-daum-postcode';
import axios from 'axios';
import OrderList from '../OrderList'
import StepHeader from '../StepHeader'
import PrivacyModal from './PrivacyModal'
import check from '../../../assets/img/cart/check.svg'


const NoMemInfo = () => {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();
    const location = useLocation();
    const orderDTO = location.state?.orderDTO || []
    const [updateOrderDTO, setUpdateOrderDTO] = useState(orderDTO);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState([]);

    const [inputValue, setInputValue] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [receiver, setReceiver] = useState('');
    const [receiverNum, setReceiverNum] = useState('');
    const [memo, setMemo] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const postcodeScriptUrl =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const completeHandler = (data) => {
        const { address, zonecode, bname, buildingName } = data;
        let extraAddress = "";
        let fullAddress = "";
        if (data.addressType === "R") {
            if (bname !== "") {
                extraAddress += bname;
            };
            if (buildingName !== "") {
                if (extraAddress !== "") {
                    extraAddress += `,${buildingName}`;
                } else { extraAddress += buildingName; }
            };
            if (extraAddress !== "") {
                fullAddress = address + `(${extraAddress})`;
            }
        }
        setZonecode(zonecode);
        setAddress(fullAddress);

    };
    const handlePayment = () => {
        const totalAmount = calAllPayment(updateOrderDTO);
        console.log("✅ 결제 금액:", totalAmount);
    
        const orderData = {
            orderId: 0, 
            orderName: name || "비회원",
            deliveryAddrId: 0, 
            orderContact: phone.replace(/-/g, ""),
            orderEmail: email || "guest@example.com",
            allPayment: totalAmount,
            recipientName: receiver,
            postalCode: zonecode,
            address: address,
            detailedAddress: detailAddress,
            recipientContact: receiverNum.replace(/-/g, ""),
            userId: 0, 
            deliveryRequest: memo || "",
            oderProductsRequestDtos: updateOrderDTO.map(item => ({
                productColorId: item.productColorId,
                size: item.size,
                quantity: item.quantity,
                couponDiscount: 0,
                pointDiscount: 0,
                productPrice: calProductPrice(item.discountStartDate, item.discountEndDate, item.price, item.discountPrice),
                deliveryCharge: deliveryFee,
            })),
        };
    
        
    
        localStorage.setItem("orderData", JSON.stringify(orderData));
    
        navigate("/payments", { state: { amount: totalAmount } });
    };
    
    const toggleHandler = () => {
        open({ onComplete: completeHandler });
    };

    const handlePhoneChange = (e) => {
        let input = e.target.value.replace(/[^0-9]/g, '');
        if (input.length > 3 && input.length <= 7) {
            input = `${input.slice(0, 3)}-${input.slice(3)}`;
        } else if (input.length > 7) {
            input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
        }
        setPhone(input);
    };
    const handleReceiverNumChange = (e) => {
        let input = e.target.value.replace(/[^0-9]/g, '');
        if (input.length > 3 && input.length <= 7) {
            input = `${input.slice(0, 3)}-${input.slice(3)}`;
        } else if (input.length > 7) {
            input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
        }
        setReceiverNum(input);
    };

    useEffect(() => {
        const isPhoneValid = phone.replace(/-/g, '').length === 11;
        const isReceiverNumValid = receiverNum.replace(/-/g, '').length === 11;
        const areFieldsFilled = name.trim() !== '' && isPhoneValid && receiver.trim() !== '' && isReceiverNumValid && receiverNum.trim() !== '' && zonecode.trim() !== '' && address.trim() !== '';
        const isPrivacyChecked = isChecked.includes(2);
        setIsButtonEnabled(areFieldsFilled && isPrivacyChecked);
    }, [name, phone, receiver, receiverNum, zonecode, address, isChecked]);

    const checkItemHandler = (id, isChecked) => {
        setIsChecked((prev) =>
            isChecked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        );
    };

    const isCheckItem = (e, id) => {
        const { checked } = e.target;
        checkItemHandler(id, checked);
    };
    const calProductPrice = (start, end, price, discountPrice) => {
        const today = new Date();
        const startDate = start ? new Date(start) : null;
        const endDate = end ? new Date(end) : null;
        if (startDate && endDate && today >= startDate && today <= endDate) {
            return discountPrice;
        }
        return price;
    };

    const calAllPayment = (updateOrderDTO) => {
        const totalPrice = updateOrderDTO.reduce((acc, item) => {
            const productPrice = calProductPrice(item.discountStartDate, item.discountEndDate, item.price, item.discountPrice);
            const totalItemPrice = productPrice * item.quantity;
            return acc + totalItemPrice;
        }, 0);
        return totalPrice;
    };

    useEffect(() => {
        const calculatedAmount = calAllPayment(updateOrderDTO);
        setTotalAmount(calculatedAmount);
    }, [updateOrderDTO]);

    return (
        <div className='no-member'>
            <div className='info'>
                <StepHeader />
                <div className='container'>
                    <div className='empty'></div>
                    <div className='info_content'>
                        <div className='mid_text'>주문자 정보</div>
                        <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>

                        <input type='text' name='name' className='min_text' placeholder='홍길동*' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type='text' name='phone' className='min_text' placeholder='010-9999-9999*' value={phone} onChange={handlePhoneChange} />
                        <input type='text' name='email' className='min_text' placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <div className='bottom'>
                            <div className='title'>배송 정보</div>
                            <input type='text' name='receiver' className='min_text' placeholder='수취인*' value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                            <input type='text' name='receiverNum' className='min_text' placeholder='수취인 번호*' value={receiverNum} onChange={handleReceiverNumChange} />
                            <input type='text' name='memo' className='min_text' placeholder='배송 메모를 입력해 주세요.' value={memo} onChange={(e) => setMemo(e.target.value)} />
                            <div className='post_code'>
                                <input type='text' name='postNum' className='text' placeholder='*우편번호' disabled value={zonecode} />
                                <div className='search' onClick={toggleHandler}>우편번호 검색</div>
                            </div>
                            <input type='text' name='firstAdd' className='min_text' placeholder='*주소' disabled value={address} />
                            <input type='text' name='secondAdd' className='min_text' placeholder='상세주소 입력' value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
                        </div>

                        <div className='check2'>
                            <label className='checkbox'>
                                <input type='checkbox' name='checkbox' className='agree'
                                    id={2}
                                    checked={isChecked.includes(2)}
                                    onChange={(e) => isCheckItem(e, 2)}
                                />
                                {isChecked.includes(2) && (
                                    <img src={check} className='checkImg' />
                                )}
                            </label>
                            <p className='privacy' onClick={openModal}>[필수] 개인정보 수집 및 이용 동의</p>
                            <PrivacyModal isOpen={isModalOpen} closeModal={closeModal} setIsChecked={setIsChecked} isChecked={isChecked} />
                        </div>

                        <button
                            className={`btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                            onClick={handlePayment}
                            disabled={!isButtonEnabled}
                      
                        >
                            결제하기
                        </button>

                    </div>

                    <div className='order_content'>
                        <div className='title'>주문 내용</div>
                        <div className='s_title'>상품</div>
                        <OrderList
                            productList={orderDTO}
                            point={inputValue || 0}
                            selectedCoupon={selectedCoupon}
                            postCode={zonecode || 0}
                            isCartScreen={false}
                            setUpdateOrderDTO={setUpdateOrderDTO}
                            deliveryFee={deliveryFee}
                            setDeliveryFee={setDeliveryFee}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoMemInfo