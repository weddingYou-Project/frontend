import "../Css/main.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { useState } from "react";

function Review() {
  const [selectedSort, setSelectedSort] = useState("정렬"); // 초기 버튼명 설정

  const handleSortClick = (sort) => {
    setSelectedSort(sort); // 선택한 정렬로 버튼명 변경
  };

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
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">이용후기 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">4/5</p>
              </td>
              <td>
                <p className="noticeTxtCenter">1</p>
              </td>
              <td>
                <p className="noticeTxtCenter">52</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">이용후기 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">3/5</p>
              </td>
              <td>
                <p className="noticeTxtCenter">3</p>
              </td>
              <td>
                <p className="noticeTxtCenter">62</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">이용후기 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">2/5</p>
              </td>
              <td>
                <p className="noticeTxtCenter">5</p>
              </td>
              <td>
                <p className="noticeTxtCenter">37</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">이용후기 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">3/5</p>
              </td>
              <td>
                <p className="noticeTxtCenter">2</p>
              </td>
              <td>
                <p className="noticeTxtCenter">84</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">이용후기 TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">4/5</p>
              </td>
              <td>
                <p className="noticeTxtCenter">6</p>
              </td>
              <td>
                <p className="noticeTxtCenter">36</p>
              </td>
            </tr>
          </tbody>
        </tabel>
      </div>
      <button className="writeBtn">글쓰기</button>
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default Review;
