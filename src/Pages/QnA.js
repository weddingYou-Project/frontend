import "../Css/main.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function QnA() {
  const [qnaContent, setQnaContent] = useState([]);
  const [qnaTitle, setQnaTitle] = useState([]);
  const [qnaViewCount, setQnaViewCount] = useState([]);
  const [qnaId, setQnaId] = useState([]);
  const [index, setIndex] = useState([]);
  const [qnaComments, setQnaComments] = useState([]);
  useEffect(() => {
    axios
      .get(`/qna/list`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        const qnaContentArr = [];
        const qnaIdArr = [];
        const qnaTitleArr = [];
        const qnaViewCountArr = [];
        const qnaIndexArr = [];
        const qnaCommentsArr = [];
        for (let i = 0; i < data.length; i++) {
          qnaContentArr.push(data[i].qnaContent);
          qnaIdArr.push(data[i].qnaId);
          qnaTitleArr.push(data[i].qnaTitle);
          qnaViewCountArr.push(data[i].qnaViewCount);
          qnaCommentsArr.push(data[i].comments.length);
          qnaIndexArr.push(i);
        }
        setQnaContent(qnaContentArr);
        setQnaTitle(qnaTitleArr);
        setQnaViewCount(qnaViewCountArr);
        setQnaId(qnaIdArr);
        setIndex(qnaIndexArr);
        setQnaComments(qnaCommentsArr);
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
            {index.map((i) => {
              return (
                <tr>
                  <td style={{ height: 50 }}>
                    <div
                      className="noticeTxt"
                      style={{ fontSize: "1.5em", cursor: "pointer" }}
                      onClick={() => {
                        const formData = new FormData();
                        formData.append("qnaId", qnaId[i]);
                        axios
                          .post(`/qna/addviewcount`, formData)
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                        navigate(`/qna/detail`, {
                          state: { qnaId: qnaId[i] },
                        });
                      }}
                    >
                      {qnaTitle[i]}
                    </div>
                  </td>
                  <td>
                    <p
                      className="noticeTxtCenter"
                      style={{ fontSize: "1.5em", cursor: "pointer" }}
                      onClick={() => {
                        const formData = new FormData();
                        formData.append("qnaId", qnaId[i]);
                        axios
                          .post(`/qna/addviewcount`, formData)
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                        navigate(`/qna/detail`, {
                          state: { qnaId: qnaId[i] },
                        });
                      }}
                    >
                      {qnaComments[i]}
                    </p>
                  </td>
                  <td>
                    <p
                      className="noticeTxtCenter"
                      style={{ fontSize: "1.5em", cursor: "pointer" }}
                      onClick={() => {
                        const formData = new FormData();
                        formData.append("qnaId", qnaId[i]);
                        axios
                          .post(`/qna/addviewcount`, formData)
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                        navigate(`/qna/detail`, {
                          state: { qnaId: qnaId[i] },
                        });
                      }}
                    >
                      {qnaViewCount[i]}
                    </p>
                  </td>
                </tr>
              );
            })}
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
