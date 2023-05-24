import React from "react";
import "../Css/main.css";
import "../Css/Ratingpage.css";
import "../Css/checkout.css";
import imgLogo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";

function CheckoutAll() {
  var IMP = window.IMP;
  IMP.init("imp67011510");

  const navigate = useNavigate();

  function requestPay() {
    IMP.request_pay(
      {
        pg: "kcp",
        pay_method: "card",
        merchant_uid: "57008833-33015" + IMP,
        name: "플래너 매칭서비스",
        amount: 5,
        buyer_email: "Weddingyou@gmail.com",
        buyer_name: "wedding you",
        buyer_tel: "010-1234-5678",
        // buyer_addr: "서울특별시 강남구 삼성동",
        // buyer_postcode: "123-456",
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          console.log(rsp);
          alert("결제가 완료됐습니다!");
          navigate("/checkoutcomp");
          sessionStorage.setItem("checkout", "all");
        } else {
          console.log(rsp);
          alert(rsp.error_msg);
        }
      }
    );
  }

  return (
    <div className="mainlayout">
      <NavigationBar title={"결제하기"} />
      <div className="plannerpro" style={{ marginTop: 50 }}>
        <img src={imgLogo} className="plannerproimg" />
        <p className="plannerName">000 플래너</p>
      </div>
      <div className="mb-3 row checkouttext">
        <label for="staticEmail" className="col-sm-4 col-form-label">
          상품명
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="itemName"
            value="맞춤형 웨딩플래너 서비스"
          />
        </div>
      </div>
      {/* <hr /> */}
      <div className="mb-3 row checkouttext">
        <label for="staticEmail" className="col-sm-4 col-form-label">
          상품 상세정보
        </label>
        <div className="col-sm-8">
          <p className="detailcheckout">
            플래너 매칭비용 - 계약금
            <br /> (300,000원) - (100,000원)
          </p>
        </div>
      </div>
      {/* <hr /> */}
      <div className="mb-3 row checkouttext">
        <label for="staticEmail" className="col-sm-4 col-form-label">
          상품 금액
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="itemName"
            value="200,000원"
          />
        </div>
      </div>
      <button onClick={requestPay} className="checkoutBtn">
        결제하기
      </button>
    </div>
  );
}

export default CheckoutAll;
