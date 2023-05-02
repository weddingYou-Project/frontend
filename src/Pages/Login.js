import "../Css/main.css";
import "../Css/Login.css";
import "../Css/mypage.css";
import imgLogo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function Login() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"로그인"} />
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
        <form>
          <div className="row">
            <div className="col"></div>
            <div className="col-6">
              {/* <p className="loginmessage">아이디(이메일)로 로그인하기</p> */}
              <div className="mb-3">
                <input
                  type="text"
                  className="inputarea"
                  placeholder="아이디(이메일)"
                  required=""
                />
                <input
                  type="password"
                  className="inputarea"
                  placeholder="비밀번호"
                  required=""
                />
              </div>
              <Link to="/passwordSearch" className="searchmessage">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="col"></div>
          </div>
          <br />
          <button type="submit" className="btn-colour-1 ">
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
