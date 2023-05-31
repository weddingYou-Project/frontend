import React, { useState, useEffect } from "react";
import "../Css/main.css";
import "../Css/Ratingpage.css";
import "../Css/checkout.css";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import defaultprofileimage from "../Assets/defaultprofileimage.jpg";
import axios from "axios";

function CheckoutAll() {
  var IMP = window.IMP;
  IMP.init("imp67011510");
  const { estimateId } = useLocation().state;
  console.log(estimateId);
  const { userName } = useLocation().state;
  const { userPhone } = useLocation().state;
  const { planneremail } = useLocation().state;
  const { plannerName } = useLocation().state;
  console.log(plannerName);
  const { plannerImg } = useLocation().state;
  const { price } = useLocation().state;
  console.log(plannerImg);

  const navigate = useNavigate();

  //const [price, setPrice] = useState(10000);
  const [quantity, setQuantity] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState(price * quantity);
  const [paymentMethod, setPaymetMethod] = useState("card");
  const [paymentStatus, setPaymentStatus] = useState("paid");
  const [depositAmount, setDepositAmount] = useState(paymentAmount * 0.05);

  const [depositStatus, setDepositStatus] = useState("paid");
  const [paymentType, setPaymentType] = useState("all");
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email"));
  const [plannerEmail, setPlannerEmail] = useState(planneremail);
  let paymentAmount1 = paymentAmount - depositAmount;

  function requestPay() {
    IMP.request_pay(
      {
        pg: "kcp",
        pay_method: { paymentMethod },
        merchant_uid: `56907801-${estimateId}` + IMP,
        name: "플래너 매칭서비스",
        amount: paymentAmount1,
        buyer_email: sessionStorage.getItem("email"),
        buyer_name: userName,
        buyer_tel: userPhone,
        // buyer_addr: "서울특별시 강남구 삼성동",
        // buyer_postcode: "123-456",
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          axios
            .post("/payment/callback", {
              estimateId: estimateId,
              paymentMethod: paymentMethod,
              tempPaymentStatus: "paid",
              paymentType: "all",
            })
            .then((res) => {
              console.log(res);
              const value = res.data;
              if (value == -2) {
                alert("계약금 결제 먼저 해주세요.");
              } else if (value == -1) {
                alert("유효하지 않은 결제 유형입니다.");
              } else if (value == 0) {
                //계약금 처리만 된 상태(취소 상태로 paymentStatus 자동으로 바뀜)
              } else if (value == 1) {
                sessionStorage.setItem("checkout", "all");
                navigate("/checkoutcomp", {
                  state: {
                    estimateId: estimateId,
                    plannerImg: plannerImg,
                    plannerName: plannerName,
                    planneremail: planneremail,
                    price: price,
                  },
                });
              } else if (value == 2) {
                alert("이미 전체 결제가 이루어진 건입니다!");
              }
            })
            .catch((e) => {
              //  console.log(e);
            });
        } else {
          alert(rsp.error_msg);

          axios
            .post("/payment/callback", {
              estimateId: estimateId,
              paymentMethod: paymentMethod,
              tempPaymentStatus: "cancelled",
              paymentType: "all",
            })
            .then((res) => {
              console.log(res);
              const value = res.data;
              if (value == -2) {
                alert("계약금 결제 먼저 해주세요.");
              } else if (value == -1) {
                alert("유효하지 않은 결제 유형입니다.");
              } else if (value == 0) {
                //계약금 처리만 된 상태(취소 상태로 paymentStatus 자동으로 바뀜)
              } else if (value == 1) {
                alert("전체 금액 결제가 완료되었습니다!");
                sessionStorage.setItem("checkout", "all");
                navigate("/checkoutcomp", {
                  state: {
                    estiamteId: estimateId,
                    plannerImg: plannerImg,
                    plannerName: plannerName,
                    planneremail: planneremail,
                  },
                });
              } else if (value == 2) {
                console.log("************************");
                alert("이미 전체 결제가 이루어진 건입니다!");
              }
            })
            .catch((e) => {
              //  console.log(e);
            });
        }
      }
    );
  }
  useEffect(() => {
    axios
      .post("/payment/callback", {
        estimateId: estimateId,
        paymentMethod: paymentMethod,
        tempPaymentStatus: "cancelled",
        paymentType: "all",
      })
      .then((res) => {
        console.log(res);
        const value = res.data;
        if (value == -2) {
          alert("계약금 결제 먼저 해주세요.");
        } else if (value == -1) {
          alert("유효하지 않은 결제 유형입니다.");
        } else if (value == 0) {
          //계약금 처리만 된 상태(취소 상태로 paymentStatus 자동으로 바뀜)
        } else if (value == 1) {
          alert("전체 금액 결제가 완료되었습니다!");
        } else if (value == 2) {
          console.log("+++++++++++++");
          alert("이미 전체 결제가 이루어진 건입니다!");
          navigate("/matching");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="mainlayout" style={{ minHeight: "100vh" }}>
      <NavigationBar title={"결제하기"} />
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
            value="맞춤형 웨딩플래너 서비스"
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
          <p className="detailcheckout" style={{ fontSize: "0.9em" }}>
            전체금액 - 계약금
            <br /> ({paymentAmount}원) - ({depositAmount}원)
          </p>
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
            value={`${paymentAmount1}원`}
            style={{ fontSize: "0.9em" }}
          />
        </div>
      </div>
      <button
        onClick={requestPay}
        className="checkoutBtn"
        style={{ marginTop: "10px" }}
      >
        결제하기
      </button>
      <Footer />
    </div>
  );
}

export default CheckoutAll;
