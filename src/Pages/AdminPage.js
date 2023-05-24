import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import "../Css/AdminPage.css";

const AdminPage = () => {
  //의문점 이메일은 안보여줘도 되는지
  const navigate = useNavigate();
  let [user, setUser] = useState({
    username: "송경세",
    category: "일반유저",
    phone: "010-7324-6534",
    gender: "남자",
    joinDate: "2023-05-04",
  });
  let [planner, setPlanner] = useState({
    username: "송경순",
    category: "플래너",
    phone: "010-7324-6534",
    gender: "여자",
    joinDate: "2023-05-04",
  });

  const 실험 = () => {
    setUser({
      username: "송경상",
      category: "planner",
      phone: "010-3423-3424",
      gender: "여자",
      joinDate: "2023-02-01",
    });
  };

  let array = [
    { ...user },
    { ...planner },
    { ...planner },
    { ...planner },
    { ...planner },
    { ...planner },
    { ...planner },
    { ...planner },
    { ...planner },
    { ...planner },
    { ...planner },
  ];

  let estimate = {
    title: "thdrudtp15@naver.com님의 견적서",
    matchstatus: true,
    date: "2023-03-05",
  };

  let array2 = [
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
    { ...estimate },
  ];

  let [rolldown, setRolldown] = useState("rolldown");
  let [rolldown2, setRolldown2] = useState("");

  function rolldownControl(e) {
    let num = e.target.dataset.id;
    if (num == 0) {
      if (rolldown == "") {
        setRolldown("rolldown");
        setRolldown2("");
      }
    } else if (num == 1) {
      if (rolldown2 == "") {
        setRolldown2("rolldown");
        setRolldown("");
      }
    }
  }

  let [modalMode, setModalMode] = useState("user");

  //페이징 실험을 위한 부분임.
  let [pageLink, setPageLink] = useState([]);
  let [postList, setPostList] = useState([]);

  let page_num = 1; //페이지 번호 처음에 페이지 들어가면 첫번째 페이지를 보여줘야 하니 1
  const page_size = 11; //한 페이지에 나타낼 글의 수 가져올 데이터의 개수를 제한할 수 있음.
  let page_count = 1; //페이지 갯수
  let article_count; //

  const getList = () => {
    axios
      .get("http://localhost:8080/estimate/getcount", {})
      .then((res) => {
        console.log("data=>", res.data);
        const { data } = res;
        article_count = data; //총 글의 갯수 저장.
        page_count = Math.ceil(article_count / page_size); //무조건 올림처리 함. 9.1도 10으로, 필요한 페이지 개수를 계산함.
        var page_link = []; //map 함수를 사용하기 위한 배열화.
        for (let i = 1; i <= page_count; i++) {
          page_link.push(i);
        }
        console.log("getArticleCount(page_link) =>", page_link);
        setPageLink(page_link);
      })
      .catch((e) => {
        console.log(e);
      });

    console.log("start=>", page_num);
    console.log("page_num=>", page_num);
    axios
      .post("http://localhost:8080/estimate/pageinglist", {
        page_num: page_num,
        limit: page_size,
      })
      .then((res) => {
        console.log("res ==>", res);
        const { data } = res;
        console.log("data==>", data);
        setPostList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  //페이징처리하기 위함 공식 int start = (page_num - 1 ) * limit;

  useEffect(() => {
    getList();
  }, []);

  let [postArticle, setPostArticle] = useState({
    id: "",
    title: "",
    budget: "",
    writer: "",
    viewcount: null,
    date: "",
  });

  const postDetail = (id, title, budget, writer, viewcount, date) => {
    setPostArticle({
      id: id,
      title: title,
      budget: budget,
      writer: writer,
      viewcount: viewcount,
      date: date,
    });
    setModalMode("post");
  };

  const onPageing = (e) => {
    axios
      .post("http://localhost:8080/estimate/pageinglist", {
        page_num: parseInt(e.target.id),
        limit: page_size,
      })
      .then((res) => {
        console.log("res ==>", res);
        const { data } = res;
        console.log("data==>", data);
        setPostList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="mainlayout">
      <NavigationBar title="마이페이지(관리자)" />
      <div className="adminpage-container">
        <div className={`adminpage-Administration ${rolldown}`}>
          <div
            className="adminpage-Administration-title cursor"
            onClick={rolldownControl}
            data-id="0"
          >
            유저관리
          </div>
          <div className="adminpage-Administration-list">
            <div className="adminpage-Administration-list-head-box">
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "20%" }}
              >
                이름
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "15%" }}
              >
                고객구분
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "30%" }}
              >
                휴대폰
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "15%" }}
              >
                성별
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "20%" }}
              >
                가입일자
              </div>
            </div>
            <미리보기 array={array} setModalMode={setModalMode} />
            <div className="adminpage-pagingAndResearchBox">
              <div>1 2 3 4 5 6 7</div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="유저검색"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="adminpage-Administration">견적게시물관리</div> */}
        {/*===================================================================== */}
        <div className={`adminpage-Administration ${rolldown2}`}>
          <div
            className="adminpage-Administration-title cursor"
            onClick={rolldownControl}
            data-id="1"
          >
            견적서게시물관리
          </div>
          <div className="adminpage-Administration-list">
            <div className="adminpage-Administration-list-head-box">
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "60%" }}
              >
                제목
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "20%" }}
              >
                매칭상태
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "20%" }}
              >
                작성일시
              </div>
            </div>
            <미리보기2
              array2={postList}
              setModalMode={setModalMode}
              postDetail={postDetail}
            />
            <div className="adminpage-pagingAndResearchBox">
              <div>
                {pageLink.map((e, index) => {
                  return <PageLink num={e} onPageing={onPageing} />;
                })}
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="게시물검색"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Signup-button">
          <button
            onClick={() => {}}
            className="btn-colour-1"
            style={{ marginRight: "15px" }}
          >
            로그아웃
          </button>
          <button onClick={() => {}} className="btn-colour-1">
            계정삭제
          </button>
        </div>
      </div>
      <DetailModal
        user={user}
        modalMode={modalMode}
        postArticle={postArticle}
      />
      {/* <PostDetailModal /> */}
      <Footer />
    </div>
  );
};

