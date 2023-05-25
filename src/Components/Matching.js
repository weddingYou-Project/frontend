import "../Css/main.css";
import "../Css/Matching.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function Matching() {
  const navigate = useNavigate();

  const [plannerMatching, setPlannerMatching] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("category") === "user") {
      //user일 경우
      axios
        .get(`/estimate/getuserdetail`, {
          params: { userEmail: sessionStorage.getItem("email") },
        })
        .then((res) => {
          console.log(res);
          let plannerMatchingArr = [];
          for (let i = 0; i < res.data.length; i++) {
            console.log(JSON.parse(res.data[i].plannermatching));
            // plannerMatchingArr.push(res.data[i].plannerMatching)
          }
          // setPlannerMatching(res.data.plannermatching);
        })
        .catch((e) => {
          console.log(e);
          if (e.response.data.message === "정보가 존재하지 않습니다!") {
            alert("매칭 목록 없음!");
          }
        });
    } else {
      //planner일 경우
    }
  }, []);

  console.log(plannerMatching);
  return (
    <div className="mainlayout">
      <hr />
      <NavigationBar title={"나의 매칭 목록"} />
      {sessionStorage.getItem("category") === "user" ? (
        <div>
          <p
            className="headertxt"
            style={{ marginTop: "80px", fontSize: "1.7em" }}
          >
            내 플래너
          </p>
          <div className="matchingList">
            <p
              className="myPlannerName"
              style={{
                fontSize: "1.6em",
                marginLeft: "100px",
                marginRight: "-70px",
              }}
            >
              000 플래너
            </p>
            <button className="plannerProBtn">프로필 보기</button>
            <br />
            <div className="matchingBtnList">
              <button
                className="plannerMatchingBtn"
                onClick={() => navigate("/checkoutall")}
              >
                결제하기
              </button>
              <button
                className="plannerMatchingBtn"
                data-bs-toggle="modal"
                data-bs-target="#CancelMatching"
              >
                매칭취소
              </button>
            </div>
          </div>
          <hr />
          <p className="headertxt" style={{ fontSize: "1.7em" }}>
            매칭 요청 온 플래너 목록
          </p>
          <div className="matchingList">
            <table>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 플래너
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 플래너
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 플래너
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 플래너
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
            </table>
            <Footer />
          </div>
          <div
            className="modal fade"
            id="CancelMatching"
            tabindex="-1"
            aria-labelledby="CancelMatching"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-2" id="CancelMatching">
                    매칭을 취소하시겠습니까?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ fontSize: "1.5em" }}>
                  매칭을 취소하실경우 해당 플래너에게 지불한 계약금은 환불되지
                  않습니다
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    매칭 취소하기
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    매칭 유지하기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="MatchOrCanel"
            tabindex="-1"
            aria-labelledby="MatchOrCanel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-2" id="CancelMatching">
                    해당 플래너와 매칭하시겠습니까?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ fontSize: "1.5em" }}>
                  매칭시 다른플래너들의 요청은 모두 거절되고 계약금 결제
                  페이지로 이동합니다.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/checkoutdeposit")}
                    data-bs-dismiss="modal"
                  >
                    매칭하기
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    거절하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <p
            className="headertxt"
            style={{ marginTop: "80px", fontSize: "1.7em" }}
          >
            매칭된 고객
          </p>
          <div className="matchingList">
            <p
              className="myPlannerName"
              style={{
                fontSize: "1.6em",
                marginLeft: "100px",
                marginRight: "-70px",
              }}
            >
              000 고객
            </p>
            <button className="plannerProBtn">프로필 보기</button>
            <br />
            <div className="matchingBtnList">
              <button
                className="plannerMatchingBtn"
                data-bs-toggle="modal"
                data-bs-target="#CancelMatching"
                style={{ marginLeft: "120px" }}
              >
                매칭취소
              </button>
            </div>
          </div>
          <hr />
          <p className="headertxt" style={{ fontSize: "1.7em" }}>
            매칭 요청 온 고객 목록
          </p>
          <div className="matchingList">
            <table>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 고객
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 고객
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 고객
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  className="myPlannerName"
                  style={{
                    width: 160,
                    fontSize: "1.6em",
                    paddingLeft: "25px",
                    paddingTop: "10px",
                  }}
                >
                  000 고객
                </td>
                <td>
                  <button className="plannerMatchingBtn">프로필보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanel"
                  >
                    매칭/거절
                  </button>
                </td>
              </tr>
            </table>
            <Footer />
          </div>
          <div
            className="modal fade"
            id="CancelMatching"
            tabindex="-1"
            aria-labelledby="CancelMatching"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-2"
                    id="CancelMatching"
                    style={{ fontSize: "1.6em" }}
                  >
                    매칭을 취소하시겠습니까?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ fontSize: "1.5em" }}>
                  매칭을 취소하실경우 해당 플래너에게 지불한 계약금은 환불되지
                  않습니다
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    매칭 취소하기
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    매칭 유지하기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="MatchOrCanel"
            tabindex="-1"
            aria-labelledby="MatchOrCanel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-2"
                    id="CancelMatching"
                    style={{ fontSize: "1.6em" }}
                  >
                    해당 플래너와 매칭하시겠습니까?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ fontSize: "1.5em" }}>
                  매칭시 다른플래너들의 요청은 모두 거절되고 계약금 결제
                  페이지로 이동합니다.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/checkoutdeposit")}
                    data-bs-dismiss="modal"
                  >
                    매칭하기
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    거절하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Matching;
