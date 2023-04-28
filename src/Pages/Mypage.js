import "../Css/main.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

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
                class="form-control is-valid"
                id="name"
                value=""
                required
              />
              <div class="valid-feedback text-start">Looks good!</div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="password" class="form-label col col-md-2 mt-2">
              비밀번호
            </label>
            <div class="has-validation col col-md-7">
              <input
                type="text"
                class="form-control is-valid"
                id="password"
                value=""
                required
              />
              <div class="valid-feedback text-start">Looks good!</div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="email" class="form-label col col-md-2 mt-2">
              이메일
            </label>
            <div class="has-validation col col-md-7">
              <input
                type="text"
                class="form-control is-valid"
                id="email"
                value=""
                required
              />
              <div class="valid-feedback text-start">Looks good!</div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="phone" class="form-label col col-md-2 mt-2">
              휴대폰
            </label>
            <div class="has-validation col col-md-7">
              <input
                type="text"
                class="form-control is-valid"
                id="phone"
                value=""
                required
              />
              <div class="valid-feedback text-start">Looks good!</div>
            </div>
          </div>
          <div class="row justify-content-md-center mb-2">
            <label for="password" class="form-label col col-md-2 mt-2">
              성별
            </label>
            <div class="has-validation col col-md-7">
              <div class="form-check mb-3">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="woman"
                  required
                />
                <label class="form-check-label" for="woman">
                  여자
                </label>
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="man"
                  required
                />
                <label class="form-check-label" for="man">
                  남자
                </label>
                <div class="invalid-feedback">
                  Example invalid feedback text
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-md-center mb-2">
            <label for="email" class="form-label col col-md-2">
              이메일
            </label>
            <div class="input-group has-validation">
              <input
                type="text"
                class="form-control emailinput is-invalid"
                id="email"
                aria-describedby="inputGroupPrepend3 emailFeedback"
                required
              />
              <div id="emailFeedback" class="invalid-feedback">
                올바른 이메일 주소를 적어주세요
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
            <button class="btn btn-primary" type="submit">
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
