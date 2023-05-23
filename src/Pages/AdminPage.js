import { useState } from "react";
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
    { ...planner },
    ,
    { ...planner },
    { ...planner },
  ];

  let [rolldown, setRolldown] = useState("rolldown");
  let [rolldown2, setRolldown2] = useState("");

  function rolldownControl(e) {
    let num = e.target.dataset.id;
    if (num == 0) {
      if (rolldown == "") {
        setRolldown("rolldown");
        setRolldown2("");
      } else {
        setRolldown("");
      }
    } else if (num == 1) {
      if (rolldown2 == "") {
        setRolldown2("rolldown");
        setRolldown("");
      } else {
        setRolldown2("");
      }
    }
  }

  //페이지네이션

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
            <table>
              <thead>
                <tr>
                  <td>이름</td>
                  <td>구분</td>
                  <td>휴대폰</td>
                  <td>성별</td>
                  <td>가입일시</td>
                </tr>
              </thead>
              <tbody>
                <미리보기 array={array} />
              </tbody>
            </table>
            <div className="adminpage-pagingAndResearchBox">
              <div>1 2 3 4 5 6 7</div>
              <div>
                <input type="text" placeholder="유저검색" />
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
            <table>
              <thead>
                <tr>
                  <td>이름</td>
                  <td>구분</td>
                  <td>휴대폰</td>
                  <td>성별</td>
                  <td>가입일시</td>
                </tr>
              </thead>
              <tbody>
                <미리보기 array={array} />
              </tbody>
            </table>
            <div className="adminpage-pagingAndResearchBox">
              <div>1 2 3 4 5 6 7</div>
              <div>
                <input type="text" placeholder="게시물검색" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserDetailModal />
      <Footer />
    </div>
  );
};

export default AdminPage;

const 미리보기 = ({ array }) => {
  return (
    <>
      {array.map((e, index) => {
        return (
          <tr>
            <td>{e.username}</td>
            <td>{e.category}</td>
            <td>{e.phone}</td>
            <td>{e.gender}</td>
            <td>{e.joinDate}</td>
          </tr>
        );
      })}
    </>
  );
};

const UserDetailModal = () => {
  return (
    <div
      class="modal fade"
      id="exampleModal"
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
              회원상세정보
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
            <p>이름 : 송경세</p>
            <p>구분 : 플래너</p>
            <p>이메일 : dfkej@maver.com</p>
            <p>비밀번호 : 2314</p>
            <p>성별 : 여자</p>
            <p>휴대폰 : 010-3425-2353</p>
            <p>가입일 : 2023-05-04</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
