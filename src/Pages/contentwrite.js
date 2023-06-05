import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import selectImg from "../Assets/selectImg.webp";

function ContentWrite() {
  const { page } = useLocation().state;
  const [img, setImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(selectImg);
  const writeContent = () => {
    if (page === "notice") {
    } else if (page === "qna") {
    }
  };
  const onChangePic = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
    try {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } catch {
      setPreviewUrl(selectImg);
    }
  };
  return (
    <div className="mainlayout">
      <NavigationBar title={"글작성"} />
      <div style={{ height: 74 }}></div>
      <div className="titleArea">
        <input
          type="text"
          placeholder="제목"
          className="form-control titleinput"
          style={{ fontSize: 20 }}
        ></input>
      </div>
      <hr />
      <div className="writeContent">
        <textarea
          className="form-control contentinput"
          rows="15"
          placeholder="이용후기를 입력해주세요"
          style={{ fontSize: 20 }}
        ></textarea>
      </div>
      <hr />
      <div className="fileatt">
        <p className="uploadphoto" style={{ fontSize: "1.5em" }}>
          사진 첨부
        </p>
        <input
          type="file"
          multiple
          id="uploadimage"
          onChange={onChangePic}
          className="displaynone"
        />
        <label
          htmlFor="uploadimage"
          className="cursor imageBtn"
          style={{ fontSize: "1.5em" }}
        >
          사진선택
        </label>
        <img
          src={previewUrl}
          alt=""
          style={{
            width: "200px",
            height: "200px",
            display: "block",
            borderRadius: "10px",
            marginTop: "30px",
            marginLeft: "20px",
          }}
        />
      </div>
      <br />
      <div className="writeBtnArea">
        <button className="writeBtn" onClick={writeContent}>
          작성하기
        </button>
      </div>
      <div style={{ height: 200 }}></div>
      <Footer />
    </div>
  );
}

export default ContentWrite;
