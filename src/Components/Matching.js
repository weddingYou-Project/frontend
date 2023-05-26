import "../Css/main.css";
import "../Css/Matching.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Matching() {
  const navigate = useNavigate();

  const [plannerMatching, setPlannerMatching] = useState([]);
  const [estimateCount, setEstimateCount] = useState([]);
  const [plannerName, setPlannerName] = useState("");
  const [plannerData, setPlannerData] = useState([]);
  const [count, setCount] = useState([]);
  const [deletedPlanner, setDeletedPlanner] = useState(false);
  const [deletePermission, setDeletePermission] = useState(false);
  const [bsIndex, setBsIndex] = useState(0);
  const [bsIndex2, setBsIndex2] = useState(0);
  const [deleteTargetEstimateId, setDeleteTargetEstimateId] = useState(0);
  const [deletePlanner, setDeletePlanner] = useState("");
  const [matchedPlanner, setMatchedPlanner] = useState(null);
  const [deletePlannerName, setDeletePlannerName] = useState(null);
  const [estimateNum, setEstimateNum] = useState(0);

  const deleteBtn = useRef();

  useEffect(() => {
    if (sessionStorage.getItem("category") === "user") {
      //user일 경우
      var plannerMatchingArr = [];
      var estimateCountArr = [];
      var dataArr = [];
      var countArr = [];

      const fetchData1 = async () => {
        try {
          const res = await axios.get(`/estimate/getuserdetail`, {
            params: { userEmail: sessionStorage.getItem("email") },
          });

          console.log(res);
          if (res.data.length !== 0) {
            for (let i = 0; i < res.data.length; i++) {
              let temp = [];
              const arr = JSON.parse(res.data[i].plannermatching);
              plannerMatchingArr.push(arr);
              estimateCountArr.push(i);
              dataArr.push(res.data[i]);
              if (arr === undefined || arr === null) {
                alert("매칭된 목록이 없음!");
              }
              for (let j = 0; j < arr.length; j++) {
                temp.push(j);
              }
              countArr.push(temp);
            }

            axios
              .get(`/estimate/getPlannerName`, {
                params: { userEmail: sessionStorage.getItem("email") },
              })
              .then((res) => {
                console.log("plannerNameeeeeeeeeeeeeeeee");
                console.log(res.data);
                setPlannerName(res.data);
              })
              .catch((e) => {
                console.log(e);
              });

            setPlannerData(dataArr);
            setPlannerMatching(plannerMatchingArr);
            setEstimateCount(estimateCountArr);
            setCount(countArr);
          } else {
            alert("매칭 목록 없음!");
          }
        } catch (e) {
          console.log(e);
        }
      };
      fetchData1();
    } else {
      //planner일 경우
    }
  }, [deletedPlanner, matchedPlanner]);

  const deleteMatchingPlanner = (e) => {
    e.preventDefault();
    console.log(e.target.dataset);
    const bsIndex = e.target.dataset.bsIndex;
    const bsIndex2 = e.target.dataset.bsIndex2;
    const estimateId = e.target.dataset.bsEstimateid;
    const deleteTargetEstimateId = estimateId;
    const bsEstimateNum = e.target.dataset.bsEstimatenum;
    const deletePlanner = plannerMatching[bsIndex][bsIndex2];
    const deletePlannerName = plannerName[bsIndex][bsIndex2];
    setBsIndex(bsIndex);
    setBsIndex2(bsIndex2);
    setDeleteTargetEstimateId(deleteTargetEstimateId);
    setDeletePlanner(deletePlanner);
    setDeletePlannerName(deletePlannerName);
    setEstimateNum(bsEstimateNum);
  };

  const deleteMatchingPlanner2 = () => {
    const formData = new FormData();
    formData.append("deleteTargetEstimateId", deleteTargetEstimateId);
    formData.append("deletePlanner", deletePlanner);
    axios
      .post(`/estimate/deleteMatchingPlanner`, formData)
      .then((res) => {
        setDeletedPlanner(!deletedPlanner);
        if (deletePlannerName === matchedPlanner) {
          CancelMatching();
        }
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const goMatching = () => {
    const formData = new FormData();
    formData.append("targetEstimateId", deleteTargetEstimateId);
    formData.append("matchingPlanner", deletePlanner);
    formData.append("userEmail", sessionStorage.getItem("email"));
    axios
      .post(`/estimate/matching`, formData)
      .then((res) => {
        console.log(res);
        setMatchedPlanner(res.data);
        navigate("/checkoutdeposit");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("userEmail", sessionStorage.getItem("email"));
    axios
      .post(`/estimate/getMatchedPlanner`, formData)
      .then((res) => {
        console.log(res);
        setMatchedPlanner(res.data.slice(0, res.data.length - 1));
        setEstimateNum(res.data.slice(res.data.length - 1, res.data.length));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [deletedPlanner]);

  const CancelMatching = () => {
    const formData = new FormData();
    formData.append("userEmail", sessionStorage.getItem("email"));
    axios
      .post(`/estimate/cancelMatchedPlanner`, formData)
      .then((res) => {
        console.log(res);
        setMatchedPlanner(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //console.log("estimateNum:" + estimateNum);
  return (
    <div className="mainlayout">
      <hr />
      <NavigationBar title={"나의 매칭 목록"} />
      {sessionStorage.getItem("category") === "user" ? (
        <div style={{ minHeight: "100vh", height: "100%" }}>
          <p
            className="headertxt"
            style={{ marginTop: "80px", fontSize: "1.7em" }}
          >
            내 플래너
          </p>
          {matchedPlanner !== null ? (
            <div>
              <div className="matchingList">
                <div
                  style={{
                    fontSize: "1.7em",
                    width: "100%",
                    paddingLeft: "240px",
                    paddingTop: "20px",
                    borderBottom: "3px double grey",
                    borderTop: "3px dashed grey",
                    paddingBottom: "20px",
                  }}
                >
                  -견적서{estimateNum}-
                </div>
                <p
                  className="myPlannerName"
                  style={{
                    fontSize: "1.6em",
                    marginLeft: "100px",
                    marginRight: "-70px",
                  }}
                >
                  {matchedPlanner}
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
            </div>
          ) : (
            <div
              style={{
                marginTop: "20px",
                height: "20px",
                fontSize: "1.5em",
                paddingLeft: "160px",
                marginBottom: "60px",
              }}
            >
              아직 매칭된 플래너가 없습니다.
            </div>
          )}
          <hr />
          <p className="headertxt" style={{ fontSize: "1.7em" }}>
            매칭 요청 온 플래너 목록
          </p>
          <div>
            {estimateCount.map((index, keyindex) => {
              var plannerList = plannerName[index];
              var estimateId = plannerData[index].id;
              console.log("estimateId:" + estimateId);

              return (
                <table
                  style={{
                    marginTop: "30px",
                    borderTop: "3px dashed grey",
                    borderBottom: "3px dashed grey",
                  }}
                  className="matchingList"
                >
                  <tr>
                    <td
                      style={{
                        fontSize: "1.7em",
                        width: "100%",
                        paddingLeft: "30px",
                        paddingTop: "10px",
                        borderBottom: "3px double grey",
                      }}
                    >
                      -견적서{index + 1}-
                    </td>
                    <td
                      colSpan="2"
                      style={{
                        paddingLeft: "100px",
                        borderBottom: "3px double grey",
                      }}
                    >
                      <button
                        className="plannerMatchingBtn"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/estimatedetail/${estimateId}`);
                        }}
                      >
                        견적서보기
                      </button>
                    </td>
                  </tr>

                  {count[index].map((i) => {
                    // console.log(plannerData[0][i]);
                    console.log(i);
                    console.log("**************************");
                    try {
                      let plannername = plannerList[i];
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
                            {plannername}
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
                              data-bs-index={index}
                              data-bs-index2={i}
                              data-bs-estimateId={estimateId}
                              data-bs-estimateNum={index + 1}
                              onClick={deleteMatchingPlanner}
                            >
                              매칭/거절
                            </button>
                          </td>
                        </tr>
                      );
                    } catch (e) {
                      console.log(e);
                    }
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={CancelMatching}
                  >
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
                    onClick={goMatching}
                    data-bs-dismiss="modal"
                  >
                    매칭하기
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={deleteBtn}
                    onClick={deleteMatchingPlanner2}
                  >
                    거절하기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "150px" }}></div>
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
                onClick={() => {
                  setDeletePermission(true);
                }}
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
                    onClick={deleteMatchingPlanner}
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
                    onClick={deleteMatchingPlanner}
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
                    onClick={deleteMatchingPlanner}
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
                    onClick={deleteMatchingPlanner}
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setDeletePermission(true);
                    }}
                  >
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
                    onClick={goMatching}
                    data-bs-dismiss="modal"
                  >
                    매칭하기
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={deleteMatchingPlanner2}
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
