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
  const [matchedPlanner, setMatchedPlanner] = useState([]);
  const [deletePlannerName, setDeletePlannerName] = useState(null);
  const [estimateNum, setEstimateNum] = useState([]);
  const [matchedKeyIndex, setMatchedKeyIndex] = useState([]);
  const [selectEstimateNum, setSelectEstimateNum] = useState(0);
  const [selectDeletePlanner, setSelectDeletePlanner] = useState("");

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

    const bsIndex = e.target.dataset.bsIndex;
    const bsIndex2 = e.target.dataset.bsIndex2;
    const estimateId = e.target.dataset.bsEstimateid;
    const deleteTargetEstimateId = estimateId;
    const bsEstimateNum = e.target.dataset.bsEstimatenum - 1;
    const deletePlanner = plannerMatching[bsIndex][bsIndex2];
    const deletePlannerName = plannerName[bsIndex][bsIndex2];
    setBsIndex(bsIndex);
    setBsIndex2(bsIndex2);
    setDeleteTargetEstimateId(deleteTargetEstimateId);
    setDeletePlanner(deletePlanner);
    setDeletePlannerName(deletePlannerName);
    setSelectEstimateNum(bsEstimateNum);
    setSelectDeletePlanner(matchedPlanner[bsEstimateNum]);
  };

  const deleteMatchingPlanner2 = () => {
    const formData = new FormData();
    formData.append("deleteTargetEstimateId", deleteTargetEstimateId);
    formData.append("deletePlanner", deletePlanner);
    axios
      .post(`/estimate/deleteMatchingPlanner`, formData)
      .then((res) => {
        setDeletedPlanner(!deletedPlanner);

        if (res.data === 2) {
          setDeletedPlanner(!deletedPlanner);
        }
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
        const userName = res.data.slice(0, res.data.indexOf("/"));
        const userPhone = res.data.slice(
          res.data.indexOf("/") + 1,
          res.data.indexOf("]")
        );
        const plannerEmail = res.data.slice(
          res.data.indexOf("]") + 1,
          res.data.indexOf("[")
        );
        const plannerName = res.data.slice(
          res.data.indexOf("[") + 1,
          res.data.indexOf(",")
        );
        const budget = res.data.slice(
          res.data.indexOf(",") + 1,
          res.data.indexOf("*")
        );
        const plannerImg = res.data.slice(
          res.data.indexOf("*") + 1,
          res.data.length
        );
        let plannerImgUrl = "data:image/jpeg;base64," + plannerImg;

        navigate("/checkoutdeposit", {
          state: {
            estimateId: deleteTargetEstimateId,
            userName: userName,
            userPhone: userPhone,
            planneremail: plannerEmail,
            plannerName: plannerName,
            price: budget,
            plannerImg: plannerImgUrl,
          },
        });
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
        if (res.data !== "") {
          var splitData = res.data.slice(0, res.data.length - 1);
          var matchedPlanners = splitData.split("|");
          var matchedPlannerNameArr = [];
          var matchedPlannerEstimateNumArr = [];
          var keyIndexArr = [];
          let keyIndex = 0;

          for (var i = 0; i < matchedPlanners.length; i++) {
            const matchedPlanner = matchedPlanners[i];
            const index = matchedPlanner.indexOf("/");
            matchedPlannerNameArr.push(matchedPlanner.slice(0, index));
            matchedPlannerEstimateNumArr.push(
              matchedPlanner.slice(index + 1, res.data.length)
            );

            keyIndexArr.push(keyIndex);
            keyIndex++;
          }
          setMatchedPlanner(matchedPlannerNameArr);
          setEstimateNum(matchedPlannerEstimateNumArr);
          setMatchedKeyIndex(keyIndexArr);
        } else {
          setMatchedKeyIndex([]);
          setMatchedPlanner([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [deletedPlanner]);

  const CancelMatching = () => {
    const formData = new FormData();
    formData.append("userEmail", sessionStorage.getItem("email"));
    formData.append("deleteTargetEstimateId", deleteTargetEstimateId);
    axios
      .post(`/estimate/cancelMatchedPlanner`, formData)
      .then((res) => {
        setDeletedPlanner(!deletedPlanner);
        //setMatchedPlanner(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const CancelMatching2 = (e) => {
    const estimateNum = e.target.dataset.bsEstimatenum - 1;
    setSelectEstimateNum(estimateNum);
  };

  const CancelMatching3 = (e) => {
    const formData = new FormData();
    formData.append("userEmail", sessionStorage.getItem("email"));
    formData.append("estimateNum", selectEstimateNum);
    axios
      .post(`/estimate/cancelMatchedPlanner2`, formData)
      .then((res) => {
        setDeletedPlanner(!deletedPlanner);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const goPay = (e) => {
    const estimateNum = e.target.dataset.bsEstimatenum - 1;
    setSelectEstimateNum(estimateNum);
    console.log("estimateNum:" + estimateNum);
    const formData = new FormData();
    formData.append("userEmail", sessionStorage.getItem("email"));
    formData.append("estimateNum", estimateNum);

    axios
      .post(`/deposit/check`, formData)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data != -1 && data != 1) {
          const lastIndex = data.lastIndexOf("[");
          const status = res.data.slice(lastIndex + 1, res.data.length);
          console.log(status);
          if (status === "paid") {
            //paid
            const estimateId = res.data.slice(0, res.data.indexOf("*"));
            console.log(estimateId);
            const userName = res.data.slice(
              res.data.indexOf("*") + 1,
              res.data.indexOf("/")
            );
            console.log(userName);
            const userPhone = res.data.slice(
              res.data.indexOf("/") + 1,
              res.data.indexOf("]")
            );
            console.log(userPhone);
            const plannerEmail = res.data.slice(
              res.data.indexOf("]") + 1,
              res.data.indexOf("[")
            );
            console.log(plannerEmail);
            const plannerName = res.data.slice(
              res.data.indexOf("[") + 1,
              res.data.indexOf(",")
            );
            console.log(plannerName);
            const price = res.data.slice(
              res.data.indexOf(",") + 1,
              res.data.lastIndexOf("*")
            );
            const plannerImg = res.data.slice(
              res.data.lastIndexOf("*") + 1,
              res.data.lastIndexOf("[")
            );

            console.log(plannerImg);
            let plannerImgUrl = "data:image/jpeg;base64," + plannerImg;

            navigate("/checkoutall", {
              state: {
                estimateId: estimateId,
                userName: userName,
                userPhone: userPhone,
                planneremail: plannerEmail,
                plannerName: plannerName,
                plannerImg: plannerImgUrl,
                price: price,
              },
            });
          } else if (res.data === -1) {
            //오류
            alert("오류 발생!");
          } else if (status === "deposit") {
            //cancelled, other
            const estimateId = res.data.slice(0, res.data.indexOf("*"));
            const userName = res.data.slice(
              res.data.indexOf("*") + 1,
              res.data.indexOf("/")
            );
            const userPhone = res.data.slice(
              res.data.indexOf("/") + 1,
              res.data.indexOf("]")
            );
            const plannerEmail = res.data.slice(
              res.data.indexOf("]") + 1,
              res.data.indexOf("[")
            );
            const plannerName = res.data.slice(
              res.data.indexOf("[") + 1,
              res.data.indexOf(",")
            );
            const price = res.data.slice(
              res.data.indexOf(",") + 1,
              res.data.lastIndexOf("*")
            );
            const plannerImg = res.data.slice(
              res.data.lastIndexOf("*") + 1,
              res.data.lastIndexOf("[")
            );

            let plannerImgUrl = "data:image/jpeg;base64," + plannerImg;

            navigate("/checkoutdeposit", {
              state: {
                estimateId: estimateId,
                userName: userName,
                userPhone: userPhone,
                planneremail: plannerEmail,
                plannerName: plannerName,
                plannerImg: plannerImgUrl,
                price: price,
              },
            });
          }
        } else if (data == -1) {
          alert("결제데이터가 없습니다!");
        } else if (data == 1) {
          alert("결제가 모두 완료된 상태입니다!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //navigate(`/checkoutall`);
  };

  useEffect(() => {}, []);

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

          {matchedPlanner.length !== 0 ? (
            matchedKeyIndex.map((keyIndex) => {
              return (
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
                      -견적서{estimateNum[keyIndex]}-
                    </div>
                    <p
                      className="myPlannerName"
                      style={{
                        fontSize: "1.6em",
                        marginLeft: "100px",
                        marginRight: "-70px",
                      }}
                    >
                      {matchedPlanner[keyIndex]}
                    </p>
                    <button className="plannerProBtn">프로필 보기</button>
                    <br />
                    <div className="matchingBtnList">
                      <button
                        className="plannerMatchingBtn"
                        data-bs-estimateNum={estimateNum[keyIndex]}
                        onClick={goPay}
                      >
                        결제하기
                      </button>
                      <button
                        className="plannerMatchingBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#CancelMatching"
                        data-bs-estimateNum={estimateNum[keyIndex]}
                        onClick={CancelMatching2}
                      >
                        매칭취소
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
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
                    onClick={CancelMatching3}
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
                data-bs-target="#CancelMatchingCustomer"
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
                  <button className="plannerMatchingBtn">견적서보기</button>
                </td>
                <td>
                  <button
                    className="plannerMatchingBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#MatchOrCanelCustomer"
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
          {/* 고객 모달창(매칭취소) */}
          <div
            className="modal fade"
            id="CancelMatchingCustomer"
            tabindex="-1"
            aria-labelledby="CancelMatchingCustomer"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-2"
                    id="CancelMatchingCustomer"
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
                  매칭을 취소하실경우 해당 고객과의 매칭이 거부됩니다.
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
          {/* 고객 모달창(매칭취소) */}
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
          {/* 고객과의 매칭/거절 모달창 */}
          <div
            className="modal fade"
            id="MatchOrCanelCustomer"
            tabindex="-1"
            aria-labelledby="MatchOrCanelCustomer"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-2"
                    id="MatchOrCanelCustomer"
                    style={{ fontSize: "1.6em" }}
                  >
                    해당 고객과 매칭하시겠습니까?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ fontSize: "1.5em" }}>
                  매칭시 해당 고객에게 매칭 메시지가 전송 됩니다.
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
          {/* 고객과의 매칭/거절 모달창 */}
        </div>
      )}
    </div>
  );
}

export default Matching;
