import React from "react";
import "../Css/main.css";
import "../Css/PasswordSearch.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function PasswordSearch() {
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
      <NavigationBar title={"비밀번호 찾기"} />
      <br />
      <div className="container text-center">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="infotext">
              <i className="bi bi-dash-lg"></i>&nbsp;&nbsp;
              <span>임시 비밀번호 받기</span>&nbsp;&nbsp;
              <i className="bi bi-dash-lg"></i>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="infotext2">
                등록되어 있는 이메일을 입력하시고
                <br />
                임시 비밀번호 전송 버튼을 눌러주세요.
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="infotext3">
              <input type="text" className="inputarea" placeholder="이메일" />
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="infotext3">
              <button type="submit" className="btn-custom1" onClick={openModal}>
                임시 비밀번호 전송
              </button>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
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
              <div className="infotext3">
                <i clclassNameass="bi bi-dash-lg"></i>&nbsp;&nbsp;
                <span>임시 비밀번호 전송 완료</span>&nbsp;&nbsp;
                <i className="bi bi-dash-lg"></i>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="infotext1">
                임시 비밀번호가 이메일로 전송되었습니다.
                <br />
                확인 후 로그인과 비밀번호 변경을 해주세요!
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <br />
          <button className="btn-custom1">
            <Link
              to="/passwordSearch/temporaryPasswordLogin"
              className="SLogin"
            >
              임시 로그인 하기
            </Link>
          </button>
        </div>
      </Modal>
      <Footer />
    </div>
  );
}

export default PasswordSearch;
