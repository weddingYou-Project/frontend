import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

import "../Css/AdminPage.css";

const AdminPage = () => {
  useEffect(() => {
    getList();
  }, []);

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
  //유저 데이터 더미
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

  //카테고리 클릭시 스타일 부여하는 state 및 함수
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

  //모달창의 모드를 구분함 초기값 "user"
  let [modalMode, setModalMode] = useState("user");

  //게시글의 상태가 검색을 하는 상태인지 구분하는 state 이걸통해 페이징 처리를 올바르게 할 수 있음.
  let [postSearchMode, setPostSearchMode] = useState("none");

  //링크생성 state 및 유저,게시글 데이터 담는 state
  let [pageLink, setPageLink] = useState([]);
  let [postList, setPostList] = useState([]);
  let [userPageLink, setUserPageLink] = useState([1, 2]);
  let [userList, setUserList] = useState([]);

  //검색어 담는 state And 그 검색어를 따로 저장할 state
  let postSearchRef = useRef();
  let userSearchRef = useRef();

  let [userSearch, setUserSearch] = useState("");
  let [userSearchPageing, setUserSearchPaeing] = useState("");

  let [postSearch, setPostSearch] = useState("");
  let [postSearchPageing, setPostSearchPageing] = useState("");

  //데이터 가져오는 함수(검색어 X)
  const getList = () => {
    setPostSearchMode("none");
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
    let query = document.querySelectorAll(".pgAll");
    query.forEach((e) => {
      e.classList.remove("pageing-select");
    });
    document.querySelectorAll(".pgAll")[0].classList.add("pageing-select");
    setPostSearch("");
  };

  //게시글 조회시 데이터 담는 부분
  let [postArticle, setPostArticle] = useState({
    id: "",
    title: "",
    budget: "",
    writer: "",
    viewcount: null,
    date: "",
    matchstatus: null,
  });
  const postDetail = (
    id,
    title,
    budget,
    writer,
    viewcount,
    date,
    matchstatus
  ) => {
    setPostArticle({
      id: id,
      title: title,
      budget: budget,
      writer: writer,
      viewcount: viewcount,
      date: date,
      matchstatus: matchstatus,
    });
    setModalMode("post");
  };

  //페이징
  const onPageing = (e) => {
    const fetchData = () => {
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

    const fetchData2 = () => {
      axios
        .post("http://localhost:8080/estimate/getsearchlistpageing", {
          page_num: parseInt(e.target.id),
          limit: page_size,
          search: postSearchPageing,
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

    const elements = document.querySelectorAll(".pgAll");
    elements.forEach((element) => {
      element.classList.remove("pageing-select");
    });
    document.querySelector(`.pg${e.target.id}`).classList.add("pageing-select");
    if (postSearchMode === "none") {
      fetchData();
    } else if (postSearchMode === "search") {
      fetchData2();
    }
  };
  let page_num = 1; //페이지 번호 처음에 페이지 들어가면 첫번째 페이지를 보여줘야 하니 1
  const page_size = 11; //한 페이지에 나타낼 글의 수 가져올 데이터의 개수를 제한할 수 있음.
  let page_count = 1; //페이지 갯수
  let article_count; //

  //검색어 관련 함수
  const onPostSearchChange = (e) => {
    //게시글 검색어
    setPostSearch(e.target.value);
  };
  const onUserSearchChange = (e) => {
    //유저 검색어
    setUserSearch(e.target.value);
  };

  const onSearching = () => {
    //게시글 검색 함수
    setPostSearchPageing(postSearch);
    setPostSearchMode("search");
    axios
      .post("http://localhost:8080/estimate/getsearchlistcount", {
        search: postSearch,
      })
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
      .post("http://localhost:8080/estimate/getsearchlistpageing", {
        page_num: page_num,
        limit: page_size,
        search: postSearch,
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

    let query = document.querySelectorAll(".pgAll");
    query.forEach((e) => {
      e.classList.remove("pageing-select");
    });
    document.querySelectorAll(".pgAll")[0].classList.add("pageing-select");
  };

  const onPostDelete = (id) => {
    axios
      .get("http://localhost:8080/estimate/delete", { params: { id: id } })
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((e) => {
        console.log(e);
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
            <UserListData array={array} setModalMode={setModalMode} />
            <div className="adminpage-pagingAndResearchBox">
              <div className="adminpage-pagingNumber">
                {userPageLink.length === 0 && (
                  <a className="pg1 cursor pgAll pageing-select nonepage"></a>
                )}
                {userPageLink.map((e, index) => {
                  return <UserPageLink num={e} index={index} kind="user" />;
                })}
              </div>
              <div className="adminpage-researchBar">
                <div className="박스1111">
                  <input
                    type="text"
                    className="form-control"
                    id="usersearch"
                    value={userSearch}
                    ref={userSearchRef}
                    placeholder="유저검색"
                    onChange={onUserSearchChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.code === "Enter") {
                      }
                    }}
                  />
                  <button className="btn btnColor" onClick={() => {}}>
                    검색
                  </button>
                </div>
                <div className="전체보기버튼 cursor" onClick={getList}>
                  <i class="bi bi-arrow-counterclockwise"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 여기까지 유저관리 */}
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
                style={{ width: "14%" }}
              >
                글번호
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "50%" }}
              >
                제목
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "18%" }}
              >
                매칭상태
              </div>
              <div
                className="adminpage-Administration-list-head"
                style={{ width: "18%" }}
              >
                작성일시
              </div>
            </div>
            {postList.length === 0 && (
              <div className="nonedata">검색결과가 없습니다.</div>
            )}
            <PostListData
              array2={postList}
              setModalMode={setModalMode}
              postDetail={postDetail}
            />
            <div className="adminpage-pagingAndResearchBox">
              <div className="adminpage-pagingNumber">
                {pageLink.length === 0 && (
                  <a className="pg1 cursor pgAll pageing-select nonepage"></a>
                )}
                {pageLink.map((e, index) => {
                  return (
                    <PostPageLink
                      num={e}
                      onPageing={onPageing}
                      index={index}
                      kind="post"
                    />
                  );
                })}
              </div>
              <div className="adminpage-researchBar">
                <div className="박스1111">
                  <input
                    type="text"
                    className="form-control"
                    id="postsearch"
                    value={postSearch}
                    ref={postSearchRef}
                    placeholder="게시물검색"
                    onChange={onPostSearchChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.code === "Enter") {
                        onSearching();
                      }
                    }}
                  />
                  <button
                    className="btn btnColor"
                    onClick={() => {
                      onSearching();
                    }}
                  >
                    검색
                  </button>
                </div>
                <div className="전체보기버튼 cursor" onClick={getList}>
                  <i class="bi bi-arrow-counterclockwise"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Signup-button">
          <button
            onClick={() => {
              window.sessionStorage.removeItem("email");
              window.sessionStorage.removeItem("category");
              navigate("/");
            }}
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
        setModalMode={setModalMode}
        onPostDelete={onPostDelete}
      />
      {/* <PostDetailModal /> */}
      <Footer />
    </div>
  );
};

