import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Sections/Footer';
import Manager from './components/Manager/Manager';
import ManagerHeader from './components/Manager/Header';
import Header from './components/Sections/Header';
import PasswordEnter from './components/Mypage/UserInformation/PasswordEnter';
import PasswordConfirm from './components/Mypage/UserInformation/PasswordConfirm';
import InfoChange from './components/Mypage/UserInformation/infoChange';
import PasswordChange from './components/Mypage/UserInformation/PasswordChange';
import WritingReview from './components/Mypage/OrderList/WritingReview';
import OrderListBasic from './components/Mypage/OrderList/OrderListBasic';
import OrderDetail from './components/Mypage/OrderList/OrderDetail';
import OrderCancelStart from './components/Mypage/OrderList/OrderCancel/OrderCancelStart';
import OrderCancelReaon from './components/Mypage/OrderList/OrderCancel/OrderCancelReaon';
import OrderCancelDone from './components/Mypage/OrderList/OrderCancel/OrderCancelDone';
import CanceledOrder from './components/Mypage/OrderList/CanceledOrder';
import Join from './components/User/Join';
import Login from './components/User/Login';
import FindID from './components/User/FindID';
import FindPW from './components/User/FindPW';
import ChangePW from './components/User/ChangePW';
import Successful from './components/User/FindID/Successful';
import Failed from './components/User/FindID/Failed';
import UntilChange from './components/User/FindPW/UntilChange';
import ChangeSuccess from './components/User/FindPW/ChangeSuccess';
import SuccessJoin from './components/User/Join/SuccessJoin';
import AllShop from './components/Shop/AllShop';
import ProdDetail from './components/Shop/ProdDetail';
import SelectContents from './components/Mypage/OrderList/SelectContents';
import ExchangeReson from './components/Mypage/OrderList/Exchange/ExchangeReson';
import RefundReson from './components/Mypage/OrderList/Refund/RefundReson';
import ExchangeDone from './components/Mypage/OrderList/Exchange/ExchangeDone';
import RefundDone from './components/Mypage/OrderList/Refund/RefundDone';

import Ask from './components/Mypage/CustomerService/Ask';
import AskedList from './components/Mypage/CustomerService/AskedList';
import AskDetail from './components/Mypage/CustomerService/AskDetail';
import Colligation from './components/Mypage/Cupon/Colligation';
import CuponList from './components/Mypage/Cupon/CuponList';
import PointList from './components/Mypage/Cupon/PointList';
import DeliveryAddress from './components/Mypage/UserInformation/DeliveryAddress';
import ReviewImage from './components/Shop/ReviewImage';
import GotoLogin from './components/Cart/GotoLogin';
import PaySucceed from './components/Cart/Pay/PaySucceed';
import PayFailed from './components/Cart/Pay/PayFailed';
import NoMemInfo from './components/Cart/Order/NoMemInfo';
import MemInfo from './components/Cart/Order/MemInfo';
import NewAddress from './components/Cart/Order/NewAddress';
import SelectAdd from './components/Cart/Order/SelectAdd';
import None from './components/Sections/None';
import Detail from './components/Manager/Goods/Detail';
import MagazineList from './components/Magazine/MagazineList';
import MagazinDetail from './components/Magazine/MagazinDetail';
import MypageMenu from './components/Mypage/MypageMenu';


function App() {
  const location = useLocation();
  const isManagerRoute = location.pathname.startsWith('/manager');
  return (
    <>
      {isManagerRoute ? <ManagerHeader /> : <Header />}

      <Routes>
        {/* 유저 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/mypage/userinformaiton/confirm" element={<PasswordConfirm />} />
        <Route path="/mypage/userinformaiton/userinfo/changing" element={<InfoChange />} />
        <Route path="/mypage/userinformaiton/password/change" element={<PasswordEnter />} />
        <Route path="/mypage/userinformaiton/password/changing" element={<PasswordChange />} />
        <Route path="/mypage/userinformaiton/address" element={<DeliveryAddress />} />
        <Route path="/mypage/orderlist/writingReview" element={<WritingReview />} />
        <Route path="/mypage/orderlist/" element={<OrderListBasic />} />
        <Route path="/mypage/orderlist/detail" element={<OrderDetail />} />
        <Route path="/mypage/orderlist/option" element={<SelectContents />} />
        <Route path="/mypage/orderlist/option/exchange" element={<ExchangeReson />} />
        <Route path="/mypage/orderlist/option/refund" element={<RefundReson />} />
        <Route path="/mypage/orderlist/option/exchange/done" element={<ExchangeDone />} />
        <Route path="/mypage/orderlist/option/refund/done" element={<RefundDone />} />
        <Route path="/mypage/orderlist/option/ordercancel/application" element={<OrderCancelStart />} />
        <Route path="/mypage/orderlist/option/ordercancel" element={<OrderCancelReaon />} />
        <Route path="/mypage/orderlist/option/ordercancel/done" element={<OrderCancelDone />} />
        <Route path="/mypage/cancellist" element={<CanceledOrder />} />
        <Route path="/mypage/" element={<MypageMenu />} />

        <Route path="/mypage/question/create" element={<Ask />} />
        <Route path="/mypage/question/list" element={<AskedList />} />
        <Route path="/mypage/question/detail" element={<AskDetail/>} />
        <Route path="/mypage/colligation" element={<Colligation/>} />
        <Route path="/mypage/colligation/cupon" element={<CuponList/>} />
        <Route path="/mypage/colligation/point" element={<PointList/>} />
        
        
        <Route path='/shop/:category/:subCategory' element={<AllShop />} />
        <Route path='/shop/:category' element={<AllShop />} />

        <Route path="user/join" element={<Join />} />
        <Route path='user/login' element={<Login />} />
        <Route path='user/find/id' element={<FindID />} />
        <Route path='user/find/pw' element={<FindPW />} />
        <Route path='user/change/pw' element={<ChangePW />} />
        <Route path='user/find/id/showid' element={<Successful />} />
        <Route path='user/find/id/nonid' element={<Failed />} />
        <Route path='user/find/pw/change' element={<UntilChange />} />
        <Route path='/user/change/success' element={<ChangeSuccess />} />
        <Route path='/user/join/success' element={<SuccessJoin />} />
        
        <Route path='/products/detail' element={<ProdDetail />} />        
        <Route path='/review/images' element={<ReviewImage />} />  
        <Route path='/order/login' element={<GotoLogin />} />    
        <Route path='/order/pay-succeed' element={<PaySucceed />} />    
        <Route path='/order/pay-failed' element={<PayFailed />} />     
        <Route path='/order/delivery/no-member' element={<NoMemInfo/>} />   
        <Route path='/order/delivery/member' element={<MemInfo />} />       
        <Route path='/order/delivery/new-address' element={<NewAddress />} />   
        <Route path='/order/delivery/select-address' element={<SelectAdd />} />  
        <Route path='/others/magazine' element={<MagazineList />} />
        <Route path='/others/magazine/detail' element={<MagazinDetail />} />

        {/* 관리자 페이지 */}

        <Route path="/manager/*" element={<Manager />}/>
        <Route path="/manager/Goods/Detail/:name" element={<Detail />} />
        <Route path='*' element={<None />}/>

      </Routes>
      <Footer />
    </>
  );
}

const RootApp = () => (
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

export default RootApp;
