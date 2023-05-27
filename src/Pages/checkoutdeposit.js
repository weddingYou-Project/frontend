import React from "react";
import "../Css/main.css";
import "../Css/Ratingpage.css";
import "../Css/checkout.css";
import defaultprofileimage from "../Assets/defaultprofileimage.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

function Checkoutdeposit() {
  var IMP = window.IMP;
  IMP.init("imp67011510");

  const navigate = useNavigate();

  const { estimateId } = useLocation().state;
  const { userName } = useLocation().state;
  const { userPhone } = useLocation().state;
  const { planneremail } = useLocation().state;
  const { plannerName } = useLocation().state;
  const { plannerImg } = useLocation().state;
  console.log("estimateId:" + estimateId);
  console.log("userName:" + userName);
  console.log("userPhone:" + userPhone);
  console.log("planneremail:" + planneremail);
  console.log("plannerName:" + plannerName);
  console.log("plannerImg" + plannerImg);

  const [price, setPrice] = useState(10000);
  const [quantity, setQuantity] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState(price * quantity);
  const [paymentMethod, setPaymetMethod] = useState("card");
  const [paymentStatus, setPaymentStatus] = useState("other");
  const [depositAmount, setDepositAmount] = useState(paymentAmount * 0.05);
  console.log("depositAmount:" + depositAmount);
  const [depositStatus, setDepositStatus] = useState("paid");
  const [paymentType, setPaymentType] = useState("deposit");
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email"));
  const [plannerEmail, setPlannerEmail] = useState(planneremail);
  let depositAmount1 = depositAmount;

  function requestPay() {
    IMP.request_pay(
      {
        pg: "kcp",
        pay_method: { paymentMethod },
        merchant_uid: `57006940-${estimateId}` + IMP,
        name: "플래너 매칭 계약금",
        amount: depositAmount1,
        buyer_email: sessionStorage.getItem("email"),
        buyer_name: userName,
        buyer_tel: userPhone,
        // buyer_addr: "서울특별시 강남구 삼성동",
        // buyer_postcode: "123-456",
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          console.log(rsp);

          axios
            .post("/deposit/callback", {
              price: price,
              quantity: quantity,
              paymentMethod: paymentMethod,
              paymentAmount: paymentAmount,
              tempPaymentStatus: paymentStatus,
              depositAmount: depositAmount,
              tempDepositStatus: depositStatus,
              paymentType: paymentType,
              userEmail: userEmail,
              plannerEmail: plannerEmail,
              estimateId: estimateId,
            })
            .then((res) => {
              console.log(res);
              alert("결제가 완료됐습니다!");
              sessionStorage.setItem("checkout", "deposit");
              navigate("/checkoutcomp", {
                state: {
                  estiamteId: estimateId,
                  plannerImg: plannerImg,
                  plannerName: plannerName,
                  planneremail: planneremail,
                },
              });
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          console.log(rsp);
          alert(rsp.error_msg);

          axios
            .post("/deposit/callback", {
              price: price,
              quantity: quantity,
              paymentMethod: paymentMethod,
              paymentAmount: paymentAmount,
              tempPaymentStatus: paymentStatus,
              depositAmount: depositAmount,
              tempDepositStatus: "cancelled",
              paymentType: paymentType,
              userEmail: userEmail,
              plannerEmail: plannerEmail,
              estimateId: estimateId,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    );
  }

  useEffect(() => {
    axios
      .post("/deposit/callback", {
        price: price,
        quantity: quantity,
        paymentMethod: paymentMethod,
        paymentAmount: paymentAmount,
        tempPaymentStatus: paymentStatus,
        depositAmount: depositAmount,
        tempDepositStatus: "cancelled",
        paymentType: paymentType,
        userEmail: userEmail,
        plannerEmail: plannerEmail,
        estimateId: estimateId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="mainlayout">
      <NavigationBar title={"결제하기 (계약금)"} />
      <div className="plannerpro" style={{ marginTop: 110 }}>
        {plannerImg === "data:image/jpeg;base64," ? (
          <img
            src={defaultprofileimage}
            style={{ width: "250px", height: "230px" }}
            className="plannerproimg"
            alt={defaultprofileimage}
          />
        ) : (
          <img
            src={plannerImg}
            style={{ width: "250px", height: "230px" }}
            className="plannerproimg"
            alt={defaultprofileimage}
          />
        )}

        <p className="plannerName">{plannerName}</p>
      </div>
      <div className="mb-3 row checkouttext">
        <label
          for="staticEmail"
          style={{ fontSize: "0.9em" }}
          className="col-sm-4 col-form-label"
        >
          상품명
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="itemName"
            value="맞춤형 웨딩플래너 서비스(계약)"
            style={{ fontSize: "0.9em" }}
          />
        </div>
      </div>
      {/* <hr /> */}
      <div className="mb-3 row checkouttext">
        <label
          for="staticEmail"
          style={{ fontSize: "0.9em" }}
          className="col-sm-4 col-form-label"
        >
          상품 상세정보
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="itemName"
            value="플래너 매칭 계약금"
            style={{ fontSize: "0.9em" }}
          />
        </div>
      </div>
      {/* <hr /> */}
      <div className="mb-3 row checkouttext">
        <label
          for="staticEmail"
          style={{ fontSize: "0.9em" }}
          className="col-sm-4 col-form-label"
        >
          계약금 금액
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="itemName"
            value={depositAmount}
            style={{ fontSize: "0.9em" }}
          />
        </div>
      </div>
      <button
        onClick={requestPay}
        style={{ marginTop: "15px" }}
        className="checkoutBtn"
      >
        결제하기
      </button>
      <Footer />
    </div>
  );
}

export default Checkoutdeposit;
