import "../Css/main.css";
import "../Css/Home.css";
import Footer from "../Components/Footer";
import imgLogo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function SearchItems() {
  const navigate = useNavigate();

  return (
    <div className="mainlayout">
      <div className="header">
        <img className="mainlogo" src={imgLogo} alt="로고" />
        <input
          type="text"
          name="search"
          className="searchbar"
          placeholder="{검색어}"
        />
        <div
          className="likeListBtn"
          onClick={() => {
            navigate("/likeList");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-heart likeicon"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </div>
      </div>
      <div className="NavBar">
        <nav id="navbar-example2" class="navbar bg-light px-3 mb-3">
          <ul class="nav sortingList">
            <li class="nav-item">
              <a class="nav-link" href="#scrollspyHeading1">
                웨딩홀
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#scrollspyHeading2">
                스튜디오
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#scrollspyHeading3">
                의상
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#scrollspyHeading4">
                메이크업
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#scrollspyHeading5">
                신혼여행
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#scrollspyHeading6">
                부케
              </a>
            </li>
          </ul>
        </nav>
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          class="scrollspy-example bg-light p-3 rounded-2"
          tabindex="0"
        >
          <h4 id="scrollspyHeading1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;Wedding Hole&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </h4>
          <br />
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={-30}
          >
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1670307028.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1681797008.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1679360660.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1670307028.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1681797008.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1679360660.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
          </Swiper>
          <hr />
          <h4 id="scrollspyHeading2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;Studio&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </h4>
          <br />
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={-30}
          >
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1663828102.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1663828179.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="http://ifamily.co.kr/image/icard/242516/icard_sm_242516"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1663828102.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/website/brandplus/1663828179.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="http://ifamily.co.kr/image/icard/242516/icard_sm_242516"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
          </Swiper>
          <hr />
          <h4 id="scrollspyHeading3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;Clothes&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </h4>
          <br />
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={-30}
          >
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17950_1681285801_41548700_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_2146_1674021540_85005600_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_4796_1679476532_21876000_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17950_1681285801_41548700_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_2146_1674021540_85005600_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_4796_1679476532_21876000_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
            <br />
          </Swiper>

          <hr />
          <h4 id="scrollspyHeading4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;Make Up&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </h4>
          <br />
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={-30}
          >
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17899_1680240930_80728900_3232256100.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17887_1680057964_58033100_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_10585_1666061021_36682900_3232256100.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17899_1680240930_80728900_3232256100.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17887_1680057964_58033100_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_10585_1666061021_36682900_3232256100.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
            <br />
          </Swiper>

          <hr />
          <h4 id="scrollspyHeading5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;Honey Moon&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </h4>
          <br />
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={-30}
          >
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17466_1669598578_99049200_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17444_1669461045_65305200_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17127_1668576642_85590400_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17466_1669598578_99049200_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17444_1669461045_65305200_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17127_1668576642_85590400_3232256098.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
            <br />
          </Swiper>

          <hr />
          <h4 id="scrollspyHeading6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
            &nbsp;Bouquet&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </h4>
          <br />
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={-30}
          >
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17986_1682324127_28953000_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17910_1680587270_66029500_3232256099.png"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17907_1680587156_29324700_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17986_1682324127_28953000_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17910_1680587270_66029500_3232256099.png"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.iwedding.co.kr/center/iweddingb/product/500_17907_1680587156_29324700_3232256099.jpg"
                class="d-block w-75 center"
                alt="..."
              />
              <br />
              <div className="itemName">(이름) (좋아요수)</div>
            </SwiperSlide>
            <br />
            <br />
          </Swiper>
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

export default SearchItems;
