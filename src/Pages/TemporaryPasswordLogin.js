import "../Css/main.css";
import "../Css/Login.css";
import imgLogo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import "../Css/mypage.css";

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
            <div className="mb-3">
              <input
                type="text"
                className="inputarea"
                placeholder="아이디(이메일)"
                maxLength="100"
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
        <button type="submit" className="btn-colour-1">
          <Link
            to="/passwordSearch/temporaryPasswordLogin/passwordChange"
            style={{ color: "white", textDecorationLine: "none" }}
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
