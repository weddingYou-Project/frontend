import "../Css/main.css";
import "../Css/mypage.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom";

function Mypage() {
  const title = "마이페이지";
  const navigate = useNavigate();

  const [name, setName] = useState("귀엽조");
  const [password, setPassword] = useState("Ab1234**");
  const [email, setEmail] = useState("abc@naver.com");
  const [phone, setPhone] = useState("010-1234-5678");
  const [gender, setGender] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("looks good!");
  const [passwordCheck, setPasswordCheck] = useState("");
  const passwordInput = useRef();
  const passwordcheckmodal = useRef();
  const passwordFeedback = useRef();
  const passwordConfirm = useRef();
  const [passwordcheckmessage, setPasswordCheckMessage] = useState("");

  const { category } = useParams();

  const onChange = (e) => {
    if (e.target.id === "passwordcheck") {
      console.log(e.target.value);
      const passwordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/;
      if (passwordRegExp.test(e.target.value)) {
        setPasswordMessage("looks good!");
        passwordInput.current.classList.remove("is-invalid");
        passwordInput.current.classList.add("is-valid");
        passwordFeedback.current.classList.remove("invisible");
        passwordFeedback.current.classList.remove("invalid-feedback");
        passwordFeedback.current.classList.add("valid-feedback");
        passwordConfirm.current.disabled = false;
      } else {
        if (e.target.value === "") {
          setPasswordMessage("비밀번호를 입력해주세요.");
        } else {
          setPasswordMessage(
            "최소8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함"
          );
        }

        passwordInput.current.classList.add("is-invalid");
        passwordFeedback.current.classList.add("invalid-feedback");
        passwordFeedback.current.classList.remove("invisible");
        passwordFeedback.current.classList.remove("valid-feedback");
        passwordInput.current.classList.remove("is-valid");
        passwordConfirm.current.disabled = true;
      }
      setPasswordCheck(e.target.value);
    }
  };

  const deletePassword = () => {
    setPasswordCheck("");
    passwordFeedback.current.classList.remove("invalid-feedback");
    passwordFeedback.current.classList.remove("valid-feedback");
    passwordInput.current.classList.remove("is-invalid");
    passwordInput.current.classList.remove("is-valid");
    passwordFeedback.current.classList.add("invisible");
  };

  useEffect(() => {
    if (passwordCheck === password) {
      setPasswordCheckMessage("비밀번호 확인 완료!");
    } else {
      setPasswordCheckMessage("비밀번호가 틀립니다. 다시 입력하세요.");
    }
  }, [passwordCheck, password]);

  const gotoUpdatePage = () => {
    if (passwordcheckmessage === "비밀번호 확인 완료!") {
      navigate(`/mypage/${category}/userupdate`);
    }
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={title} />
      <div className="content mypagecontainer text-center">
        <form className="col">
          <img src="" alt="" />
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="name" className="form-label col col-md-2 mt-2">
              이름
            </label>
            <div className="col col-md-7 mb-4">
              <input
                type="text"
                className="form-control "
                id="name"
                value={name}
                autocomplete="off"
                disabled
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="password" className="form-label col col-md-2 mt-2">
              비밀번호
            </label>
            <div className="has-validation col col-md-7 mb-4">
              <input
                type="text"
                className="form-control "
                id="password"
                value={password}
                autocomplete="off"
                disabled
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="email" className="form-label col col-md-2 mt-2">
              이메일
            </label>
            <div className="has-validation col col-md-7 mb-4">
              <input
                type="text"
                className="form-control "
                id="email"
                value={email}
                autocomplete="off"
                disabled
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="phone" className="form-label col col-md-2 mt-2">
              휴대폰
            </label>
            <div className="has-validation col col-md-7 mb-4">
              <input
                type="text"
                className="form-control "
                id="phone"
                value={phone}
                autocomplete="off"
                disabled
              />
            </div>
          </div>
          <div className="row justify-content-md-center mb-2">
            <label htmlFor="gender" className="form-label col col-md-2 mt-2">
              성별
            </label>
            <div class="input-group">
              <div class="input-group-text">
                <input
                  class="form-check-input mt-0"
                  type="radio"
                  value=""
                  name="gender"
                  htmlFor="male"
                  checked
                  disabled
                  aria-label="Radio button for following text input"
                />
              </div>
              <input
                type="text"
                class="form-control"
                id="male"
                aria-label="male btn"
                value="남자"
                disabled
              />
              <div class="input-group-text">
                <input
                  class="form-check-input mt-0"
                  type="radio"
                  value=""
                  name="gender"
                  htmlFor="female"
                  disabled
                  aria-label="Radio button for following text input"
                />
              </div>
              <input
                type="text"
                class="form-control"
                id="female"
                aria-label="female btn"
                value="여자"
                disabled
              />
            </div>
          </div>
          <button
            type="button"
            class="update btn-colour-1"
            data-bs-toggle="modal"
            data-bs-target="#passwordcheckmodal"
            onClick={deletePassword}
          >
            정보 수정하기
          </button>

          <div>
            <button
              className="logout btn-colour-1"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그아웃
            </button>
            <button
              type="button"
              className="deleteMember btn-colour-1"
              data-bs-toggle="modal"
              data-bs-target="#deleteMemberModal"
            >
              회원탈퇴
            </button>
          </div>
        </form>
      </div>
      <Footer />
      {/* 비밀번호 확인 modal 창 */}
      <div
        class="modal fade"
        id="passwordcheckmodal"
        tabindex="-1"
        aria-labelledby="passwordcheckmodal"
        aria-hidden="true"
        ref={passwordcheckmodal}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title justify-content-center fs-5"
                id="passwordcheckmodal"
              >
                - 비밀번호 확인 -
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={deletePassword}
              ></button>
            </div>
            <div class="modal-body">
              <div class="has-validation col col-md-10">
                <input
                  type="password"
                  class="form-control "
                  id="passwordcheck"
                  ref={passwordInput}
                  value={passwordCheck}
                  onChange={onChange}
                  required
                  autocomplete="off"
                />
                <div
                  class="invisible text-start password-feedback"
                  ref={passwordFeedback}
                >
                  {passwordMessage}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deletePassword}
              >
                닫기
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#passwordcheckMessageModal"
                ref={passwordConfirm}
                disabled
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 비밀번호 확인 모달 */}
      {/* 비밀번호 확인 메시지 창 */}
      <div
        class="modal fade"
        id="passwordcheckMessageModal"
        tabindex="-1"
        aria-labelledby="passwordcheckMessageModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title justify-content-center fs-5"
                id="passwordcheckMessageModal"
              >
                - 비밀번호 확인 -
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={deletePassword}
              ></button>
            </div>
            <div class="modal-body">{passwordcheckmessage}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deletePassword}
              >
                닫기
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={gotoUpdatePage}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 비밀번호 확인 메시지 모달 */}
      {/* 회원 탈퇴 메시지 창 */}
      <div
        class="modal fade"
        id="deleteMemberModal"
        tabindex="-1"
        aria-labelledby="deleteMemberModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title justify-content-center fs-5"
                id="deleteMemberModal"
              >
                - 회원 탈퇴 -
              </h1>
            </div>
            <div class="modal-body">
              그동안 감사했습니다😢 이렇게 가신다니 아쉬워요 (T_T)
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  navigate("/");
                }}
              >
                메인페이지로
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 비밀번호 확인 모달 */}
    </div>
  );
}

export default Mypage;
