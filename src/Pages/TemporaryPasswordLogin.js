import "../Css/main.css";
import "../Css/Login.css";
import imgLogo from "../Assets/logo.png";
import BackButton from "../Components/Backbutton";
import { Link } from "react-router-dom";

function TemporaryPasswordLogin() {
  return (
    <div className="mainlayout">
      <BackButton />
      <div className="title">임시 로그인</div>
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
        <div class="row">
          <div class="col"></div>
          <div class="col-6">
            <p className="loginmessage">아이디(이메일)로 로그인하기</p>
            <div class="mb-3">
              <input
                type="text"
                class="inputarea"
                placeholder="아이디(이메일)"
              />
              <input
                type="password"
                class="inputarea"
                placeholder="임시 비밀번호"
              />
            </div>
          </div>
          <div class="col"></div>
        </div>
        <br />
        <button type="submit" class="btn-custom">
          <Link
            to="/passwordSearch/temporaryPasswordLogin/passwordChange"
            className="SLogin"
          >
            로그인
          </Link>
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default TemporaryPasswordLogin;
