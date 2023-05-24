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
  const [introduction, setIntroduction] = useState("");

  useEffect(() => {
    //플래너이름, 플래너 프로필 사진, 리뷰개수, 별점, 매칭수, 소개글 불러오기
  }, []);

  return (
    <div className="mainlayout">
      <NavigationBar title={`${plannerName}의 프로필`} />
      <br />

      <div
        class="container text-center"
        style={{ marginTop: "100px", minHeight: "100vh" }}
      >
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
        <div>
          <div
            style={{
              display: "flex",
              width: "100px",
              fontSize: "1.8em",
              justifyContent: "start",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            자기소개
          </div>
          <textarea
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              fontSize: "1.4em",
            }}
            name=""
            id=""
            cols="45"
            rows="6"
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
              marginBottom: "10px",
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
          <textarea
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              fontSize: "1.4em",
              border: "1px solid grey",
              height: "180px",
              width: "500px",
              margin: "0 auto",
            }}
            name=""
            id=""
            cols="45"
            rows="6"
            placeholder=" 김00 - 별점 4.5/5.0 
        이00 - 별점 3.0/5.0"
            value={introduction}
            disabled
          ></textarea>
        </div>
        <button class="btn-colour-1" style={{ marginTop: "50px" }}>
          견적요청
        </button>
      </div>
    </div>
  );
}

export default PlannerProfileDetail;
