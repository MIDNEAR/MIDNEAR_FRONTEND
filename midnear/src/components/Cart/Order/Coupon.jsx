import React, {useState, useEffect, useRef} from 'react'

const Coupon = ({ onSelectCoupon, onResetCoupon, couponList }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [select, setSelect] = useState(null);
        const ref = useRef(null);
    
        // 드롭다운 메뉴
        const removeHandler = () => {
            setIsOpen(!isOpen);
        }
        const handleSelect = (value) =>{
            setSelect(value);
            onSelectCoupon(value);
            setIsOpen(false);
        }
        const handleReset = () => {
          setSelect(null);
          onResetCoupon();
          setIsOpen(false);
        };
        useEffect(() => {
            const onClick = (e) => {            
            if(ref.current !== null && !ref.current.contains(e.target)){
                setIsOpen(!isOpen)
            }
            };
            if(isOpen){
                window.addEventListener("click", onClick);
            }
            return () => {
                window.removeEventListener("click", onClick);
            };
        }, [isOpen]);
        
  return (
    <div className='dc-btn' ref={ref}>
      <div className="selected" onClick={removeHandler}>
        <div className='coupon'>{select ? select.couponName : "할인 쿠폰 적용하기"}</div>
      </div>
        
      {isOpen && (
        <div className="no-selected">
          {select ? (
            <div className="coupon" onClick={handleReset}>
              쿠폰 적용 취소하기
            </div>
          ) :  couponList.filter(coupon => !coupon.usedStatus).length > 0 ? (
            couponList
            .filter(coupon => !coupon.usedStatus)
            .map((coupon,index) => (
              <div
                className="coupon"
                key={index}
                onClick={() => handleSelect(coupon)}
              >
                {coupon.couponName}
              </div>
            ))
          ) : (
            <div className="coupon">쿠폰이 없습니다</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Coupon