import "../Css/main.css";
import "../Css/Login.css";
import imgLogo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function TemporaryPasswordLogin() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"임시 로그인"} />
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
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <p className="loginmessage">아이디(이메일)로 로그인하기</p>
            <div className="mb-3">
              <input
                type="text"
                className="inputarea"
                placeholder="아이디(이메일)"
              />
              <input
                type="password"
                className="inputarea"
                placeholder="임시 비밀번호"
              />
            </div>
          </div>
          <div className="col"></div>
        </div>
        <br />
        <button type="submit" className="btn-custom1">
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
      <Footer />
    </div>
  );
}

export default TemporaryPasswordLogin;
