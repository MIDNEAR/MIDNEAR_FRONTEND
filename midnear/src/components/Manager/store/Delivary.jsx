import React, { useState, useEffect } from "react";
import Modal from '../Modals/Modal';
import Selected from '../../../assets/img/store/selected.svg';
import NoSelected from '../../../assets/img/store/noselected.svg';

const Delivary = () => {
  const [all, setAll] = useState(false);
  const [jeju, setJeju] = useState(false);
  const [etc, setEtc] = useState(false);
  const [open, setOpen] = useState(false);
  const [shippingOption, setShippingOption] = useState("조건부 무료배송");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);


  const ClickAll = (prev) => {
    setEtc(prev);
    setJeju(prev);
    setAll(prev)
  }
  const ClickJeju = (prev) => {
    setJeju(prev);

  }
  const ClickEtc = (prev) => {
    setEtc(prev);

  }

  useEffect(() => {
    if (jeju && etc) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [jeju, etc]);

  const OptionSelect = (option) => {
    setShippingOption(option);
    OpenOptions();
  }
  const OpenOptions = () => {
    setOpen(!open)
  }
  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsCompleted(true);
    setIsModalOpen(false);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='delivary container'>
      <p className='title'>배송비 관리</p>
      <div className="nomal">
        <p>기본 배송비 관리</p>
        <div className="line"></div>
        <div className="wrap">
          <div className="category"></div>
          <div className="nomal_wrap">
            <div className="select">
              <p>{shippingOption}</p>
              <div className={`semo ${open ? "open" : " "}`} onClick={() => OpenOptions()}></div>
            </div>
            <div className={` ${open ? "options" : "none "}`}>
              <div className="option" onClick={() => OptionSelect("조건부 무료배송")}>
                <p>조건부 무료배송</p>
              </div>
              <div className="option" onClick={() => OptionSelect("무료배송")}>
                <p>무료배송</p>
              </div>
              <div className="option" onClick={() => OptionSelect("유료배송")}>
                <p>유료배송</p>
              </div>
            </div>

            {shippingOption === "무료배송" ? <></> : (

              <>
                <div className="input_nomal">
                  <p>• 기본 배송비</p>
                  <div className="wp">
                    <div className="krw">KRW</div>
                    <input type="text" />
                  </div>
                </div>
                {shippingOption === "조건부 무료배송" && (
                  <div className="input_free">
                    <p>• 무료배송 조건</p>
                    <div className="free_wrap">
                      <div className="wp">
                        <div className="krw">KRW</div>
                        <input type="text" />
                      </div>
                      <p>이상 구매시</p>
                    </div>
                  </div>)}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="region">
        <p>지역별 배송비 관리</p>
        <div className="line"></div>
        <div className="wrap">
          <div className="category"></div>
          <div className="region_wrap">
            <div className="input_wrap">
              <p>지역별 배송비 전체 사용</p>
              {all ? <img src={Selected} alt="selected" onClick={() => ClickAll(false)} /> : <img src={NoSelected} alt="noselected" onClick={() => ClickAll(true)} />}
            </div>
            <div className="input_jeju">
              <div className="semi-title">
                <p>• 제주도 배송비</p>
                {jeju ? <img src={Selected} alt="selected" onClick={() => ClickJeju(false)} /> : <img src={NoSelected} alt="noselected" onClick={() => ClickJeju(true)} />}
              </div>
              <div className="wp">
                <div className="krw">KRW</div>
                <input type="text" />
              </div>
            </div>
            <div className="input_etc">
              <div className="semi-title">
                <p>• 도서 산간 배송비</p>
                {etc ? <img src={Selected} alt="selected" onClick={() => ClickEtc(false)} /> : <img src={NoSelected} alt="noselected" onClick={() => ClickEtc(true)} />}
              </div>
              <div className="wp">
                <div className="krw">KRW</div>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="btn" onClick={handleSave}>
        저장
      </div>
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Delivary;
