import "../Css/main.css";
import "../Css/Home.css";
import "../Css/LikeList.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Animation from "../Components/Animation";
import axios from "axios";
import defaultprofileimage from "../Assets/defaultprofileimage.jpg";

function PlannerProfile() {
  const [profileImg, setProfileImg] = useState([]);
  const [plannerName, setPlannerName] = useState([]);
  const [plannerEmail, setPlannerEmail] = useState([]);
  const [plannerYears, setPlannerYears] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [matchingCount, setMatchingCount] = useState(0);
  const [keyIndex, setKeyIndex] = useState([]);
  // const [selectedPlannerEmail, setSelectedPlannerEmail] = useState("");

  const [selectedSort, setSelectedSort] = useState("정렬"); // 초기 버튼명 설정
  const navigate = useNavigate();

  const handleSortClick = (sort) => {
    setSelectedSort(sort); // 선택한 정렬로 버튼명 변경
  };

  const goProfileDetail = (e) => {
    const selectedPlannerEmail = e.target.dataset.bsPlanneremail;
    navigate(`/plannerprofiledetail`, {
      state: { plannerEmail: selectedPlannerEmail },
    });
  };

  useEffect(() => {
    axios
      .post(`/plannerProfile/getProfiles1`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .post(`/plannerProfile/getProfiles2`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (data.length !== 0) {
          let profileImgArr = [];
          let plannerNameArr = [];
          let plannerEmailArr = [];
          let keyIndexArr = [];
          for (let i = 0; i < data.length; i++) {
            if (i % 3 === 0) {
              if (data[i] === "null") {
                profileImgArr.push(defaultprofileimage);
              } else {
                let img = "data:image/jpeg;base64," + data[i];
                profileImgArr.push(img);
              }

              const index = i / 3;
              keyIndexArr.push(index);
              console.log(keyIndexArr);
            } else if (i % 3 === 1) {
              plannerNameArr.push(data[i]);
            } else if (i % 3 === 2) {
              plannerEmailArr.push(data[i]);
            }
          }
          setKeyIndex(keyIndexArr);
          setProfileImg(profileImgArr);
          setPlannerName(plannerNameArr);
          setPlannerEmail(plannerEmailArr);
        } else {
          setKeyIndex([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="mainlayout">
      <NavigationBar title={"플래너 프로필"} />
      <br />
      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "50px" }}
      >
        <div class="dropdown  right-sort" style={{ marginRight: "50px" }}>
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedSort}
          </button>
          <ul class="dropdown-menu sortItem">
            <li className="">
              <button
                class="dropdown-item "
                type="button"
                onClick={() => handleSortClick("별점 높은 순")}
              >
                별점 높은 순
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleSortClick("후기순")}
              >
                후기순
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleSortClick("경력순")}
              >
                경력순
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleSortClick("매칭순")}
              >
                매칭순
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="container text-center" style={{ marginTop: "-10px" }}>
        <div
          style={{
            marginRight: "8px",
          }}
        ></div>
        <div class="container text-center">
          <div class="row row-cols-2">
            {/* 이미지카드 */}
            {keyIndex.length === 0 ? (
              <div
                class="text-start"
                style={{
                  marginLeft: "10px",
                  fontSize: "1.5em",
                  marginTop: "40px",
                }}
              >
                결과가 없습니다.
              </div>
            ) : (
              keyIndex.map((i) => (
                <div class="col">
                  <div class="card margT">
                    <img
                      style={{ height: "230px", cursor: "pointer" }}
                      src={profileImg[i]}
                      class="card-img-top"
                      alt="..."
                      data-bs-plannerEmail={plannerEmail[i]}
                      onClick={goProfileDetail}
                    />
                    <div class="card-body">
                      <p class="card-text">{plannerName[i]} &nbsp;&nbsp;</p>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* 이미지카드 */}
          </div>
          <br />
          <div style={{ marginBottom: "100px" }}></div>
        </div>
        {/* <div class="row" style={{ marginTop: "20px" }}>
          <div class="col">
            <img
              // src={Loadingimg1}
              alt=""
              style={{
                width: "200px",
                height: "300px",
                marginLeft: "30px",
                cursor: "pointer",
              }}
              onClick={goProfileDetail}
            />
            <div style={{ fontSize: "1.8em", marginLeft: "30px" }}>
              planner1
            </div>
          </div>
          <div class="col" style={{ fontSize: "1.8em", marginLeft: "30px" }}>
            <img
              // src={Loadingimg1}
              alt=""
              style={{
                width: "200px",
                height: "300px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            />
            <div>planner2</div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default PlannerProfile;
