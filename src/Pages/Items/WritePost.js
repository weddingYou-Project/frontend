import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/WritePost.css";

const categoryOptions = {
  웨딩홀: ["일반", "호텔", "채플", "스몰", "야외", "전통혼례"],
  의상: ["드레스", "남성예복", "한복"],
  스튜디오: ["인물중심", "배경중심", "균형적인"],
  메이크업: ["헤어", "메이크업"],
  신혼여행: ["해외", "국내"],
  부케: ["라운드", "드롭", "케스케이드", "핸드타이드"],
};

const WritePost = () => {
  const { category1 } = useParams();
  const [itemName, setItemName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category2, setCategory2] = useState(categoryOptions[category1][0]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setCategory2(categoryOptions[category1][0]);
  }, [category1]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("category1", category1);
      formData.append("category2", category2);
      formData.append("itemName", itemName);
      formData.append("content", content);
      await axios.post("/item/insertItem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("게시물이 성공적으로 작성되었습니다!");
      setItemName("");
      setContent("");
      setImage(null);
      setCategory2(categoryOptions[category1][0]);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
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
    // setPreviewImage(URL.createObjectURL(selectedImage));
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
      <form className="post-inputwrap" onSubmit={handleSubmit}>
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
        <button className="submit-button" type="submit">
          게시하기
        </button>

        <button className="cancel-button" type="button" onClick={handleCancel}>
          취소
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default WritePost;
