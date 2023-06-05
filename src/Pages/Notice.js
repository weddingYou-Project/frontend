import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Notice() {
  useEffect(() => {
    axios
      .get(`/notice/list`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const navigate = useNavigate();
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
                  style={{ fontSize: "1.5em" }}
                >
                  공지사항 TitleSample
                </a>
              </td>
              <td>
                <p className="noticeTxtCenter" style={{ fontSize: "1.5em" }}>
                  23.05.06
                </p>
              </td>
              <td>
                <p className="noticeTxtCenter" style={{ fontSize: "1.5em" }}>
                  421
                </p>
              </td>
            </tr>
          </tbody>
        </tabel>
      </div>
      {sessionStorage.getItem("email") === "admin@email.com" ? (
        <button
          className="writeBtn"
          onClick={() => {
            navigate(`/contentwrite`, { state: { page: "notice" } });
          }}
        >
          글쓰기
        </button>
      ) : null}

      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default Notice;
