import "../Css/main.css";
import "../Css/Home.css";
import "../Css/LikeList.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Animation from "../Components/Animation";
import Loadingimg1 from "../Assets/loading img1.jpg";
import axios from "axios";

function PlannerProfile() {
  const [previewImg, setPreviewImg] = useState([]);
  const [plannerName, setPlannerName] = useState("");
  const [plannerYears, setPlannerYears] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [matchingCount, setMatchingCount] = useState(0);

  const [selectedSort, setSelectedSort] = useState("정렬"); // 초기 버튼명 설정
  const navigate = useNavigate();

  const handleSortClick = (sort) => {
    setSelectedSort(sort); // 선택한 정렬로 버튼명 변경
  };

  const goProfileDetail = () => {
    navigate(`/plannerprofiledetail`);
  };
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
      <div class="container text-center" style={{ marginTop: "10px" }}>
        <div
          style={{
            marginRight: "8px",
          }}
        ></div>
        <div class="row" style={{ marginTop: "20px" }}>
          <div class="col">
            <img
              src={Loadingimg1}
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
              src={Loadingimg1}
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
        </div>
      </div>
    </div>
  );
}

export default PlannerProfile;
