import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { useState } from "react";

function Noticedetail() {
  const handleRefresh = () => {
    window.location.reload(); // 페이지 새로고침
  };

  const [actionmode, setActionmode] = useState(0);

  const noticeupdateform = () => {
    setActionmode(1);
  };

  const updatenotice = () => {
    setActionmode(0);
  };

  const checkadminsession = window.sessionStorage.getItem("email");

  const Buttons = ({ checkadmin }) => {
    if (checkadmin === "admin") {
      return (
        <div>
          <button className="upAndDelBtn" onClick={noticeupdateform}>
            수정
          </button>
          <button
            className="upAndDelBtn"
            data-bs-toggle="modal"
            data-bs-target="#noticeDelete"
          >
            삭제
          </button>
        </div>
      );
    } else {
      <div></div>;
    }
  };

  if (actionmode === 0) {
    return (
      <div className="mainlayout">
        <NavigationBar title={"공지사항"} />
        <div style={{ height: 64 }}></div>
        <div className="titleArea">
          <p className="titleTxt">공지사항 TitleSample</p>
          <div>
            <p className="dateTxt">2023.02.20</p>
            <p className="viewCountTxt">조회수 : 150</p>
            {sessionStorage.getItem("email") === "admin@email.com" ? (
              <div style={{ display: "inline-block" }}>
                <button className="upAndDelBtn" onClick={noticeupdateform}>
                  수정
                </button>
                <button
                  className="upAndDelBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#noticeDelete"
                >
                  삭제
                </button>
              </div>
            ) : null}
          </div>
          <Buttons checkadmin={checkadminsession} />
        </div>
        <hr />
        <div className="noticeContent">
          <p className="noticeContxt">공지사항 txt</p>
        </div>
        {/* <hr /> */}
        <div style={{ height: 90 }}></div>
        <div
          class="modal fade"
          id="noticeDelete"
          tabindex="-1"
          aria-labelledby="noticeDelete"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  공지사항 삭제
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" style={{ fontSize: 26 }}>
                정말로 삭제하시겠습니까?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleRefresh}
                >
                  삭제
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else if (actionmode === 1) {
    return (
      <div className="mainlayout">
        <NavigationBar title={"글수정"} />
        <div style={{ height: 74 }}></div>
        <div className="titleArea">
          <p className="titleTxt">공지사항 TitleSample</p>
        </div>
        <hr />
        <div className="writeContent">
          <textarea
            className="form-control contentinput"
            rows="15"
            placeholder="수정내용을 입력해주세요"
            style={{ fontSize: 20 }}
          ></textarea>
        </div>
        <hr />
        <div className="fileatt">
          <p className="uploadphoto">사진 첨부</p>
          <input
            type="file"
            multiple
            id="uploadimage"
            className="displaynone"
          />
          <label htmlFor="uploadimage" className="cursor imageBtn">
            사진선택
          </label>
        </div>
        <br />
        <div className="writeBtnArea">
          <button className="writeBtn" onClick={updatenotice}>
            수정하기
          </button>
        </div>
        <div style={{ height: 90 }}></div>
        <Footer />
      </div>
    );
  }
}

export default Noticedetail;
