import React from "react";
import "../Css/main.css";
import "../Css/Login.css";
import imgLogo from "../Assets/logo.png";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { useState, useEffect } from "react";

function PasswordChange() {
  const ModalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      background: "#FAFAFA",
      overflow: "auto",
      width: "470px",
      height: "300px",
      margin: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  let [passwordcheck, setPasswordcheck] = useState(false);
  let [passwordcheck2, setPasswordcheck2] = useState(false);

  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");

  let [passwordstyle, setPasswordstyle] = useState("");
  let [passwordstyle2, setPasswordstyle2] = useState("");

  useEffect(() => {
    if (password === "") {
      setPasswordstyle("");
      setPasswordcheck(false);
    }
    if (password2 === "" || password2 === null) {
      setPasswordstyle2("");
      setPasswordcheck2(false);
    } else if (password === password2) {
      setPasswordstyle2("is-valid");
      setPasswordcheck2(true);
    } else {
      setPasswordstyle2("is-invalid");
      setPasswordcheck2(false);
    }
  }, [password, password2, setPasswordcheck2]);

  const EventHandlerPassword = (e) => {
    const passwordRegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/;
    setPassword(e.target.value);
    if (passwordRegExp.test(e.target.value)) {
      setPasswordstyle("is-valid");
      setPasswordcheck(true);
    } else {
      setPasswordstyle("is-invalid");
      setPasswordcheck(false);
    }
  };

  const EventHandlerPassword2 = (e) => {
    setPassword2(e.target.value);
    if (password === e.target.value) {
      setPasswordstyle2("is-valid");
      setPasswordcheck2(true);
    } else {
      setPasswordstyle2("is-invalid");
      setPasswordcheck2(false);
    }
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={"비밀번호 변경하기"} />
      <div className="container text-center">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <img className="logo" src={imgLogo} alt="로고" />
          </div>
          <div className="col"></div>
        </div>
      </div>
      <div className="container text-center">
        {/* <form> */}
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            {/* <p className="loginmessage">변경할 비밀번호를 입력하세요</p> */}
            <div className="mb-3">
              <InputComp
                content="변경할 비밀번호"
                EventHandler={EventHandlerPassword}
                style={passwordstyle}
                message="최소8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함"
                length={20}
                type="password"
              />
              <InputComp
                content="비밀번호 확인"
                EventHandler={EventHandlerPassword2}
                style={passwordstyle2}
                message="비밀번호 불일치"
                length={20}
                type="password"
              />
            </div>
          </div>
          <div className="col"></div>
        </div>
        <br />
        <button
          type="submit"
          className="btn-custom1"
          onClick={openModal}
          disabled={!passwordcheck || !passwordcheck2}
        >
          비밀번호 변경하기
        </button>
        {/* </form> */}
        <br />
        <button type="submit" className="btn-custom-tomain">
          <Link to="/login" className="SLogin">
            메인으로 돌아가기
          </Link>
        </button>
        <br />
        <br />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container text-center">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="infotext">
                <i className="bi bi-dash-lg"></i>&nbsp;&nbsp;
                <span>비밀번호 변경 완료</span>&nbsp;&nbsp;
                <i className="bi bi-dash-lg"></i>
              </div>
            </div>
            <div claclassNamess="col-2"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="infotext1">
                비밀번호가 변경되었습니다.
                <br />
                바뀐 비밀번호로 로그인해주세요!
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <br />
          <button className="btn-custom1">
            <Link to="/login" className="SLogin">
              메인으로 돌아가기
            </Link>
          </button>
        </div>
      </Modal>
      <Footer />
    </div>
  );
}

export default PasswordChange;

const InputComp = ({
  EventHandler,
  content,
  style,
  message,
  length,
  type,
  value,
}) => {
  return (
    <>
      <div className="col-md-4" style={{ width: 256 }}>
        <label htmlFor="validationServer01" className="form-label">
          <span style={{ fontSize: 10 }}>{content}</span>
        </label>
        <input
          type={type}
          className={`form-control ${style}`}
          id="validationServer01"
          required
          onChange={EventHandler}
          maxLength={length}
          value={value}
        />
        <div
          id="validationServer03Feedback"
          className="invalid-feedback"
          style={{ fontSize: 10 }}
        >
          {message}
        </div>
      </div>
    </>
  );
};
