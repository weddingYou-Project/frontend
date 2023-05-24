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

function PlannerProfileDetail() {
  const [previewImg, setPreviewImg] = useState([]);
  const [plannerName, setPlannerName] = useState("");
  const [plannerYears, setPlannerYears] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [matchingCount, setMatchingCount] = useState(0);

  useEffect(() => {
    //플래너이름, 플래너 프로필 사진, 리뷰개수, 별점, 매칭수, 소개글 불러오기
  }, []);

  return (
    <div className="mainlayout">
      <NavigationBar title={`${plannerName}의 프로필`} />
      <br />

      <div class="container text-center" style={{ marginTop: "100px" }}>
        <div
          style={{
            marginRight: "8px",
          }}
        ></div>
        <div style={{ marginTop: "20px", display: "flex", width: "100%" }}>
          <img
            src={Loadingimg1}
            alt=""
            style={{
              width: "250px",
              height: "300px",
              marginLeft: "50px",
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
              }}
            >
              planner1
            </div>
            <div
              style={{
                fontSize: "1.8em",
                marginLeft: "30px",
                display: "inline-block",
                width: "130px",
                height: "60px",
              }}
            >
              리뷰 개수/ 평균 별점
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlannerProfileDetail;
