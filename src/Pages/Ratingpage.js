import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import "../Css/main.css";
import "../Css/Ratingpage.css";
import imgLogo from "../Assets/logo.png";

const ARRAY = [0, 1, 2, 3, 4];

function Ratingpage() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    const Rating = index + 1;
    console.log(Rating);
    setRating(Rating);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };

  return (
    <div className="mainlayout">
      <p className="headtxt">서비스가 어떠셨나요?</p>
      <div className="plannerpro">
        <img src={imgLogo} className="plannerproimg" />
        <p className="plannerName">000 플래너</p>
      </div>
      <form>
        <div className="stars">
          <Stars>
            {ARRAY.map((el, idx) => {
              return (
                <FaStar
                  key={idx}
                  size="80"
                  onClick={() => handleStarClick(el)}
                  className={clicked[el] && "yellowStar"}
                />
              );
            })}
          </Stars>
          <input type="hidden" value={rating} />
        </div>
        <div className="reviewsection">
          <p className="reviewcont">이용후기</p>
          <textarea
            className="form-control"
            rows="7"
            placeholder="이용후기를 입력해주세요"
            style={{ fontSize: 20 }}
          ></textarea>
        </div>
        <div className="photouploadsection">
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
        <div className="insertBtn">
          <button className="reviewInsertBtn">작성하기</button>
        </div>
      </form>
    </div>
  );
}

export default Ratingpage;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
