import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState } from "react";

function QnAdetail() {
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState("답변 Smaple");

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    setEditedComment(e.target.value);
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={"Q&A"} />
      <div style={{ height: 64 }}></div>
      <div className="titleArea">
        <p className="titleTxt">Q&A TitleSample</p>
        <p className="dateTxt">2023.05.22</p>
        <p className="viewCountTxt">조회수 : 63</p>
      </div>
      <hr />
      <div className="ContentArea">
        <p className="noticeContxt">Q&A txt</p>
        <div className="BtnArea"></div>
        <button className="upAndDelBtn2">수정</button>
        <button className="upAndDelBtn2">삭제</button>
      </div>
      <hr />
      <p className="ComentTitle">답변</p>
      <div className="ComentArea">
        <div className="Coment">
          <p className="nickname">운영자</p>
          <p className="dateTxt">2023.05.22</p>
          <br />
          <div>
            {editMode ? (
              <div>
                <input
                  type="text"
                  placeholder={editedComment}
                  onChange={handleChange}
                  className="comentinput"
                  style={{ fontSize: 20 }}
                />
                <button onClick={handleSaveClick} className="writeBtn2">
                  완료
                </button>
              </div>
            ) : (
              <div>
                <p className="AnsTxt">{editedComment}</p>
                <button onClick={handleEditClick} className="upAndDelBtn3">
                  수정
                </button>
                <button className="upAndDelBtn3">삭제</button>
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          className="comentinput"
          style={{ fontSize: 20 }}
        ></input>
        <button className="writeBtn2">작성</button>
      </div>
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default QnAdetail;
