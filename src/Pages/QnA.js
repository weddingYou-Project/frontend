import "../Css/main.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function QnA() {
  useEffect(() => {
    axios
      .get(`/qna/list`)
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
      <NavigationBar title={"Q&A"} />
      <div style={{ height: 70 }}></div>
      <div className="input-group input-group-lg searchSection">
        <span class="input-group-text" id="search">
          <i class="bi bi-search"></i>
        </span>
        <input
          className="form-control"
          placeholder="검색어를 입력해주세요"
          type="text"
          aria-describedby="search"
        />
      </div>
      <div className="noticeSection2">
        <tabel>
          <thead>
            <tr>
              <td style={{ width: 350 }}>
                <p className="noticeTxt">제목</p>
              </td>
              <td style={{ width: 120 }}>
                <p className="noticeTxtCenter">댓글</p>
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
                  href="http://localhost:3000/qna/detail"
                  className="noticeTxt"
                  style={{ fontSize: "1.5em" }}
                >
                  Q&A TitleSample
                </a>
              </td>
              <td>
                <p className="noticeTxtCenter" style={{ fontSize: "1.5em" }}>
                  2
                </p>
              </td>
              <td>
                <p className="noticeTxtCenter" style={{ fontSize: "1.5em" }}>
                  14
                </p>
              </td>
            </tr>
          </tbody>
        </tabel>
      </div>

      <button
        className="writeBtn"
        onClick={() => {
          navigate(`/contentwrite`, { state: { page: "qna" } });
        }}
      >
        글쓰기
      </button>

      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default QnA;
