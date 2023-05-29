import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function Noticedetail() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"공지사항"} />
      <div style={{ height: 64 }}></div>
      <div className="titleArea">
        <p className="titleTxt">공지사항 TitleSample</p>
        <p className="dateTxt">2023.02.20</p>
        <p className="viewCountTxt">조회수 : 150</p>
        <button className="upAndDelBtn">수정</button>
        <button className="upAndDelBtn">삭제</button>
      </div>
      <hr />
      <div className="noticeContent">
        <p className="noticeContxt">공지사항 txt</p>
      </div>
      <hr />
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default Noticedetail;
