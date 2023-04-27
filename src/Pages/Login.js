import "../Css/main.css";
import "../Css/Login.css";
import imgLogo from "../Assets/logo.png";
import BackButton from "../Components/Backbutton";

function Login() {
  return (
    <div className="mainlayout">
      <div class="container text-center">
        <div class="row">
          <div class="col-1">
            <BackButton />
          </div>
          <div class="col-10" align="center">
            <h3>로그인</h3>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <hr />
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
                class="form-control"
                placeholder="아이디(이메일)"
              />
              <input
                type="password"
                class="form-control"
                placeholder="비밀번호"
              />
            </div>
            <a className="searchmessage" href="#">
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div class="col"></div>
        </div>
        <br />
        <button type="submit" class="btn-custom">
          로그인
        </button>
        <br />
        <br />
        <p>
          처음 오셨나요? &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="#" className="signupmessage">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
