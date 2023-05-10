import "../Css/main.css";
import "../Css/Home.css";
import "../Css/LikeList.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function LikeList() {
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
        <div class="dropdown  right">
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
                가나다순
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                인기순
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
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
              <div class="card">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17466_1669598578_99049200_3232256099.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름 과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17444_1669461045_65305200_3232256099.jpg"
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
          <div class="row row-cols-2">
            <div class="col">
              <div class="card">
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
              <div class="card">
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
          </div>
          <br />
          <div class="row row-cols-2">
            <div class="col">
              <div class="card">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17466_1669598578_99049200_3232256099.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름 과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17444_1669461045_65305200_3232256099.jpg"
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
          <div class="row row-cols-2">
            <div class="col">
              <div class="card">
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
              <div class="card">
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
          </div>
          <br />
          <div class="row row-cols-2">
            <div class="col">
              <div class="card">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17466_1669598578_99049200_3232256099.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">이름 과 좋아요개수, 버튼</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17444_1669461045_65305200_3232256099.jpg"
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
          <div class="row row-cols-2">
            <div class="col">
              <div class="card">
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
              <div class="card">
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
          </div>
          <br />
        </div>
      </div>
      <div style={{ height: 94.19 }}></div>
      <div className="button-container">
        <button className="probutton">견적작성</button>
      </div>
      <Footer />
    </div>
  );
}

export default LikeList;