export default AdminPage;
//유저 리스트
const UserListData = ({ array, setModalMode }) => {
  return (
    <>
      {array.map((e, index) => {
        return (
          <div
            className="adminpage-Administration-list-body-box cursor"
            data-bs-toggle="modal"
            data-bs-target="#Modal"
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
//게시글 리스트
const PostListData = ({ array2, postDetail }) => {
  return (
    <>
      {array2.map((e, index) => {
        return (
          <div
            className="adminpage-Administration-list-body-box cursor"
            data-bs-toggle="modal"
            data-bs-target="#Modal"
            onClick={() => {
              postDetail(
                e.id,
                e.title,
                e.budget,
                e.writer,
                e.viewcount,
                e.date,
                e.matchstatus
              );
            }}
          >
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "14%", padding: "0px 10px" }}
            >
              {e.id}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "50%", padding: "0px 10px" }}
            >
              {e.title}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "18%" }}
            >
              {e.matchstatus == true && (
                <span className="matchTrue">매칭완료</span>
              )}
              {e.matchstatus == false && (
                <span className="matchFalse">매칭미완료</span>
              )}
            </div>
            <div
              className="adminpage-Administration-list-body"
              style={{ width: "18%" }}
            >
              {e.date}
            </div>
          </div>
        );
      })}
    </>
  );
};
//상세보기 모달창
const DetailModal = ({
  user,
  modalMode,
  postArticle,
  setModalMode,
  onPostDelete,
}) => {
  let navigate = useNavigate();
  return (
    <div
      class="modal fade"
      id="Modal"
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
              {modalMode == "user" && "회원 상세정보"}
              {modalMode == "post" && "게시글 상세정보"}
              {modalMode == "userModifyForm" && "회원정보 수정"}
              {modalMode == "postDelete" && "게시글 삭제"}
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
            {modalMode == "user" && (
              <div className="Modal-detail">
                <p>{user.username}</p>
                <p>{user.category}</p>
                <p>이메일 : dfkej@maver.com</p>
                <p>비밀번호 : 2314</p>
                <p>{user.gender}</p>
                <p>{user.phone}</p>
                <p>가입일 : 2023-05-04</p>
              </div>
            )}
            {modalMode == "post" && (
              <div className="Modal-detail">
                <p>제목 : {postArticle.title}</p>
                <p>글쓴이 : {postArticle.writer} </p>
                <p>작성일시 : {postArticle.date}</p>
                <p>조회수 : {postArticle.viewcount}</p>
                <p>
                  매칭여부 :{" "}
                  {postArticle.matchstatus == false ? "매칭미완료" : "매칭완료"}
                </p>
              </div>
            )}
            {modalMode == "userModifyForm" && (
              <div className="Modal-detail">
                <p>
                  이름 :{" "}
                  <input
                    type="text"
                    value={user.username}
                    className="form-control form-control-width"
                  />
                </p>
                <p>이메일 : thdrudtp15@naver.com </p>
                <p>
                  비밀번호 :{" "}
                  <input
                    type="text"
                    value="Asdf!zxcv15@"
                    className="form-control form-control-width"
                  />
                </p>
                <p>성별 : {user.gender}</p>
                <p>
                  휴대폰 :{" "}
                  <input
                    type="text"
                    value={user.phone}
                    className="form-control form-control-width"
                  />
                </p>
                <p>가입일 : 2020-02-30</p>
              </div>
            )}
            {modalMode == "postDelete" && (
              <div className="Modal-detail">
                <p>{postArticle.writer}님의 게시글을 삭제하시겠습니까?</p>
              </div>
            )}
          </div>
          <div class="modal-footer">
            {modalMode == "user" && (
              <>
                {" "}
                <button
                  type="button"
                  class="btn btnColor"
                  onClick={() => {
                    setModalMode("userModifyForm");
                  }}
                >
                  수정하기
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
              </>
            )}
            {modalMode == "userModifyForm" && (
              <>
                <>
                  <button type="button" class="btn btnColor" onClick={() => {}}>
                    수정
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    닫기
                  </button>
                </>
              </>
            )}
            {modalMode == "post" && (
              <>
                <button
                  data-bs-dismiss="modal"
                  className="btn btnColor"
                  onClick={() => {
                    navigate(`../estimatedetail/${postArticle.id}`);
                  }}
                >
                  게시글 상세보기
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() =>
                    // onPostDeletePage(postArticle.writer, postArticle.id)
                    setModalMode("postDelete")
                  }
                >
                  게시글 삭제
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  닫기
                </button>
              </>
            )}
            {modalMode == "postDelete" && (
              <>
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    onPostDelete(postArticle.id);
                  }}
                >
                  삭제
                </button>
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  취소
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
//견적글 페이지 번호(역량부족으로 인한 재활용 실패..;)
const PostPageLink = ({ num, onPageing, index, kind }) => {
  return (
    <div class="page">
      <p
        id={num}
        onClick={onPageing}
        className={
          index == 0
            ? `pg1 cursor pgAll pageing-select`
            : `pg${num} cursor pgAll`
        }
      >
        {num}
      </p>
      &nbsp;
    </div>
  );
};
const UserPageLink = ({ num, onPageing, index, kind }) => {
  return (
    <div class="page">
      <p
        id={num}
        className={
          index == 0
            ? `ug1 cursor ugAll pageing-select`
            : `ug${num} cursor ugAll`
        }
      >
        {num}
      </p>
      &nbsp;
    </div>
  );
};
