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
  const [estimateCount, setEstimateCount] = useState([]);
  const [plannerName, setPlannerName] = useState("");
  const [plannerData, setPlannerData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("category") === "user") {
      //user일 경우
      let plannerMatchingArr = [];
      let estimateCountArr = [];
      let plannerNameArr = [];
      let dataArr = [];
      let count = 0;
      axios
        .get(`/estimate/getuserdetail`, {
          params: { userEmail: sessionStorage.getItem("email") },
        })
        .then((res) => {
          console.log(res);

          for (let i = 0; i < res.data.length; i++) {
            const arr = JSON.parse(res.data[i].plannermatching);
            plannerMatchingArr.push(arr);
            estimateCountArr.push(i);
            for (let j = 0; j < plannerMatchingArr.length; j++) {
              axios
                .post(`/planner/plannerSearch`, {
                  email: arr[j],
                })
                .then((res) => {
                  console.log("--------------------");
                  console.log(res);
                  plannerNameArr.push(res.data.name);

                  console.log(res.data.name);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          }
          setPlannerName(plannerNameArr);
          dataArr.push(res.data);
          console.log(dataArr);
          setPlannerData(dataArr);
          setPlannerMatching(plannerMatchingArr);
          setEstimateCount(estimateCountArr);
          count = res.data.length;
          //setCount(res.data.length);
        })
        .catch((e) => {
          console.log(e);
          if (e.response.data.message === "정보가 존재하지 않습니다!") {
            alert("매칭 목록 없음!");
          }
        });
      let plannerNameArr2 = [];
      console.log("plannerMatchingArr");
      console.log(count);
      // for (let i = 0; i < 2; i++) {
      //   let arr = plannerMatchingArr[i];
      //   console.log("indexxxxxxxxx");
      //   console.log(i);
      //   console.log("arr");
      //   console.log(arr);
      //   for (let j = 0; j < arr.length; j++) {
      //     console.log("email:" + arr[j]);
      //     const fetchData = async () => {
      //       try {
      //         const response = await axios.post(`/planner/plannerSearch`, {
      //           email: arr[j],
      //         });
      //         const { data } = response;

      //         plannerNameArr2.push(data.name);

      //         if (j === arr.length - 1) {
      //           plannerNameArr.sort(function (a, b) {
      //             if (a.itemName < b.itemName) return -1;
      //             if (a.itemName > b.itemName) return 1;
      //             if (a.itemName === b.itemName) return 0;
      //           });
      //           plannerNameArr.push(plannerNameArr2);
      //           console.log("plannerNameArr2:");
      //           console.log(plannerNameArr2);
      //         }
      //       } catch (error) {
      //         console.log(error);
      //       }
      //     };
      //     fetchData();
      //   }
      // }
    } else {
      //planner일 경우
    }
  }, []);

  console.log(plannerMatching);
  console.log("originalplannerName: " + plannerName);
  console.log(plannerName);
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
            {estimateCount.map((index, keyindex) => {
              let i = parseInt(index);
              console.log("index:" + keyindex);
              return (
                <table>
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        fontSize: "1.5em",
                        width: "100%",
                        paddingLeft: "20px",
                        paddingTop: "20px",
                      }}
                    >
                      견적서{index + 1}
                    </td>
                  </tr>
                  {console.log("PLANNERNAME")}
                  {console.log(plannerName)}
                  {plannerMatching[index].map((arr) => {
                    console.log(arr);
                    let plannerName = "";

                    return (
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
                          {plannerName}
                        </td>
                        <td>
                          <button className="plannerMatchingBtn">
                            프로필보기
                          </button>
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
                    );
                  })}
                </table>
              );
            })}

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
