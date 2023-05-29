import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function ContentWrite() {
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
        <p className="uploadphoto">사진 첨부</p>
        <input type="file" multiple id="uploadimage" className="displaynone" />
        <label htmlFor="uploadimage" className="cursor imageBtn">
          사진선택
        </label>
      </div>
      <br />
      <div className="writeBtnArea">
        <button className="writeBtn">작성하기</button>
      </div>
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default ContentWrite;
