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
              marginBottom: "10px",
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
          <button class="btn-colour-1" style={{ marginTop: "50px" }}>
            견적요청
          </button>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default PlannerProfileDetail;
