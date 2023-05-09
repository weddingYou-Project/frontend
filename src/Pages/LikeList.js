import "../Css/main.css";
import "../Css/Home.css";
import "../Css/LikeList.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function LikeList() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"🤍 찜목록 🤍"} />
      <div className="filter">
        <div class="dropdown margin left">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            카테고리
          </button>
          <ul class="dropdown-menu">
            <li>
              <button class="dropdown-item" type="button">
                웨딩홀
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                스튜디오
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                의상
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                메이크업
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                신혼여행
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                부케
              </button>
            </li>
          </ul>
        </div>
        {/* <div class="dropdown  right">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            정렬
          </button>
          <ul class="dropdown-menu sortItem">
            <li className="">
              <button class="dropdown-item " type="button">
                최신순
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                가나다순
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                인기순
              </button>
            </li>
          </ul>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default LikeList;
