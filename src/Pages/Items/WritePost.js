import React, { useState } from "react";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";

const WritePost = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // 글쓰기 기능
    onClose();
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="mainlayout">
      <NavigationBar title="글 작성" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control inputarea"
            placeholder="제목"
            value={title}
            style={{ margin: "10px 10px", width: "80%" }}
            onChange={(e) => setTitle(e.target.value)}
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
        </div>
        <button type="submit">작성</button>
      </form>
      <Footer />
    </div>
  );
};

export default WritePost;
