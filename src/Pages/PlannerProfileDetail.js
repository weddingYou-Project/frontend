import "../Css/main.css";
import "../Css/Home.css";
import "../Css/LikeList.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Animation from "../Components/Animation";
import axios from "axios";

function PlannerProfileDetail() {
  const [previewImg, setPreviewImg] = useState([]);

  //const [plannerYears, setPlannerYears] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [matchingCount, setMatchingCount] = useState(0);
  const [introduction, setIntroduction] = useState("");
  const [avgReviewStars, setAvgReviewStars] = useState(0);
  const [reviewStars, setReviewStars] = useState([]);
  const [reviewUsers, setReviewUsers] = useState([]);
  const [portfolio, setPortfolio] = useState("아직 포트폴리오가 없습니다!");
  const [portfolioIndex, setPortfolioIndex] = useState([]);
  const [plannerYears, setPlannerYears] = useState("");

  const { plannerEmail } = useLocation().state;
  console.log(plannerEmail);
  const { plannerName } = useLocation().state;
  const { plannerImg } = useLocation().state;

  let [estimateId, setEstimateId] = useState([]);
  let [estimateData, SetEstimateData] = useState();
  let [images, setImages] = useState([]);
  const [estimateIndex, setEstimateIndex] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectEstimateId, setSelectEstimateId] = useState(0);
  const [existEstimates, setExistEstimates] = useState(true);
  const [selected, setSelected] = useState(false);
  const [finish, setFinish] = useState(false);
  const [userMatching, setUserMatching] = useState(null);

  const navigate = useNavigate();
  const goMatch = () => {
    navigate(`/estimateform`);
  };

  const fetchData = async (selectedEstimateId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/estimate/getdetail/${selectedEstimateId}`
      );
      const { data } = response;
      console.log(data);
      SetEstimateData(data);
      if (data.userMatching === null) {
        setUserMatching(null);
      } else {
        setUserMatching(JSON.parse(data.userMatching));
      }
      // 이미지 데이터 가져오기
      const imagearray = JSON.parse(data.img);
      const imagePromises = imagearray.map((image) => {
        return axios.get("http://localhost:8080/estimate/imageview", {
          params: { image },
          responseType: "blob",
        });
      });
      const responses = await Promise.all(imagePromises);
      const imageUrls = responses.map((res) => {
        const resdata = URL.createObjectURL(res.data);
        return resdata;
      });
      setImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //플래너이름, 플래너 프로필 사진, 리뷰개수, 별점, 매칭수, 소개글 불러오기

    const formData = new FormData();
    formData.append("plannerEmail", plannerEmail);
    axios
      .post(`/plannerProfile/getProfileDetail`, formData)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const reviewStarsArr = [];
        const reviewUsersArr = [];
        const reviewUserIndex = [];
        const reviewStarsIndex = [];
        const portfolioDataArr = [];
        const portfolioIndexArr = [];
        for (let i = 0; i < data.length; i++) {
          setReviewCount(data[i]);
          i++;
          setAvgReviewStars(data[i]);
          i++;
          setIntroduction(data[i]);
          i++;
          setMatchingCount(data[i]);
          i++;

          const reviewUsersData = data[i].slice(1, data[i].length - 1);
          const arr = reviewUsersData.split(",");

          const Userlength = arr.length;
          for (let j = 0; j < Userlength; j++) {
            reviewUserIndex.push(j);
            reviewUsersArr.push(arr[j]);
          }
          setReviewUsers(arr);
          console.log(arr);
          i++;

          const reviewStarsData = data[i].slice(1, data[i].length - 1);

          const arr2 = reviewStarsData.split(",");
          const starsLength = arr2.length;
          for (let k = 0; k < starsLength; k++) {
            reviewStarsIndex.push(k);
            reviewStarsArr.push(arr2[k]);
          }
          setReviewStars(arr2);
          console.log(arr2);
          i++;
          setPlannerYears(data[i]);
        }
        console.log(reviewStarsArr);
        if (reviewStarsArr[0] !== "") {
          for (let m = 0; m < reviewStarsArr.length; m++) {
            const portfolioData = `${reviewUsersArr[m]} - ${reviewStarsArr[m]}점\n`;

            portfolioDataArr.push(portfolioData);
            portfolioIndexArr.push(m);
            console.log(portfolioData);
          }
          setPortfolio(portfolioDataArr);

          setPortfolioIndex(portfolioIndexArr);
          console.log(portfolioDataArr);
        } else {
          console.log("aaa");
          setPortfolioIndex([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    let estimateIdArr = [];
    const formData = new FormData();
    formData.append("userEmail", sessionStorage.getItem("email"));
    axios
      .post(`/plannerProfile/getUnmatchedEstimates`, formData)
      .then((res) => {
        console.log("data:++++++++++++++" + res.data);
        console.log(res.data);
        let indexArr = [];
        if (res.data.length !== 0) {
          const data = res.data;
          for (let i = 0; i < data.length; i++) {
            estimateIdArr.push(data[i]);
            indexArr.push(i);
          }
          setEstimateId(estimateIdArr);
          setEstimateIndex(indexArr);
          setSelectEstimateId(estimateIdArr[0]);
          console.log(estimateIdArr[0]);
          const defaultEstimateId = estimateIdArr[0];
          const fetchData1 = async () => {
            try {
              const response = await axios.get(
                `http://localhost:8080/estimate/getdetail/${defaultEstimateId}`
              );
              const { data } = response;
              console.log(data);
              SetEstimateData(data);
              if (data.userMatching === null) {
                setUserMatching(null);
              } else {
                setUserMatching(JSON.parse(data.userMatching));
              }
              // 이미지 데이터 가져오기
              const imagearray = JSON.parse(data.img);
              const imagePromises = imagearray.map((image) => {
                return axios.get("http://localhost:8080/estimate/imageview", {
                  params: { image },
                  responseType: "blob",
                });
              });
              const responses = await Promise.all(imagePromises);
              const imageUrls = responses.map((res) => {
                const resdata = URL.createObjectURL(res.data);
                return resdata;
              });
              setImages(imageUrls);
              setFinish(true);
            } catch (error) {
              console.log(error);
            }
          };
          fetchData1();
        } else {
          setExistEstimates(false);
          setFinish(true);
        }
      });
  }, []);

  const goChooseEstimate = (e) => {
    const estimateId = selectEstimateId;

    if (userMatching === null) {
      let userEmail = [plannerEmail];
      console.log(userEmail);
      let formData = new FormData();
      formData.append("estimateId", estimateId);
      formData.append("usermatching", JSON.stringify(userEmail));
      axios
        .post(`/plannerProfile/insert/matchingUser`, formData)
        .then((res) => {
          console.log(res);
          alert("매칭 신청되었습니다!");
        })
        .catch((e) => {
          console.log(e);
          if (e.response.data.message === "중복됩니다!") {
            alert("이미 매칭 신청한 플래너입니다!");
          }
        });
    } else {
      const addPlannerEmail = plannerEmail;
      if (!userMatching.includes(addPlannerEmail)) {
        let formData = new FormData();
        formData.append("estimateId", estimateId);
        formData.append(
          "usermatching",
          JSON.stringify([...userMatching, addPlannerEmail])
        );
        axios
          .post(`/plannerProfile/insert/matchingUser`, formData)
          .then((res) => {
            console.log(res);
            alert("매칭 신청되었습니다!");
          })
          .catch((e) => {
            console.log(e);

            if (e.response.data.message === "중복됩니다!") {
              alert("이미 매칭 신청한 플래너입니다!");
            }
          });
      } else {
        alert("이미 매칭 신청한 플래너입니다!");
      }
    }
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={`${plannerName}의 프로필`} />
      <br />
      <div
        class="container text-center"
        style={{
          marginTop: "100px",
          minHeight: "100vh",
          marginBottom: "100px",
        }}
      >
        <div
          style={{
            marginRight: "8px",
          }}
        ></div>
        <div style={{ marginTop: "20px", display: "flex", width: "100%" }}>
          <img
            src={plannerImg}
            alt=""
            style={{
              width: "280px",
              height: "280px",
              marginLeft: "20px",
            }}
          />
          <div
            style={{ display: "flex", width: "200px", flexDirection: "column" }}
          >
            <div
              style={{
                fontSize: "1.8em",
                marginLeft: "30px",
                display: "inline-block",
                width: "130px",
                height: "60px",
                marginTop: "40px",
              }}
            >
              {plannerName}
            </div>
            <div
              style={{
                fontSize: "1.6em",
                marginLeft: "30px",
                display: "inline-block",
                width: "130px",
                height: "60px",
              }}
            >
              리뷰 개수 : {reviewCount} 평균 별점 : {avgReviewStars} 경력 :{" "}
              {plannerYears}
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "100px",
              fontSize: "1.8em",
              justifyContent: "start",
              marginLeft: "20px",
              marginTop: "13px",
            }}
          >
            자기소개
          </div>
          <textarea
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              fontSize: "1.4em",
              backgroundColor: "#ebecf0",
              paddingTop: "20px",
              paddingLeft: "25px",
              paddingBottom: "20px",
              paddingRight: "20px",
            }}
            name=""
            id=""
            cols="41"
            rows="8"
            placeholder="아직 자기소개가 없습니다!"
            value={introduction}
            disabled
          ></textarea>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "120px",
              fontSize: "1.8em",
              justifyContent: "start",
              marginLeft: "20px",
              marginTop: "20px",
              marginBottom: "-10px",
              overflowY: "scroll",
            }}
          >
            포트폴리오
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              fontSize: "1.4em",
              marginRight: "30px",
            }}
          >
            총 매칭수 : {matchingCount}
          </div>

          <div
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              fontSize: "1.4em",
              border: "1px solid grey",
              height: "180px",
              width: "500px",
              margin: "0 auto",
              backgroundColor: "#ebecf0",
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingBottom: "20px",
              paddingRight: "20px",
              overflowY: "scroll",
            }}
          >
            <div style={{ fontSize: "1.1em" }}>
              {portfolioIndex.length === 0 ? (
                <div
                  style={{
                    fontSize: "0.9em",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  아직 포트폴리오가 없습니다!
                </div>
              ) : (
                portfolioIndex.map((index) => {
                  return (
                    <div style={{ display: "flex", justifyContent: "start" }}>
                      {portfolio[index]}
                      <br />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {sessionStorage.getItem("category") === "user" ? (
          existEstimates ? (
            <button
              class="btn-colour-1 "
              data-bs-toggle="modal"
              data-bs-target="#chooseEstimate"
              onClick={() => {
                setSelected(true);
              }}
              style={{ marginTop: "50px" }}
            >
              견적요청
            </button>
          ) : (
            <button
              class="btn-colour-1 "
              onClick={goMatch}
              style={{ marginTop: "50px" }}
            >
              견적요청
            </button>
          )
        ) : null}
      </div>
      <Footer />
      {/* 견적서 선택 모달창 */}
      <div
        class="modal fade"
        id="chooseEstimate"
        tabindex="-1"
        aria-labelledby="chooseEstimate"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          style={{ width: "800px" }}
        >
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title justify-content-center "
                id="chooseEstimate"
                style={{ fontSize: "1.9em" }}
              >
                견적서 선택하기
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                alginItems: "center",
                displayContent: "center",
                height: "100%",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "480px",
                }}
              >
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  style={{ width: "460px" }}
                  onChange={(e) => {
                    console.log(e);
                    console.log(e.target.value);
                    setSelectIndex(e.target.value);
                    const index = e.target.value;
                    setSelectEstimateId(estimateId[index]);
                    fetchData(estimateId[index]);
                  }}
                >
                  {estimateIndex.map((index) => {
                    return <option value={index}>견적서{index + 1}</option>;
                  })}
                </select>

                <div
                  style={{
                    fontSize: "1.5em",
                    padding: "10px",
                  }}
                >
                  견적서 상세정보
                </div>
                <p
                  style={{
                    fontSize: "1.3em",
                    width: "550px",

                    marginLeft: "-35px",
                    marginTop: "-100px",
                  }}
                >
                  {console.log(estimateData)}
                  {finish === true ? (
                    <div className="contentcontainer-detail">
                      <div className="contentbox-detail">
                        <h5 onClick={() => {}}>희망 결혼 예정일</h5>
                        {JSON.parse(estimateData?.weddingdate).map(
                          (e, index) => {
                            return (
                              <div className="choosebox-detail">
                                {e === "" ? (
                                  <></>
                                ) : (
                                  <>
                                    <div>{index + 1}순위</div>
                                    <div className="result-detail">{e}</div>
                                  </>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="contentbox-detail">
                        <h5>희망 결혼 지역</h5>
                        {JSON.parse(estimateData?.region).map((e, index) => {
                          return (
                            <div className="choosebox-detail">
                              {e === "" ? (
                                <></>
                              ) : (
                                <>
                                  <div>{index + 1}순위</div>
                                  <div className="result-detail">{e}</div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="contentbox-detail">
                        <h5>예산 한도</h5>
                        <div
                          className="choosebox-detail"
                          style={{ width: "150px" }}
                        >
                          <div className="result-detail">
                            {estimateData?.budget.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                      <div className="contentbox-detail">
                        <h5>희망 스튜디오 스타일</h5>
                        <div className="choosebox-detail">
                          <div className="result-detail">
                            {estimateData?.studio}
                          </div>
                        </div>
                      </div>

                      <div className="contentbox-detail">
                        <h5>신부 드레스 스타일</h5>
                        {estimateData?.dress === "[]" && (
                          <div className="choosebox-detail">
                            <div className="result-noneChoose">
                              *선택사항 없음*
                            </div>
                          </div>
                        )}
                        {JSON.parse(estimateData?.dress).map((e, index) => {
                          return (
                            <div className="choosebox-detail">
                              {e === "" ? (
                                <></>
                              ) : (
                                <>
                                  <div>{index + 1}순위</div>
                                  <div className="result-detail">{e}</div>
                                </>
                              )}
                            </div>
                          );
                        })}
                        <div></div>
                      </div>
                      <div className="contentbox-detail">
                        <h5>신부 메이크업 스타일</h5>
                        {estimateData?.dress === "[]" && (
                          <div className="choosebox-detail">
                            <div className="result-noneChoose">
                              *선택사항 없음*
                            </div>
                          </div>
                        )}
                        {JSON.parse(estimateData?.makeup).map((e, index) => {
                          return (
                            <div className="choosebox-detail">
                              {e === "" ? (
                                <></>
                              ) : (
                                <>
                                  <div>{index + 1}순위</div>
                                  <div className="result-detail">{e}</div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="contentbox-detail">
                        <h5>희망 신혼여행지</h5>
                        <div className="choosebox-detail">
                          {estimateData?.honeymoon === "" && (
                            <div className="result-noneChoose">
                              *선택사항 없음*
                            </div>
                          )}
                          {estimateData?.honeymoon !== "" && (
                            <div className="result-detail">
                              {estimateData?.honeymoon.slice(3)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="contentbox-detail">
                        {images.length === 0 ? (
                          <h5>고객 첨부이미지 </h5>
                        ) : (
                          <h5 style={{ marginTop: "-20px" }}>
                            고객 첨부이미지{" "}
                          </h5>
                        )}

                        {images.length === 0 && (
                          <span>첨부 이미지가 없습니다.</span>
                        )}
                        <br></br>
                        <div>
                          {images.map((e, index) => {
                            return (
                              <div key={index}>
                                <>
                                  <img
                                    src={e}
                                    width="100%"
                                    height="40%"
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      marginBottom: "20px",
                                      marginTop: "-15px",
                                      marginLeft: "-5px",
                                    }}
                                    alt=""
                                  />
                                </>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div
                        className="contentbox-detail"
                        style={{ borderBottom: "none", marginTop: "10px" }}
                      >
                        <h5>고객 요청사항</h5>
                        <div
                          className="choosebox-detail w-100"
                          style={{ color: "black" }}
                        >
                          {estimateData?.requirement === "" && (
                            <span>고객요청사항이 없습니다.</span>
                          )}
                          {estimateData?.requirement}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={goChooseEstimate}
              >
                선택
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
      {/*견적서 선택  모달창  */}
    </div>
  );
}
const ImagesView = ({ images, index }) => {
  return (
    <div
      class="modal fade"
      id={index}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style={{ maxWidth: "800px" }}>
        <div className="image-actualsize">
          <img src={images} />
        </div>
      </div>
    </div>
  );
};

export default PlannerProfileDetail;
