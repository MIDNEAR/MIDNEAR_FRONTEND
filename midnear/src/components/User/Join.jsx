import React, { useState } from 'react';
import eye from '../../assets/img/user/login/eye.svg';
import noneye from '../../assets/img/user/login/eye_open.svg';
import { useNavigate, Link } from 'react-router-dom';
import Provision from './Modal/Provision';


const Join = () => {
    const navigate = useNavigate();
    const [pwType, setPwType] = useState({ type: 'password', visible: false });
    const [showCodeInput, setShowCodeInput] = useState(false);

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');

    const [nameError, setNameError] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const handlePwState = (e) => {
        e.preventDefault();
        setPwType((prevState) => ({
            type: prevState.visible ? 'password' : 'text',
            visible: !prevState.visible,
        }));
    };

    const validateInputs = () => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('* 이름을 입력해 주세요.');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!id.trim()) {
            setIdError('* 아이디를 입력해 주세요.');
            isValid = false;
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/.test(id)) {
            setIdError('* 4~12자 안에서 영문 대소문자, 숫자의 조합을 포함해야 합니다.');
            isValid = false;
        } else {
            setIdError('* 사용 가능한 아이디 입니다.');
        }

        if (!password.trim()) {
            setPasswordError('* 비밀번호를 입력해 주세요.');
            isValid = false;
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password)) {
            setPasswordError('* 8~12자 안에서 영문 대소문자, 특수기호와 숫자의 조합을 포함해야 합니다.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password && password === confirmPassword) {
            setConfirmPasswordError('* 비밀번호가 일치합니다.');
        } else if (password && password !== confirmPassword) {
            setConfirmPasswordError('* 비밀번호가 일치하지 않습니다.');
            isValid = false;
        }

        if (!phone.trim()) {
            setPhoneError('* 휴대폰 번호를 입력해 주세요.');
            isValid = false;
        } else {
            setPhoneError('');
        }

        return isValid;
    };

    const handleCertiRequest = (e) => {
        e.preventDefault();
        if (!phone.trim()) {
            setPhoneError('* 휴대폰 번호를 입력해 주세요.');
        } else {
            setPhoneError('');
            setShowCodeInput(true);
            setCodeSent(true);
        }
    };

    const handleCodeValidation = () => {
        if (code === '123456') {
            setCodeError('');
            setIsSubmitEnabled(true);
        } else {
            setCodeError('* 정확한 코드 번호를 입력해주세요.');
            setIsSubmitEnabled(false);
        }
    };

    const handleJoinSubmit = () => {
        if (validateInputs() && codeSent && isSubmitEnabled) {
            navigate('/user/join/success');
        }
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

    const handleTermsAgree = () => {
        setTermsAccepted(true);
        setShowTermsModal(false);
    };

    const handleTermsDisagree = () => {
        setShowTermsModal(false);
    };


    const handlePrivacyAgree = () => {
        setPrivacyAccepted(true);
        setShowPrivacyModal(false);
    };

    const handlePrivacyDisagree = () => {
        setShowPrivacyModal(false);
    };

    return (
        <div className='container'>
            <div className='join'>
                <div className='mid_text'>회원가입</div>
                <p className='min_text_ex'>별표(*)로 표시된 필드가 필수 필드입니다.</p>

                <input
                    type='text'
                    className='min_text'
                    placeholder='이름*'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError && <p className='error_message'>{nameError}</p>}

                <div className='user_container'>
                    <input
                        type='text'
                        className='min_text'
                        placeholder='아이디*'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button className='certi_btn' onClick={() => validateInputs()}>중복확인</button>
                </div>
                {idError && <p className={idError.includes('사용 가능한') ? 'success_message' : 'error_message'}>{idError}</p>}

                <div className="user_container">
                    <input
                        type={pwType.type}
                        className="min_text"
                        placeholder="비밀번호*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onMouseDown={handlePwState}>
                        <img src={pwType.visible ? noneye : eye} className="eye_icon" alt="toggle visibility" />
                    </span>
                </div>
                {passwordError && <p className='error_message'>{passwordError}</p>}

                <div className="user_container">
                    <input
                        type={pwType.type}
                        className="min_text"
                        placeholder="비밀번호 확인*"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span onMouseDown={handlePwState}>
                        <img src={pwType.visible ? noneye : eye} className="eye_icon" alt="toggle visibility" />
                    </span>
                </div>
                {confirmPasswordError && (
                    <p className={confirmPasswordError.includes('일치합니다') ? 'success_message' : 'error_message'}>
                        {confirmPasswordError}
                    </p>
                )}

                <div className="user_container">
                    <input
                        type='text'
                        className='min_text'
                        placeholder='휴대폰(-없이)*'
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                    <button className='certi_btn' onClick={handleCertiRequest}>인증요청</button>
                    {phoneError && <p className='error_message'>{phoneError}</p>}
                </div>

                {codeSent && <p className='success_message'>* 인증코드가 발송되었습니다.</p>}

                {showCodeInput && (
                    <div className="user_container">
                        <input
                            type="text"
                            className="min_text"
                            placeholder="인증번호"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button className="certi_btn" onClick={handleCodeValidation}>확인</button>
                    </div>
                )}
                {codeError && <p className='error_message'>{codeError}</p>}

                <div className='provision'>
                    <div className='agree_contents'>
                        <input
                            type='checkbox'
                            className='keep_login'
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <p onClick={() => setShowTermsModal(true)}>[필수] 이용약관 동의</p>
                        {showTermsModal && (
                            <Provision
                                name={'이용약관'}
                                onAgree={handleTermsAgree}
                                onDisagree={handleTermsDisagree}
                            />
                        )}
                    </div>

                    <div className='agree_contents'>
                        <input
                            type='checkbox'
                            className='keep_login'
                            checked={privacyAccepted}
                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        />
                        <p onClick={() => setShowPrivacyModal(true)}>[필수] 개인정보처리방침 동의</p>
                        {showPrivacyModal && (
                            <Provision
                                name={'개인정보처리방침'}
                                onAgree={handlePrivacyAgree}
                                onDisagree={handlePrivacyDisagree}
                            />
                        )}
                    </div>
                </div>

                <button
                    className='user_btn'
                    style={{
                        color: isSubmitEnabled ? 'var(--white)' : 'inherit',
                        backgroundColor: isSubmitEnabled ? '#333' : 'inherit',
                        cursor: isSubmitEnabled ? 'pointer' : 'default',
                    }}
                    onClick={handleJoinSubmit}
                    disabled={!termsAccepted || !privacyAccepted}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default Join;