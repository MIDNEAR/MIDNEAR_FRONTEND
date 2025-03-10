import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "JgpJpiJJKVIdLT-42ITtO";

export function CheckoutPage({ initialamount, isMember, customerId }) {

  const [amount, setAmount] = useState({
    currency: "KRW",
    value: initialamount ?? 0,
  });
  const [userInfo, setUserInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo")) || {};
    } catch (error) {
      console.error("userInfo JSON 파싱 오류:", error);
      return {};
    }
  });

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);

      const widgets = tossPayments.widgets({
        customerKey,
      })

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [isMember, customerId]);


  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets, amount]);

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-method" />
        <div id="agreement" />
        <div className="order">
          <h2>총 결제 금액</h2>
          <h1>{amount.value.toLocaleString()}원</h1>

          <button
            className="button"
            disabled={!ready}
            onClick={async () => {
              try {
                await widgets.requestPayment({
                  orderId: `order-${Date.now()}`,
                  orderName: "토스 티셔츠 외 2건",
                  successUrl: window.location.origin + "/order/pay-succeed",
                  failUrl: window.location.origin + "/order/pay-failed",
                  customerEmail: isMember ? userInfo.email : "guest@example.com",
                  customerName: isMember ? userInfo.name : "비회원 사용자",
                  customerMobilePhone: isMember ? userInfo.phone : "01012341234",
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
