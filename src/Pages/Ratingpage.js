import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import "../Css/main.css";
import "../Css/Ratingpage.css";
import imgLogo from "../Assets/logo.png";
import selectImg from "../Assets/selectImg.webp";

const ARRAY = [0, 1, 2, 3, 4];

function Ratingpage() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const [rating, setRating] = useState(0);
  const [score, setScore] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(selectImg);

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
  }, [clicked]);

  const reviewtext = useRef();

  const sendReview = () => {
    setScore(clicked.filter(Boolean).length);
  };

  const insertReview = () => {};

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    try {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedImage);
    } catch (e) {
      setPreviewUrl(selectImg);
    }
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
            ref={reviewtext}
            className="form-control"
            rows="7"
            placeholder="이용후기를 입력해주세요"
            style={{ fontSize: 20 }}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="photouploadsection">
          <p className="uploadphoto" style={{ fontSize: "1.5em" }}>
            사진 첨부
          </p>
          <input
            type="file"
            multiple
            id="uploadimage"
            className="displaynone"
            onChange={handleImageChange}
          />
          <label
            htmlFor="uploadimage"
            style={{ fontSize: "1.5em" }}
            className="cursor imageBtn"
          >
            사진선택
          </label>
          <div>
            <img
              src={previewUrl}
              alt=""
              style={{
                width: "200px",
                height: "200px",
                marginTop: "20px",
                marginBottom: "-10px",
              }}
            />
          </div>
        </div>
        <div className="insertBtn" style={{ marginBottom: "50px" }}>
          <button className="reviewInsertBtn" onClick={insertReview}>
            작성하기
          </button>
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
