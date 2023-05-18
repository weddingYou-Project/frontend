import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/WritePost.css";

const categoryOptions = {
  weddinghall: ["일반", "호텔", "채플", "스몰", "야외", "전통혼례"],
  weddingoutfit: ["드레스", "남성예복", "한복"],
  studio: ["인물중심", "배경중심", "균형적인"],
  makeup: ["헤어", "메이크업"],
  honeymoon: ["해외", "국내"],
  bouquet: ["라운드", "드롭", "케스케이드", "핸드타이드"],
};

const WritePost = () => {
  const { category1 } = useParams();
  const [itemName, setItemName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category2, setCategory2] = useState(categoryOptions[category1][0]);

  useEffect(() => {
    setCategory2(categoryOptions[category1][0]);
  }, [category1]);

  const postItem = () => {
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("content", content);
    formData.append("category1", category1);
    formData.append("category2", category2);
    formData.append("image", image);

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
  };
  return (
    <div className="mainlayout">
      <NavigationBar title="글 작성" />
      <div className="category-container">
        <div className="category-buttons">
          {categoryOptions[category1].map((option, index) => (
            <button
              key={index}
              className={`category-button ${
                category2 === option ? "active" : ""
              }`}
              onClick={() => setCategory2(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="input-wrap">
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
      </div>
      <div className="button-wrap">
        <button
          className="submit-button"
          onClick={() => {
            postItem();
          }}
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
