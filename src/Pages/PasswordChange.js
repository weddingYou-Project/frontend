import React from "react";
import "../Css/main.css";
import "../Css/Login.css";
import imgLogo from "../Assets/logo.png";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

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

  return (
    <div className="mainlayout">
      <NavigationBar title={"비밀번호 변경하기"} />
      <div class="container text-center">
        <div class="row">
          <div class="col"></div>
          <div class="col-6">
            <img className="logo" src={imgLogo} alt="로고" />
          </div>
          <div class="col"></div>
        </div>
      </div>
      <div class="container text-center">
        <form>
          <div class="row">
            <div class="col"></div>
            <div class="col-6">
              <p className="loginmessage">변경할 비밀번호를 입력하세요</p>
              <div class="mb-3">
                <input
                  type="password"
                  class="inputarea"
                  placeholder="변경할 비밀번호"
                />
                <input
                  type="password"
                  class="inputarea"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>
            <div class="col"></div>
          </div>
          <br />
          <button type="submit" class="btn-custom" onClick={openModal}>
            비밀번호 변경하기
          </button>
        </form>
        <button type="submit" class="btn-custom-tomain">
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
        <div class="container text-center">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <div className="infotext">
                <i class="bi bi-dash-lg"></i>&nbsp;&nbsp;
                <span>비밀번호 변경 완료</span>&nbsp;&nbsp;
                <i class="bi bi-dash-lg"></i>
              </div>
            </div>
            <div class="col-2"></div>
          </div>
          <br />
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div className="infotext1">
                비밀번호가 변경되었습니다.
                <br />
                바뀐 비밀번호로 로그인해주세요!
              </div>
            </div>
            <div class="col-1"></div>
          </div>
          <br />
          <button class="btn-custom">
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
