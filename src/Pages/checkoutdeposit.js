import React from "react";
import "../Css/main.css";
import "../Css/Ratingpage.css";
import "../Css/checkout.css";
import defaultprofileimage from "../Assets/defaultprofileimage.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

function Checkoutdeposit() {
  var IMP = window.IMP;
  IMP.init("imp67011510");

  const navigate = useNavigate();

  const { estimateId } = useLocation().state;
  const { userName } = useLocation().state;
  const { userPhone } = useLocation().state;
  const { plannerName } = useLocation().state;
  const { plannerImg } = useLocation().state;
  console.log("estimateId:" + estimateId);
  console.log("userName:" + userName);
  console.log("userPhone:" + userPhone);
  console.log("plannerImg" + plannerImg);
  function requestPay() {
    IMP.request_pay(
      {
        pg: "kcp",
        pay_method: "card",
        merchant_uid: `57008833-${estimateId}` + IMP,
        name: "플래너 매칭 계약금",
        amount: 500,
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
          alert("결제가 완료됐습니다!");
          navigate("/checkoutcomp");
          sessionStorage.setItem("checkout", "deposit");
        } else {
          console.log(rsp);
          alert(rsp.error_msg);
        }
      }
    );
  }

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
          상품 금액
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="itemName"
            value="100,000원"
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
