import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindID = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('phone');
    const [PhoneCodeInput, setPhoneCodeInput] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [code, setCode] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [serverCode, setServerCode] = useState('123456'); // Simulated server code
    const [codeError, setCodeError] = useState(''); // Error message for invalid code

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const goToFindPW = () => {
        navigate('/user/find/pw');
    };

    const goToFindID = () => {
        navigate('/user/find/id');
    };

    const handlePhoneRequest = (e) => {
        e.preventDefault();
        if (isPhoneValid && isNameValid) {
            setPhoneCodeInput(true);
            setCodeError('');
        } else {
            handleValid();
        }
    };

    const handleValid = () => {
        const isPhoneEmpty = phone.trim() === '';
        setIsPhoneValid(!isPhoneEmpty);

        const isNameEmpty = name.trim() === '';
        setIsNameValid(!isNameEmpty);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        handleValid();
        if (isNameValid && isPhoneValid) {
            handlePhoneRequest(e);
        }
    };

    const handleCodeChange = (e) => {
        const enteredCode = e.target.value;
        setCode(enteredCode);
        setCodeError('');
    };

    const handleResendRequest = () => {
        setVerificationMessage('인증번호가 재전송되었습니다.');
        setCodeError('');
    };

    const handleCodeSubmit = () => {
        if (code === serverCode) {
            setIsCodeVerified(true);
            setIsSubmitEnabled(true);
            setVerificationMessage('');
            setCodeError('');
        } else {
            setCodeError('*정확한 인증번호를 입력해 주세요.');
        }
    };

    const handleFindIDSubmit = () => {
        if (isSubmitEnabled) {
            navigate('/user/find/id/showid');
        }
    };

    return (
        <div className='container'>
            <div className='find'>
                <div className='select_content'>
                    <div className='activate_box' onClick={goToFindID}>
                        아이디 찾기
                    </div>
                    <div className='unactivate_box' onClick={goToFindPW}>
                        비밀번호 찾기
                    </div>
                </div>

                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="findMethod"
                            value="phone"
                            checked={selectedOption === 'phone'}
                            onChange={handleOptionChange}
                        />
                        <span className="radio-text">휴대폰 번호로 찾기</span>
                    </label>

                    {selectedOption === 'phone' && (
                        <div className="form-group">
                            <input
                                type="text"
                                className={`min_text ${isNameValid ? '' : 'invalid'}`}
                                placeholder="이름*"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            {!isNameValid && <p className="error_message">이름을 정확하게 입력해 주세요.</p>}

                            <div className='user_container'>
                                <input
                                    type="text"
                                    className={`min_text ${isPhoneValid ? '' : 'invalid'}`}
                                    placeholder="휴대전화 (-없이)"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                />
                                <button
                                    className="certi_btn"
                                    onClick={verificationMessage ? handleResendRequest : handleButtonClick}
                                    disabled={!isPhoneValid || !isNameValid}
                                >
                                    {verificationMessage ? '재요청' : '인증요청'}
                                </button>
                            </div>

                            {!isPhoneValid && <p className="error_message">휴대폰 번호를 정확하게 입력해 주세요.</p>}
                            {verificationMessage && <p className="success_message">{verificationMessage}</p>}
                        </div>
                    )}

                    {PhoneCodeInput && (
                        <div className="user_container">
                            <input
                                type="text"
                                className="min_text"
                                placeholder="인증번호"
                                value={code}
                                onChange={handleCodeChange}
                            />
                            <button
                                className="certi_btn"
                                onClick={handleCodeSubmit}
                            >
                                확인
                            </button>
                        </div>
                    )}

                    {codeError && <p className="error_message">{codeError}</p>} {/* Display error message here */}
                    {isCodeVerified && (
                        <p className="success_message">*코드번호 인증이 완료되었습니다.</p>
                    )}
                </div>

                <button
                    className='user_btn-ex'
                    style={{
                        color: isSubmitEnabled ? 'var(--white)' : 'inherit',
                        backgroundColor: isSubmitEnabled ? '#333' : 'inherit',
                        cursor: isSubmitEnabled ? 'pointer' : 'default',
                    }}
                    disabled={!isSubmitEnabled}
                    onClick={handleFindIDSubmit}
                >
                    아이디 찾기
                </button>
            </div>
        </div>
    );
};

export default FindID;