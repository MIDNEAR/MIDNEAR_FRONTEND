import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckoutPage } from "./CheckoutPage";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "atMmm2Hp-aCA4e83tfBQl";

const Payments = () => {
    const location = useLocation();
    const amount = location.state?.amount || 0;
    const orderData = location.state?.orderData || null;
    console.log(location.state);
    const [userInfo, setUserInfo] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("userInfo")) || {};
        } catch (error) {
            console.error("userInfo JSON 파싱 오류:", error);
            return {};
        }
    });

    const [widgets, setWidgets] = useState(null);
    const isMember = userInfo !== null;
    const customerId = isMember ? userInfo.customerId : "guest-user";
    useEffect(() => {
        console.log(orderData);
        async function fetchPaymentWidgets() {
            const tossPayments = await loadTossPayments(clientKey);
            const widgets = tossPayments.widgets({
                customerKey: userInfo ? customerKey : ANONYMOUS,
            });
            setWidgets(widgets);
        }

        fetchPaymentWidgets();
    }, []);



    return (
        <div className="payments">
            <CheckoutPage initialamount={amount} orderData={orderData} />
        </div>
    );
};

export default Payments;
