import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { Link } from "react-router-dom";

function Notice() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"공지사항"} />
      <div style={{ height: 74 }}></div>
      <div className="noticeSection">
        <tabel>
          <thead>
            <tr>
              <td style={{ width: 350 }}>
                <p className="noticeTxt">제목</p>
              </td>
              <td style={{ width: 120 }}>
                <p className="noticeTxtCenter">작성일</p>
              </td>
              <td style={{ width: 80 }}>
                <p className="noticeTxtCenter">조회수</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ height: 50 }}>
                <a
                  href="http://localhost:3000/notice/detail"
                  className="noticeTxt"
                >
                  공지사항 TitleSample
                </a>
              </td>
              <td>
                <p className="noticeTxtCenter">23.05.06</p>
              </td>
              <td>
                <p className="noticeTxtCenter">421</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">공지사항 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">23.05.06</p>
              </td>
              <td>
                <p className="noticeTxtCenter">253</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">공지사항 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">23.05.06</p>
              </td>
              <td>
                <p className="noticeTxtCenter">423</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">공지사항 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">23.05.06</p>
              </td>
              <td>
                <p className="noticeTxtCenter">152</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">공지사항 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">23.05.06</p>
              </td>
              <td>
                <p className="noticeTxtCenter">512</p>
              </td>
            </tr>
          </tbody>
        </tabel>
      </div>
      <Link to="/contentwrite">
        <button className="writeBtn">글쓰기</button>
      </Link>
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default Notice;
