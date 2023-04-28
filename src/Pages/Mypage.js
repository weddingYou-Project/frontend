import "../Css/main.css";
import "../Css/mypage.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import React, { useState, useRef } from "react";

function Mypage() {
  const title = "마이페이지";

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
                value=""
                required
              />
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
                value=""
                required
              />
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
                value=""
                required
              />
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
                value=""
                required
              />
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
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <button class="btn-bd-primary infochange" type="submit">
              정보수정하기
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Mypage;
