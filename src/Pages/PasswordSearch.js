import React from "react";
import "../Css/main.css";
import "../Css/PasswordSearch.css";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function PasswordSearch() {
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
              <button
                type="button"
                className="btn-custom1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                임시 비밀번호 전송
              </button>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="PasswordSearch"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div className="infotext4">
                <i className="bi bi-dash-lg"></i>&nbsp;&nbsp;
                <span>임시 비밀번호 전송 완료</span>&nbsp;&nbsp;
                <i className="bi bi-dash-lg"></i>
              </div>
            </div>
            <div class="modal-body infotext4">
              <div className="infotext4">
                임시 비밀번호가 이메일로 전송되었습니다.
                <br />
                확인 후 로그인과 비밀번호 변경을 해주세요!
              </div>
            </div>
            <div class="modal-footer infotext4">
              <button type="button" class="btn-custom1" data-bs-dismiss="modal">
                <Link
                  to="/passwordSearch/temporaryPasswordLogin"
                  className="SLogin"
                >
                  임시 로그인 하기
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PasswordSearch;
