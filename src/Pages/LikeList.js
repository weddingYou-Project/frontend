import "../Css/main.css";
import "../Css/Home.css";
import "../Css/LikeList.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LikeList() {
  const [selectedItem, setSelectedItem] = useState("카테고리"); // 초기 버튼명 설정
  const [selectedSort, setSelectedSort] = useState("정렬"); // 초기 버튼명 설정

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item); // 선택한 아이템으로 버튼명 변경
  };

  const handleSortClick = (sort) => {
    setSelectedSort(sort); // 선택한 정렬로 버튼명 변경
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={"찜목록"} />
      <div className="filter">
        <div class="dropdown margin left">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedItem}
          </button>
          <ul class="dropdown-menu">
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleItemClick("전체")}
              >
                전체
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleItemClick("웨딩홀")}
              >
                웨딩홀
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleItemClick("스튜디오")}
              >
                스튜디오
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleItemClick("의상")}
              >
                의상
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleItemClick("메이크업")}
              >
                메이크업
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleItemClick("신혼여행")}
              >
                신혼여행
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleItemClick("부케")}
              >
                부케
              </button>
            </li>
          </ul>
        </div>
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
                onClick={() => handleSortClick("가나다순")}
              >
                가나다순
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleSortClick("인기순")}
              >
                인기순
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => handleSortClick("지역순")}
              >
                지역순
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="Likecontent">
        <div class="container text-center">
          <div class="row row-cols-2">
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/website/brandplus/1663828102.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/website/brandplus/1663828179.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/website/brandplus/1670307028.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/website/brandplus/1681797008.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="http://ifamily.co.kr/image/icard/242516/icard_sm_242516"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_2146_1674021540_85005600_3232256098.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17899_1680240930_80728900_3232256100.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_10585_1666061021_36682900_3232256100.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17466_1669598578_99049200_3232256099.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17127_1668576642_85590400_3232256098.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17986_1682324127_28953000_3232256099.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card margT">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17910_1680587270_66029500_3232256099.png"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div style={{ height: 94.19 }}></div>
      <div className="button-container">
        <button
          className="probutton"
          onClick={() => {
            navigate("/estimateform");
          }}
        >
          견적작성
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default LikeList;
