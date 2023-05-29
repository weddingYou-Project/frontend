import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState } from "react";

function Reviewdetail() {
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState("댓글 Smaple");

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    setEditedComment(e.target.value);
  };

  const rating = 2;

  // 채워진 별 아이콘
  const filledStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#ffd000"
      class="bi bi-star-fill"
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );

  // 빈 별 아이콘
  const emptyStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-star"
      viewBox="0 0 16 16"
    >
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    </svg>
  );
  const Rating = () => {
    const stars = [];

    // 채워진 별 추가
    for (let i = 1; i <= rating; i++) {
      stars.push(filledStar);
    }

    // 빈 별 추가
    for (let i = 1; i <= 5 - rating; i++) {
      stars.push(emptyStar);
    }

    return stars;
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={"이용후기"} />
      <div style={{ height: 64 }}></div>
      <div className="titleArea">
        <p className="titleTxt">이용후기 TitleSample</p>
        <p className="dateTxt">2023.05.22</p>
        <p className="viewCountTxt">조회수 : 63</p>
        <div className="ratingStars">
          <Rating />
        </div>
      </div>
      <hr />
      <div className="ContentArea">
        <p className="noticeContxt">Q&A txt</p>
        <div className="BtnArea"></div>
        <button className="upAndDelBtn2">수정</button>
        <button className="upAndDelBtn2">삭제</button>
      </div>
      <hr />
      <p className="ComentTitle">댓글</p>
      <div className="ComentArea">
        <div className="Coment">
          <p className="nickname">사용자 1</p>
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

export default Reviewdetail;
