import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/WritePost.css";
import selectImg from "../../Assets/selectImg.webp";
const categoryOptions = {
  weddinghall: ["일반", "호텔", "채플", "스몰", "야외", "전통혼례"],
  weddingoutfit: [
    "머메이드",
    "A라인",
    "H라인",
    "벨라인",
    "엠파이어",
    "프린세스",
    "남성예복",
    "한복",
  ],
  studio: ["인물중심", "배경중심", "균형적인"],
  makeup: ["헤어", "로맨틱한", "포인트", "내추럴", "스모키", "큐티", "러블리"],
  honeymoon: ["해외", "국내"],
  bouquet: ["라운드", "드롭", "케스케이드", "핸드타이드"],
};
const selectedCategory = {
  weddinghall: "웨딩홀",
  weddingoutfit: "의상",
  studio: "스튜디오",
  makeup: "메이크업",
  honeymooon: "신혼여행",
  bouquet: "부케",
};

const WritePost = () => {
  const { category1 } = useParams();
  const [itemName, setItemName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(selectImg);
  const [category2, setCategory2] = useState(categoryOptions[category1][0]);
  const [selectedCategory1, setSelectedCategory1] = useState(
    selectedCategory[category1]
  );

  const postItem = () => {
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("content", content);
    formData.append("category1", selectedCategory1);
    formData.append("category2", category2);
    formData.append("file", image);

    axios
      .post("/item/insertItem", formData)
      .then((response) => {
        console.log("성공:", response.data);
        setItemName("");
        setContent("");
        setImage(null);
        setCategory2(categoryOptions[category1][0]);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  };

  const handleCancel = () => {
    setItemName("");
    setContent("");
    setImage(null);
    setCategory2(categoryOptions[category1][0]);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    try {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImage(fileReader.result);
      };
      fileReader.readAsDataURL(selectedImage);
    } catch (e) {
      setImage(selectImg);
    }
  };
  return (
    <div className="mainlayout">
      <NavigationBar title="글 작성" />
      <div className="category-container" style={{ marginTop: "100px" }}>
        <div className="category-buttons">
          {categoryOptions[category1].map((option, index) => (
            <button
              key={index}
              className={`category-button ${
                category2 === option ? "active" : ""
              }`}
              onClick={() => {
                setCategory2(option);
              }}
              style={{ marginBottom: "5px" }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="post-inputwrap">
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
        />
        <textarea
          className="content-textarea"
          placeholder="내용"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <input type="file" onChange={handleImageChange} />
        <img
          src={image}
          alt=""
          style={{
            width: "200px",
            height: "200px",
            marginTop: "20px",
            marginBottom: "-20px",
          }}
        />
      </div>
      <div
        className="button-wrap"
        style={{
          justifyContent: "center",
          marginRight: "20px",
          marginTop: "-20px",
        }}
      >
        <button
          className="submit-button"
          onClick={() => {
            postItem();
          }}
          style={{ fontSize: "1.3em" }}
        >
          게시하기
        </button>

        <button className="cancel-button" onClick={handleCancel}>
          취소
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default WritePost;
