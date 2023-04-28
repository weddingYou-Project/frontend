import "../Css/main.css";
import "../Css/mypage.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import React, { useState, useRef } from "react";

function UserUpdate() {
  const title = "마이페이지";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const nameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const genderInput = useRef();

  const [nameMessage, setNameMessage] = useState("looks good!");
  const [passwordMessage, setPasswordMessage] = useState("looks good!");
  const [emailMessage, setEmailMessage] = useState("looks good!");
  const [phoneMessage, setPhoneMessage] = useState("looks good!");
  const [genderMessage, setGenderMessage] = useState("");

  const onChange = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
      const nameFeedback = document.querySelector(".name-feedback");
      if (nameInput.current.value !== "") {
        setNameMessage("looks good!");
        nameInput.current.classList.remove("is-invalid");
        nameInput.current.classList.add("is-valid");
        nameFeedback.classList.remove("invisible");
        nameFeedback.classList.remove("invalid-feedback");
        nameFeedback.classList.add("valid-feedback");
      } else {
        setNameMessage("이름을 입력하세요");
        nameFeedback.classList.remove("valid-feedback");
        nameFeedback.classList.add("invalid-feedback");
        nameInput.current.classList.remove("is-valid");
        nameInput.current.classList.add("is-invalid");
      }
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
      const passwordFeedback = document.querySelector(".password-feedback");
      const passwordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/;
      if (passwordRegExp.test(e.target.value)) {
        passwordInput.current.classList.remove("is-invalid");
        passwordInput.current.classList.add("is-valid");
        passwordFeedback.classList.remove("invisible");
        passwordFeedback.classList.remove("invalid-feedback");
        passwordFeedback.classList.add("valid-feedback");
      } else {
        setNameMessage("이름을 입력하세요");
        passwordFeedback.classList.remove("valid-feedback");
        passwordFeedback.classList.add("invalid-feedback");
        passwordInput.current.classList.remove("is-valid");
        passwordInput.current.classList.add("is-invalid");
      }
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
      const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const emailFeedback = document.querySelector(".email-feedback");
      if (emailRegExp.test(e.target.value)) {
        emailInput.current.classList.remove("is-invalid");
        emailInput.current.classList.add("is-valid");
        emailFeedback.classList.remove("invisible");
        emailFeedback.classList.remove("invalid-feedback");
        emailFeedback.classList.add("valid-feedback");
      } else {
        setNameMessage("이름을 입력하세요");
        emailFeedback.classList.remove("valid-feedback");
        emailFeedback.classList.add("invalid-feedback");
        emailInput.current.classList.remove("is-valid");
        emailInput.current.classList.add("is-invalid");
      }
    } else if (e.target.id === "phone") {
      setPhone(e.target.value);
      const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      const phoneFeedback = document.querySelector(".phone-feedback");
      if (phoneRegExp.test(e.target.value)) {
        phoneInput.current.classList.remove("is-invalid");
        phoneInput.current.classList.add("is-valid");
        phoneFeedback.classList.remove("invisible");
        phoneFeedback.classList.remove("invalid-feedback");
        phoneFeedback.classList.add("valid-feedback");
      } else {
        setNameMessage("이름을 입력하세요");
        phoneFeedback.classList.remove("valid-feedback");
        phoneFeedback.classList.add("invalid-feedback");
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
      <div class="content container text-center">
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
                onChange={onChange}
                required
              />
              <div class="invisible text-start name-feedback">
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
                onChange={onChange}
                required
              />
              <div class="invisible text-start password-feedback">
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
                onChange={onChange}
                required
              />
              <div class="invisible text-start email-feedback">
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
                required
              />
              <div class="invisible text-start phone-feedback">
                {phoneMessage}
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="password" class="form-label col col-md-2 mt-2">
              성별
            </label>
            <div class="has-validation col col-md-7">
              <div class="form-check row justify-content-md-start  mb-3">
                <div class="form-check-inline col col-md-2 p-2">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="male"
                    name="gender"
                    required
                  />
                  <label class="form-check-label" for="male">
                    남
                  </label>
                </div>
                <div class="form-check-inline col col-md-2 p-2">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="female"
                    name="gender"
                    required
                  />
                  <label class="form-check-label" for="female">
                    여
                  </label>
                  <div class="invalid-feedback">{genderMessage}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="form-check">
              <input
                class="form-check-input is-invalid"
                type="checkbox"
                value=""
                id="invalidCheck3"
                aria-describedby="invalidCheck3Feedback"
                required
              />
              <label class="form-check-label" for="invalidCheck3">
                Agree to terms and conditions
              </label>
              <div id="invalidCheck3Feedback" class="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary infochange" type="submit">
              정보수정하기
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserUpdate;
