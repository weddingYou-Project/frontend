import "../Css/main.css";
import "../Css/CustomerCenter.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import selectImg from "../Assets/selectImg.webp";

function QnAdetail() {
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState("답변 Smaple");

  const [actionmode, setActionmode] = useState(0);

  const { qnaId } = useLocation().state;

  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [date, setDate] = useState("");
  const [view, setView] = useState(0);
  const [content, setContent] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const navigate = useNavigate();
  const onChangePic = (e) => {
    console.log(e);
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

  useEffect(() => {
    axios
      .get(`/qna/${qnaId}`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setTitle(data.qnaTitle);
        setDate(data.qnaWriteDate.slice(0, 10));
        setView(data.qnaViewCount);
        setContent(data.qnaContent);
      })
      .catch((e) => {
        console.log(e);
      });
    const formData = new FormData();
    formData.append("qnaId", qnaId);
    axios
      .post(`/qna/getqnaimg`, formData)
      .then((res) => {
        console.log(res.data);
        const byteCharacters = atob(res.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleRefresh = () => {
    window.location.reload(); // 페이지 새로고침
  };

  const qnaUpdateForm = () => {
    setActionmode(1);
  };

  const updateQna = () => {
    setActionmode(0);
  };

  if (actionmode === 0) {
    return (
      <div className="mainlayout">
        <NavigationBar title={"Q&A"} />
        <div style={{ height: 64 }}></div>
        <div className="titleArea">
          <p className="titleTxt">{title}</p>
          <p className="dateTxt">{date}</p>
          <p className="viewCountTxt" style={{ marginRight: "20px" }}>
            조회수 : {view}
          </p>
          <button className="upAndDelBtn2" onClick={qnaUpdateForm}>
            수정
          </button>
          <button
            className="upAndDelBtn2"
            data-bs-toggle="modal"
            data-bs-target="#qnaDelete"
          >
            삭제
          </button>
        </div>
        <hr />
        <div className="ContentArea">
          <p className="noticeContxt">{content}</p>
          {previewUrl !== "" ? (
            <div
              style={{
                marginTop: "200px",
                marginLeft: "30px",
                marginBottom: "20px",
              }}
            >
              <p style={{ fontSize: "1.5em" }}>고객 첨부 이미지</p>
              <img
                src={previewUrl}
                alt=""
                style={{
                  width: "200px",
                  height: "200px",
                  display: "block",
                  borderRadius: "10px",
                }}
              />
            </div>
          ) : null}
        </div>
        <div
          class="modal fade"
          id="qnaDelete"
          tabindex="-1"
          aria-labelledby="qnaDelete"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Q&A 삭제
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" style={{ fontSize: 26 }}>
                정말로 삭제하시겠습니까?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleRefresh}
                >
                  삭제
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="ComentTitle">답변</p>
        <div className="ComentArea">
          <div className="Coment">
            <p className="nickname">운영자</p>
            <p className="dateTxt">2023.05.22</p>
            <br />
            <div>
              {editMode ? (
                <div>
                  <input
                    type="text"
                    placeholder={editedComment}
                    onChange={handleChange}
                    className="comentinput"
                    style={{ fontSize: 20 }}
                  />
                  <button onClick={handleSaveClick} className="writeBtn2">
                    완료
                  </button>
                </div>
              ) : (
                <div>
                  <p className="AnsTxt">{editedComment}</p>
                  <button onClick={handleEditClick} className="upAndDelBtn3">
                    수정
                  </button>
                  <button
                    className="upAndDelBtn3"
                    data-bs-toggle="modal"
                    data-bs-target="#qnaComentDelete"
                  >
                    삭제
                  </button>
                  <div
                    class="modal fade"
                    id="qnaComentDelete"
                    tabindex="-1"
                    aria-labelledby="qnaComentDelete"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            댓글 삭제
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body" style={{ fontSize: 26 }}>
                          정말로 삭제하시겠습니까?
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={handleRefresh}
                          >
                            삭제
                          </button>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className="comentinput"
            style={{ fontSize: 20 }}
          ></input>
          <button className="writeBtn2">작성</button>
        </div>
        <div style={{ height: 90 }}></div>
        <Footer />
      </div>
    );
  } else if (actionmode === 1) {
    return (
      <div className="mainlayout">
        <NavigationBar title={"글수정"} />
        <div style={{ height: 74 }}></div>
        <div className="titleArea">
          <p className="titleTxt">Q&A TitleSample</p>
        </div>
        <hr />
        <div className="writeContent">
          <textarea
            className="form-control contentinput"
            rows="15"
            placeholder="수정내용을 입력해주세요"
            style={{ fontSize: 20 }}
          ></textarea>
        </div>
        <hr />
        <div className="fileatt">
          <p className="uploadphoto">사진 첨부</p>
          <input
            type="file"
            multiple
            id="uploadimage"
            className="displaynone"
          />
          <label htmlFor="uploadimage" className="cursor imageBtn">
            사진선택
          </label>
        </div>
        <br />
        <div className="writeBtnArea">
          <button className="writeBtn" onClick={updateQna}>
            수정하기
          </button>
        </div>
        <div style={{ height: 90 }}></div>
        <Footer />
      </div>
    );
  }
}

export default QnAdetail;