export default AdminPage;

const 미리보기 = ({ array, setModalMode }) => {
  return (
    <>
      {array.map((e, index) => {
        return (
          <div
            className="adminpage-Administration-list-body-box cursor"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
            onClick={() => {
              setModalMode("user");
            }}
          >
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "20%" }}
            >
              {e.username}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "15%" }}
            >
              {e.category}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "30%" }}
            >
              {e.phone}1
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "15%" }}
            >
              {e.gender}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "20%" }}
            >
              {e.joinDate}
            </div>
          </div>
        );
      })}
    </>
  );
};

const 미리보기2 = ({ array2, postDetail }) => {
  return (
    <>
      {array2.map((e, index) => {
        return (
          <div
            className="adminpage-Administration-list-body-box cursor"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
            onClick={() => {
              postDetail(
                e.id,
                e.title,
                e.budget,
                e.writer,
                e.viewcount,
                e.date
              );
            }}
          >
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "60%", padding: "0px 10px" }}
            >
              {e.title}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "20%" }}
            >
              {e.matchstatus == true && "매칭완료"}
              {e.matchstatus == false && "매칭미완료"}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "20%" }}
            >
              {e.date}
            </div>
          </div>
        );
      })}
    </>
  );
};

const DetailModal = ({ user, modalMode, postArticle }) => {
  return (
    <div
      class="modal fade"
      id="userModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title adminpage-modalheader"
              id="exampleModalLabel"
            >
              {modalMode == "user" ? "회원상세정보" : "게시글상세정보"}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body adminpage-modalbody">
            {/*내용입력 */}
            {modalMode == "user" ? (
              <>
                <p>{user.username}</p>
                <p>{user.category}</p>
                <p>이메일 : dfkej@maver.com</p>
                <p>비밀번호 : 2314</p>
                <p>{user.gender}</p>
                <p>{user.phone}</p>
                <p>가입일 : 2023-05-04</p>
              </>
            ) : (
              <>
                <p>제목 : {postArticle.title}</p>
                <p>글쓴이 : {postArticle.writer} </p>
                <p>작성일시 : {postArticle.date}</p>
                <p>조회수 : {postArticle.viewcount}</p>
              </>
            )}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">
              수정
            </button>
            <button type="button" class="btn btn-danger">
              계정삭제
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageLink = ({ num, onPageing }) => {
  return (
    <div class="page">
      <a href="#" id={num} onClick={onPageing}>
        {num}
      </a>
      &nbsp;
    </div>
  );
};
