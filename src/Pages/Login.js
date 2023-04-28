import "../Css/main.css";
import "../Css/Login.css";
import imgLogo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function Login() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"로그인"} />
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
              {/* <p className="loginmessage">아이디(이메일)로 로그인하기</p> */}
              <div class="mb-3">
                <input
                  type="text"
                  class="inputarea"
                  placeholder="아이디(이메일)"
                  required=""
                />
                <input
                  type="password"
                  class="inputarea"
                  placeholder="비밀번호"
                  required=""
                />
              </div>
              <Link to="/passwordSearch" className="searchmessage">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div class="col"></div>
          </div>
          <br />
          <button type="submit" class="btn-custom1">
            로그인
          </button>
        </form>
        <br />
        <br />
        <p>
          처음 오셨나요? &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/signup" className="signupmessage">
            회원가입
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
