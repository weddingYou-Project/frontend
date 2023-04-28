import "../Css/main.css";
import "../Css/mypage.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

function Mypage() {
  const title = "마이페이지";
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
      top: "30vh",
      left: "32vw",
      right: "32vw",
      bottom: "30vh",
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

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("looks good!");
  const [passwordCheck, setPasswordCheck] = useState("");
  const passwordInput = useRef();

  const passwordFeedback = useRef();
  const onChange = (e) => {
    if (e.target.id === "passwordcheck") {
      console.log(e.target.value);
      const passwordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/;
      if (passwordRegExp.test(e.target.value)) {
        setPasswordMessage("looks good!");
        passwordInput.current.classList.remove("is-invalid");
        passwordInput.current.classList.add("is-valid");
        passwordFeedback.current.classList.remove("invisible");
        passwordFeedback.current.classList.remove("invalid-feedback");
        passwordFeedback.current.classList.add("valid-feedback");
      } else {
        setPasswordMessage(
          "최소8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함"
        );
        passwordInput.current.classList.add("is-invalid");
        passwordFeedback.current.classList.add("invalid-feedback");
        passwordFeedback.current.classList.remove("invisible");
        passwordFeedback.current.classList.remove("valid-feedback");
        passwordInput.current.classList.remove("is-valid");
      }
      setPasswordCheck(e.target.value);
    }
  };

  const deletePassword = () => {
    setPasswordCheck("");
    passwordFeedback.current.classList.remove("invalid-feedback");
    passwordFeedback.current.classList.remove("valid-feedback");
    passwordInput.current.classList.remove("is-invalid");
    passwordInput.current.classList.remove("is-valid");
    passwordFeedback.current.classList.add("invisible");
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={title} />
      <div className="content container text-center">
        <form className="col">
          <img src="" alt="" />
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="name" className="form-label col col-md-2 mt-2">
              이름
            </label>
            <div className="col col-md-7">
              <input
                type="text"
                className="form-control "
                id="name"
                value={name}
                autocomplete="off"
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="password" className="form-label col col-md-2 mt-2">
              비밀번호
            </label>
            <div className="has-validation col col-md-7">
              <input
                type="text"
                className="form-control "
                id="password"
                value={password}
                autocomplete="off"
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="email" className="form-label col col-md-2 mt-2">
              이메일
            </label>
            <div className="has-validation col col-md-7">
              <input
                type="text"
                className="form-control "
                id="email"
                value={email}
                autocomplete="off"
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="phone" className="form-label col col-md-2 mt-2">
              휴대폰
            </label>
            <div className="has-validation col col-md-7">
              <input
                type="text"
                className="form-control "
                id="phone"
                value={phone}
                autocomplete="off"
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="password" className="form-label col col-md-2 mt-2">
              성별
            </label>
            <div className="has-validation col col-md-7">
              <div className="form-check row justify-content-md-start  mb-3">
                <div className="form-check-inline col col-md-2 p-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    checked
                  />
                  <label className="form-check-label" htmlFor="male">
                    남
                  </label>
                </div>
                <div className="form-check-inline col col-md-2 p-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                  />
                  <label className="form-check-label" htmlFor="female">
                    여
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn-custom"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            정보 수정하기
          </button>

          <button className="btn-custom">
            <Link to="/login" className="SLogin">
              로그아웃
            </Link>
          </button>
          <button className="btn-custom">
            <Link to="/login" className="SLogin">
              회원탈퇴
            </Link>
          </button>
        </form>
      </div>
      <Footer />
      {/* modal 창 */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title justify-content-center fs-5"
                id="exampleModalLabel"
              >
                - 비밀번호 확인 -
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={deletePassword}
              ></button>
            </div>
            <div class="modal-body">
              <div class="has-validation col col-md-7">
                <input
                  type="password"
                  class="form-control "
                  id="passwordcheck"
                  ref={passwordInput}
                  value={passwordCheck}
                  onChange={onChange}
                  required
                  autocomplete="off"
                />
                <div
                  class="invisible text-start password-feedback"
                  ref={passwordFeedback}
                >
                  {passwordMessage}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deletePassword}
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
