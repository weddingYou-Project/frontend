import "../Css/main.css";
import "../Css/mypage.css";
import "../Css/userupdate.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

function UserUpdate() {
  const { category } = useParams();
  let userOrPlanner = "";
  if (category === "user") {
    userOrPlanner = "회원";
  } else if (category === "planner") {
    userOrPlanner = "플래너";
  }
  const title = `${userOrPlanner}정보 수정`;
  const [name, setName] = useState("귀엽조(수정불가)");
  const [password, setPassword] = useState("Ab1234**");
  const [email, setEmail] = useState("abc@naver.com");
  const [phone, setPhone] = useState("010-1234-5678");
  const [gender, setGender] = useState("");

  const nameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const genderInput = useRef();

  const nameFeedback = useRef();
  const passwordFeedback = useRef();
  const emailFeedback = useRef();
  const phoneFeedback = useRef();

  const [nameMessage, setNameMessage] = useState("looks good!");
  const [passwordMessage, setPasswordMessage] = useState("looks good!");
  const [emailMessage, setEmailMessage] = useState("looks good!");
  const [phoneMessage, setPhoneMessage] = useState("looks good!");
  const [genderMessage, setGenderMessage] = useState("looks good!");

  const onChange = (e) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
      const passwordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/;
      if (passwordRegExp.test(e.target.value)) {
        setPasswordMessage("올바른 비밀번호 형식입니다");
        passwordInput.current.classList.remove("is-invalid");
        passwordInput.current.classList.add("is-valid");
        passwordFeedback.current.classList.remove("invisible");
        passwordFeedback.current.classList.remove("invalid-feedback");
        passwordFeedback.current.classList.add("valid-feedback");
      } else {
        if (e.target.value === "") {
          setPasswordMessage("비밀번호를 작성해주세요.");
        } else {
          setPasswordMessage(
            "최소8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함"
          );
        }
        passwordFeedback.current.classList.remove("invisible");
        passwordFeedback.current.classList.remove("valid-feedback");
        passwordFeedback.current.classList.add("invalid-feedback");
        passwordInput.current.classList.remove("is-valid");
        passwordInput.current.classList.add("is-invalid");
      }
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
      const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegExp.test(e.target.value)) {
        setEmailMessage("올바른 이메일 형식입니다.");
        emailInput.current.classList.remove("is-invalid");
        emailInput.current.classList.add("is-valid");
        emailFeedback.current.classList.remove("invisible");
        emailFeedback.current.classList.remove("invalid-feedback");
        emailFeedback.current.classList.add("valid-feedback");
      } else {
        if (e.target.value === "") {
          setEmailMessage("이메일을 작성해주세요.");
        } else {
          setEmailMessage("올바른 이메일 형식으로 작성해주세요.");
        }

        emailFeedback.current.classList.remove("invisible");
        emailFeedback.current.classList.remove("valid-feedback");
        emailFeedback.current.classList.add("invalid-feedback");
        emailInput.current.classList.remove("is-valid");
        emailInput.current.classList.add("is-invalid");
      }
    } else if (e.target.id === "phone") {
      setPhone(
        e.target.value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})(\d{0,1})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, "")
          .slice(0, 13)
      );
      const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      if (phoneRegExp.test(e.target.value.slice(0, 13))) {
        setPhoneMessage("올바른 핸드폰 번호입니다.");
        phoneInput.current.classList.remove("is-invalid");
        phoneInput.current.classList.add("is-valid");
        phoneFeedback.current.classList.remove("invisible");
        phoneFeedback.current.classList.remove("invalid-feedback");
        phoneFeedback.current.classList.add("valid-feedback");
      } else {
        if (e.target.value === "") {
          setPhoneMessage("핸드폰 번호를 입력해주세요");
        } else {
          setPhoneMessage("올바른 핸드폰 번호가 아닙니다.");
        }
        phoneFeedback.current.classList.remove("invisible");
        phoneFeedback.current.classList.remove("valid-feedback");
        phoneFeedback.current.classList.add("invalid-feedback");
        phoneInput.current.classList.remove("is-valid");
        phoneInput.current.classList.add("is-invalid");
      }
    } else if (e.target.id === "gender") {
      setGender(e.target.value);
      const genderFeedback = document.querySelector(".gender-feedback");
      // if (emailRegExp.test(e.target.value)) {
      //   emailInput.current.classList.remove("is-invalid");
      //   emailInput.current.classList.add("is-valid");
      //   emailFeedback.classList.remove("invisible");
      //   emailFeedback.classList.remove("invalid-feedback");
      //   emailFeedback.classList.add("valid-feedback");
      // } else {
      //   setNameMessage("이름을 입력하세요");
      //   emailFeedback.classList.remove("valid-feedback");
      //   emailFeedback.classList.add("invalid-feedback");
      //   emailInput.current.classList.remove("is-valid");
      //   emailInput.current.classList.add("is-invalid");
      // }
    }
  };

  return (
    <div class="mainlayout">
      <NavigationBar title={title} />
      <div class="content userupdatecontainer text-center">
        <form class="col">
          <img src="" alt="" />
          <div class="row justify-content-md-center mb-2">
            <label for="name" class="form-label col col-md-2 mt-2">
              이름
            </label>
            <div class="col col-md-7">
              <input
                type="text"
                class="form-control "
                id="name"
                ref={nameInput}
                value={name}
                autoComplete="off"
                disabled
              />
              <div
                class="invisible text-start name-feedback"
                ref={nameFeedback}
              >
                {nameMessage}
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="password" class="form-label col col-md-2 mt-2">
              비밀번호
            </label>
            <div class="has-validation col col-md-7">
              <input
                type="text"
                class="form-control "
                id="password"
                ref={passwordInput}
                value={password}
                placeholder={password}
                onChange={onChange}
                autoComplete="off"
              />
              <div
                class="invisible text-start password-feedback"
                ref={passwordFeedback}
              >
                {passwordMessage}
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="email" class="form-label col col-md-2 mt-2">
              이메일
            </label>
            <div class="has-validation col col-md-7">
              <input
                type="text"
                class="form-control "
                id="email"
                ref={emailInput}
                value={email}
                placeholder={email}
                onChange={onChange}
                autoComplete="off"
              />
              <div
                class="invisible text-start email-feedback"
                ref={emailFeedback}
              >
                {emailMessage}
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="phone" class="form-label col col-md-2 mt-2">
              휴대폰
            </label>
            <div class="has-validation col col-md-7">
              <input
                type="text"
                class="form-control "
                id="phone"
                ref={phoneInput}
                value={phone}
                onChange={onChange}
                placeholder={phone}
                autoComplete="off"
              />
              <div
                class="invisible text-start phone-feedback"
                ref={phoneFeedback}
              >
                {phoneMessage}
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
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
                  aria-label="Radio button for following text input"
                />
              </div>
              <input
                type="text"
                class="form-control"
                id="male"
                aria-label="male btn"
                value="남자"
              />
              <div class="input-group-text">
                <input
                  class="form-check-input mt-0"
                  type="radio"
                  value=""
                  name="gender"
                  htmlFor="female"
                  aria-label="Radio button for following text input"
                />
              </div>
              <input
                type="text"
                class="form-control"
                id="female"
                aria-label="female btn"
                value="여자"
              />
            </div>
            {userOrPlanner === "플래너" ? null : <div></div>}
          </div>

          <div class="col-12">
            <button class="btn btn-primary infochange" type="submit">
              회원정보 수정하기
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserUpdate;
