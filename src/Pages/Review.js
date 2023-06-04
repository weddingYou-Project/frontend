import "../Css/main.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Review() {
  const [selectedSort, setSelectedSort] = useState("정렬"); // 초기 버튼명 설정
  const [reviewTitle, setReviewTitle] = useState([]);
  const [reviewStars, setReviewStars] = useState([]);
  const [reviewComments, setReviewComments] = useState([]);
  const [reviewViews, setReviewViews] = useState([]);
  const [estimateIds, setEstimatesIds] = useState([]);
  const [reviewIndex, setReviewIndex] = useState([]);

  const navigate = useNavigate();
  const handleSortClick = (sort) => {
    setSelectedSort(sort); // 선택한 정렬로 버튼명 변경
  };

  useEffect(() => {
    axios
      .get(`/getreviewslist`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        const reviewTitleArr = [];
        const reviewStarsArr = [];
        const reviewCommentsArr = [];
        const reviewViewsArr = [];
        const estimateIdArr = [];
        const reviewIndexArr = [];
        for (let i = 0; i < data.length; i++) {
          reviewTitleArr.push(data[i].reviewTitle);
          reviewStarsArr.push(data[i].reviewStars);
          reviewCommentsArr.push(data[i].comments.length);
          reviewViewsArr.push(data[i].reviewCounts);
          estimateIdArr.push(data[i].estimateId);
          reviewIndexArr.push(i);
        }
        setReviewTitle(reviewTitleArr);
        setReviewStars(reviewStarsArr);
        setReviewComments(reviewCommentsArr);
        setReviewViews(reviewViewsArr);
        setEstimatesIds(estimateIdArr);
        setReviewIndex(reviewIndexArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="mainlayout">
      <NavigationBar title={"이용후기"} />{" "}
      <div style={{ marginTop: 75 }}>
        <div class="dropdown  right-sort">
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
                onClick={() => handleSortClick("별점순")}
              >
                별점순
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleSortClick("댓글순")}
              >
                댓글순
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleSortClick("조회순")}
              >
                조회순
              </button>
            </li>
            <li className="">
              <button
                class="dropdown-item "
                type="button"
                onClick={() => handleSortClick("최신순")}
              >
                최신순
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="noticeSection">
        <tabel>
          <thead>
            <tr>
              <td style={{ width: 350 }}>
                <p className="noticeTxt">제목</p>
              </td>
              <td style={{ width: 60 }}>
                <p className="noticeTxtCenter">별점</p>
              </td>
              <td style={{ width: 80 }}>
                <p className="noticeTxtCenter">댓글</p>
              </td>
              <td style={{ width: 80 }}>
                <p className="noticeTxtCenter">조회수</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {reviewIndex.map((index) => {
              return (
                <tr
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    axios
                      .put(`/reviewcount/${estimateIds[index]}`)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                    navigate(`/review/detail`, {
                      state: { estimateId: estimateIds[index] },
                    });
                  }}
                >
                  <td
                    style={{
                      height: 50,
                      fontSize: "1.5em",
                      paddingLeft: "20px",
                    }}
                  >
                    {reviewTitle[index]}
                  </td>
                  <td>
                    <p className="noticeTxtCenter">{reviewStars[index]}/5</p>
                  </td>
                  <td>
                    <p className="noticeTxtCenter">{reviewComments[index]}</p>
                  </td>
                  <td>
                    <p className="noticeTxtCenter">{reviewViews[index]}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </tabel>
      </div>
      <Link to="/rating">
        <button className="writeBtn">글쓰기</button>
      </Link>
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default Review;
