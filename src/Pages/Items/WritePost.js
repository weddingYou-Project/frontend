import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/WritePost.css";

const WritePost = () => {
  const [itemName, setItemName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("일반");
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("category", "웨딩홀");
      formData.append("category2", category);
      formData.append("itemName", itemName);
      formData.append("content", content);
      await axios.post("/item/insertItem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("게시물이 성공적으로 작성되었습니다!");
      setItemName("");
      setContent("");
      setImage(null);
      setCategory("일반");
    } catch (error) {
      console.error("Error creating post: ", error);
    }
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
          <button
            className={`category-button ${category === "일반" ? "active" : ""}`}
            onClick={() => setCategory("일반")}
          >
            일반
          </button>
          <button
            className={`category-button ${category === "호텔" ? "active" : ""}`}
            onClick={() => setCategory("호텔")}
          >
            호텔
          </button>
          <button
            className={`category-button ${category === "채플" ? "active" : ""}`}
            onClick={() => setCategory("채플")}
          >
            채플
          </button>
          <button
            className={`category-button ${category === "스몰" ? "active" : ""}`}
            onClick={() => setCategory("스몰")}
          >
            스몰
          </button>
          <button
            className={`category-button ${category === "야외" ? "active" : ""}`}
            onClick={() => setCategory("야외")}
          >
            야외
          </button>
          <button
            className={`category-button ${
              category === "전통혼례" ? "active" : ""
            }`}
            onClick={() => setCategory("전통혼례")}
          >
            전통혼례
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control inputarea"
            placeholder="제목"
            value={itemName}
            style={{ margin: "10px 10px", width: "80%" }}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <textarea
            type="text"
            className="form-control textarea"
            rows={10}
            placeholder="내용"
            value={content}
            style={{ margin: "10px 10px", width: "80%" }}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label>사진첨부 </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {/* {previewImage && (
            <img
              src={previewImage}
              alt="미리보기"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )} */}
        </div>
        <button className="submit-button" type="submit">
          작성
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default WritePost;
