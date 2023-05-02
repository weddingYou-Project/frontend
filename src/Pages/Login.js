import "../Css/main.css";
import "../Css/Login.css";
import "../Css/mypage.css";
import imgLogo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [Role, setRole] = useState("회원");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const onClickLogin = () => {
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);

    if (Role === "회원") {
      axios
        .post("http://localhost:8080/user/login", {
          email: inputId,
          password: inputPw,
        })
        .then((res) => {
          console.log(res);
          console.log("res.data.email :: ", res.data.email);
          console.log("res.data.msg :: ", res.data.msg);
          if (res.data.email === undefined) {
            // id 일치하지 않는 경우 user_Id = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
            console.log("======================", res.data.msg);
            alert("입력하신 id 가 일치하지 않습니다.");
            // document.location.href = "/login";
          } else if (res.data.email === null) {
            // id는 있지만, pw 는 다른 경우 user_Id = null , msg = undefined
            console.log(
              "======================",
              "입력하신 비밀번호 가 일치하지 않습니다."
            );
            alert("입력하신 비밀번호 가 일치하지 않습니다.");
          } else if (res.data.email === inputId) {
            // id, pw 모두 일치 userId = userId1, msg = undefined
            console.log("======================", "로그인 성공");
            sessionStorage.setItem("user_name", res.data.name); // sessionStorage에 name을 user_name이라는 key 값으로 저장
          }
          // 작업 완료 되면 페이지 이동(새로고침)
        })
        .catch();
    } else if (Role === "플래너") {
      axios
        .post("http://localhost:8080/planner/login", {
          email: inputId,
          password: inputPw,
        })
        .then((res) => {
          console.log(res);
          console.log("res.data.user_Id :: ", res.data.user_Id);
          console.log("res.data.msg :: ", res.data.msg);
          if (res.data.email === undefined) {
            // id 일치하지 않는 경우 user_Id = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
            console.log("======================", res.data.msg);
            alert("입력하신 id 가 일치하지 않습니다.");
          } else if (res.data.email === null) {
            // id는 있지만, pw 는 다른 경우 user_Id = null , msg = undefined
            console.log(
              "======================",
              "입력하신 비밀번호 가 일치하지 않습니다."
            );
            alert("입력하신 비밀번호 가 일치하지 않습니다.");
          } else if (res.data.email === inputId) {
            // id, pw 모두 일치 userId = userId1, msg = undefined
            console.log("======================", "로그인 성공");
            sessionStorage.setItem("planner_name", res.data.name); // sessionStorage에 name을 planner_name이라는 key 값으로 저장
          }
          // 작업 완료 되면 페이지 이동(새로고침)
          document.location.href = "/";
        })
        .catch();
    }
  };

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
                  className="form-control inputarea"
                  placeholder="아이디(이메일)"
                  required=""
                  value={inputId}
                  onChange={handleInputId}
                />
                <input
                  type="password"
                  className="form-control inputarea"
                  placeholder="비밀번호"
                  required=""
                  value={inputPw}
                  onChange={handleInputPw}
                />
                <div class="input-group" id="Role" style={{ width: 256 }}>
                  <div class="input-group-text">
                    <input
                      class="form-check-input mt-0"
                      type="radio"
                      value="회원"
                      name="Role"
                      htmlFor="회원"
                      checked={Role === "회원"}
                      onChange={handleRole}
                      aria-label="Radio button for following text input"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="custom"
                    aria-label="custom btn"
                    value="회원"
                    disabled
                    style={{ background: "white" }}
                  />
                  <div class="input-group-text">
                    <input
                      class="form-check-input mt-0"
                      type="radio"
                      value="플래너"
                      name="Role"
                      checked={Role === "플래너"}
                      htmlFor="플래너"
                      onChange={handleRole}
                      aria-label="Radio button for following text input"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="planner"
                    aria-label="palnner btn"
                    value="플래너"
                    disabled
                    style={{ background: "white" }}
                  />
                </div>
              </div>
              <Link to="/passwordSearch" className="searchmessage">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="col"></div>
          </div>
          <br />
          <button
            type="submit"
            className="btn-colour-1 "
            onClick={onClickLogin}
          >
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
