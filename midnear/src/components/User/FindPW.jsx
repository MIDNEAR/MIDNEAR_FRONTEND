import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindPW = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('phone');
    const [CodeInput, setCodeInput] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [code, setCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const [validation, setValidation] = useState({
        isNameValid: true,
        isPhoneValid: true,
        isEmailValid: true,
    });

    const [codeError, setCodeError] = useState('');
    const [serverCode, setServerCode] = useState('123456'); 

    // 라디오 버튼 변경 시 모든 상태 초기화
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setVerificationMessage('');
        setCode('');
        setIsCodeValid(false);
        setIsCodeVerified(false);
        setIsSubmitEnabled(false);
        setFormData({ name: '', phone: '', email: '' });
        setValidation({ isNameValid: true, isPhoneValid: true, isEmailValid: true });
        setCodeError('');
    };

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    // 유효성 검사
    const validateField = (name, value) => {
        if (name === 'name') {
            setValidation((prev) => ({ ...prev, isNameValid: value.trim() !== '' }));
        }
        if (name === 'phone') {
            setValidation((prev) => ({ ...prev, isPhoneValid: value.trim() !== '' }));
        }
        if (name === 'email') {
            setValidation((prev) => ({ ...prev, isEmailValid: value.trim() !== '' }));
        }
    };

    const handleValid = () => {
        const { name, phone, email } = formData;
        const isNameValid = name.trim() !== '';
        const isPhoneValid = selectedOption === 'phone' ? phone.trim() !== '' : true;
        const isEmailValid = selectedOption === 'email' ? email.trim() !== '' : true;

        setValidation({ isNameValid, isPhoneValid, isEmailValid });

        return isNameValid && ((selectedOption === 'phone' && isPhoneValid) || (selectedOption === 'email' && isEmailValid));
    };

    // 인증 요청 핸들러
    const handleRequestVerification = (e) => {
        e.preventDefault();
        if (handleValid()) {
            setCodeInput(true);
            setVerificationMessage('인증번호가 전송되었습니다.');
            setCodeError('');
        }
    };

    // 인증번호 입력 핸들러
    const handleCodeChange = (e) => {
        const value = e.target.value;
        setCode(value);
        setIsCodeValid(value.trim().length === 6);
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

    const goToFindID = () => {
        navigate('/user/find/id');
    };

    const goToFindPW = () => {
        navigate('/user/find/pw');
    };

    const handleFindPWSubmit = () => {
        if (isSubmitEnabled) {
            navigate('/user/change/pw');
        }
    };

    return (
        <div className="container">
            <div className="find">
                <div className="select_content">
                    <div className="unactivate_box" onClick={goToFindID}>
                        아이디 찾기
                    </div>
                    <div className="activate_box" onClick={goToFindPW}>
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
                                className={`min_text ${validation.isNameValid ? '' : 'invalid'}`}
                                placeholder="이름*"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {!validation.isNameValid && <p className="error_message">이름을 정확하게 입력해 주세요.</p>}

                            <div className="user_container">
                                <input
                                    type="text"
                                    className={`min_text ${validation.isPhoneValid ? '' : 'invalid'}`}
                                    placeholder="휴대전화 (-없이)"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="certi_btn"
                                    onClick={handleRequestVerification}
                                    disabled={!validation.isNameValid || !validation.isPhoneValid}
                                >
                                    {verificationMessage ? '재요청' : '인증요청'}
                                </button>
                            </div>
                            {!validation.isPhoneValid && <p className="error_message">휴대폰 번호를 정확하게 입력해 주세요.</p>}
                            {verificationMessage && <p className="success_message">{verificationMessage}</p>}

                            {CodeInput && (
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
                                        disabled={!isCodeValid}
                                    >
                                        확인
                                    </button>
                                </div>
                            )}
                            {codeError && <p className="error_message">{codeError}</p>}
                            {isCodeVerified && (
                                <p className="success_message">*코드번호 인증이 완료되었습니다.</p>
                            )}
                        </div>
                    )}

                    <label className="radio-label">
                        <input
                            type="radio"
                            name="findMethod"
                            value="email"
                            checked={selectedOption === 'email'}
                            onChange={handleOptionChange}
                        />
                        <span className="radio-text">이메일로 찾기</span>
                    </label>
                    {selectedOption === 'email' && (
                        <div className="form-group">
                            <input
                                type="text"
                                className={`min_text ${validation.isNameValid ? '' : 'invalid'}`}
                                placeholder="이름*"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {!validation.isNameValid && <p className="error_message">이름을 정확하게 입력해 주세요.</p>}

                            <div className="user_container">
                                <input
                                    type="email"
                                    className={`min_text ${validation.isEmailValid ? '' : 'invalid'}`}
                                    placeholder="이메일 주소*"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="certi_btn"
                                    onClick={handleRequestVerification}
                                    disabled={!validation.isNameValid || !validation.isEmailValid}
                                >
                                    {verificationMessage ? '재요청' : '인증요청'}
                                </button>
                            </div>
                            {!validation.isEmailValid && <p className="error_message">이메일을 정확하게 입력해 주세요.</p>}
                            {verificationMessage && <p className="success_message">{verificationMessage}</p>}

                            {CodeInput && (
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
                            {codeError && <p className="error_message">{codeError}</p>}
                            {isCodeVerified && (
                                <p className="success_message">*코드번호 인증이 완료되었습니다.</p>
                            )}
                        </div>
                    )}
                </div>

                <button
                    className="user_btn-ex"
                    style={{
                        color: isSubmitEnabled ? 'var(--white)' : 'inherit',
                        backgroundColor: isSubmitEnabled ? '#333' : 'inherit',
                        cursor: isSubmitEnabled ? 'pointer' : 'default',
                    }}
                    disabled={!isSubmitEnabled}
                    onClick={handleFindPWSubmit}
                >
                    비밀번호 찾기
                </button>
            </div>
        </div>
    );
};

export default FindPW;
