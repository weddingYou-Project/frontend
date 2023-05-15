import "../Css/main.css";
import "../Css/Home.css";
import Footer from "../Components/Footer";
import imgLogo from "../Assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function SearchItems() {
  const navigate = useNavigate();

  const { keyword } = useLocation().state;

  const [searchedKeyword, setSearchedKeyWord] = useState(keyword);
  // console.log(keyword);
  const [previewImg, setPreviewImg] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemLike, setItemLike] = useState([]);
  const [keyIndex, setKeyIndex] = useState([]);
  const [likeState, setLikeState] = useState([]);
  let keyIndexArr = [];
  let list = [];
  let itemDataArr = [];
  let previewImgArr = [];
  let likeIndexArr = [];

  const [studioImg, setStudioImg] = useState([]);
  const [studioItemId, setStudiItemId] = useState([]);
  const [studioItem, setStudioItem] = useState([]);
  const [studioItemName, setStudioItemName] = useState([]);
  const [studioItemLike, setStudioItemLike] = useState([]);
  const [studioKeyIndex, setStudioKeyIndex] = useState([]);
  const [studioLikeState, setStudioLikeState] = useState([]);
  let keyIndexArr1 = [];
  let list1 = [];
  let itemDataArr1 = [];
  let previewImgArr1 = [];
  let likeIndexArr1 = [];

  const [dressImg, setDressImg] = useState([]);
  const [dressItemId, setDressItemId] = useState([]);
  const [dressItem, setDressItem] = useState([]);
  const [dressItemName, setDressItemName] = useState([]);
  const [dressItemLike, setDressItemLike] = useState([]);
  const [dressKeyIndex, setDressKeyIndex] = useState([]);
  const [dressLikeState, setDressLikeState] = useState([]);
  let keyIndexArr2 = [];
  let list2 = [];
  let itemDataArr2 = [];
  let previewImgArr2 = [];
  let likeIndexArr2 = [];

  const [makeupImg, setMakeupImg] = useState([]);
  const [makeupItemId, setMakeupItemId] = useState([]);
  const [makeupItem, setMakeupItem] = useState([]);
  const [makeupItemName, setMakeupItemName] = useState([]);
  const [makeupItemLike, setMakeupItemLike] = useState([]);
  const [makeupKeyIndex, setMakeupKeyIndex] = useState([]);
  const [makeupLikeState, setMakeupLikeState] = useState([]);
  let keyIndexArr3 = [];
  let list3 = [];
  let itemDataArr3 = [];
  let previewImgArr3 = [];
  let likeIndexArr3 = [];

  const [honeyMoonImg, setHoneyMoonImg] = useState([]);
  const [honeyMoonItemId, setHoneyMoonItemId] = useState([]);
  const [honeyMoonItem, setHoneyMoonItem] = useState([]);
  const [honeyMoonItemName, setHoneyMoonItemName] = useState([]);
  const [honeyMoonItemLike, setHoneyMoonItemLike] = useState([]);
  const [honeyMoonKeyIndex, setHoneyMoonKeyIndex] = useState([]);
  const [honeyMoonLikeState, setHoneyMoonLikeState] = useState([]);
  let keyIndexArr4 = [];
  let list4 = [];
  let itemDataArr4 = [];
  let previewImgArr4 = [];
  let likeIndexArr4 = [];

  const [bouquetImg, setBouquetImg] = useState([]);
  const [bouquetItemId, setBouquetItemId] = useState([]);
  const [bouquetItem, setBouquetItem] = useState([]);
  const [bouquetItemName, setBouquetItemName] = useState([]);
  const [bouquetItemLike, setBouquetItemLike] = useState([]);
  const [bouquetKeyIndex, setBouquetKeyIndex] = useState([]);
  const [bouquetLikeState, setBouquetLikeState] = useState([]);
  let keyIndexArr5 = [];
  let list5 = [];
  let itemDataArr5 = [];
  let previewImgArr5 = [];
  let likeIndexArr5 = [];

  const [searchingKeyword, setSearchingKeyWord] = useState(keyword);

  const [countIndex, setCountIndex] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 엔터키로 이동
      setSearchedKeyWord(searchingKeyword);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchingKeyWord(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`item/search/${searchedKeyword}`)
      .then((res) => {
        const dataList = res.data;
        console.log(dataList);
        if (dataList.length !== 0) {
          let count = 0;
          let countArr = [];
          for (var i = 0; i < dataList.length; ) {
            if (dataList[i] === "/") {
              countArr.push(count);
              setCountIndex(countArr);
              count = 0;
              i++;
            } else {
              count++;
              console.log("countArr:" + countArr);

              //이미지
              let dataUrl = "data:image/jpeg;base64," + dataList[i];
              previewImgArr.push(dataUrl);
              setPreviewImg(previewImgArr);
              i++;
              //itemId

              let newitemId = dataList[i];
              list.push(newitemId);
              setItemId(list);
              // keyIndexArr.push(index);
              // index++;
              // setKeyIndex(keyIndexArr);
              // likeIndexArr.push(true);
              // setLikeState(likeIndexArr);
              axios
                .get(`/item/getItemList/${newitemId}`)
                .then((res) => {
                  let newItem = res.data;
                  itemDataArr.push(newItem);
                  itemDataArr.sort(function (a, b) {
                    return (
                      new Date(a.itemWriteDate) - new Date(b.itemWriteDate)
                    );
                  });
                  setItem([...item, newItem]);
                  setItem(itemDataArr);

                  let itemNameList = [];
                  let itemLikeList = [];
                  for (var j = 0; j < itemDataArr.length; j++) {
                    const newItemName = itemDataArr[j].itemName;
                    const newItemLike = itemDataArr[j].like.length;
                    itemNameList.push(newItemName);
                    itemLikeList.push(newItemLike);
                    setItemName(itemNameList);
                    setItemLike(itemLikeList);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
              i++;
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchedKeyword]);

  useEffect(() => {
    for (var i = 0; i < countIndex.length; i++) {
      let itemCount = countIndex[i];
      console.log("itemCount" + itemCount);
      keyIndexArr = [];
      keyIndexArr1 = [];
      keyIndexArr2 = [];
      keyIndexArr3 = [];
      keyIndexArr4 = [];
      keyIndexArr5 = [];
      if (i === 0) {
        let keyIndexArr = [];
        for (let a = 0; a < itemCount; a++) {
          keyIndexArr.push(a);
        }
        setKeyIndex(keyIndexArr);
      } else if (i === 1) {
        for (let b = 0; b < itemCount; b++) {
          keyIndexArr1.push(b);
        }
        setStudioKeyIndex(keyIndexArr1);
      } else if (i === 2) {
        for (let c = 0; c < itemCount; c++) {
          keyIndexArr2.push(c);
        }
        setDressKeyIndex(keyIndexArr2);
      } else if (i === 3) {
        for (let d = 0; d < itemCount; d++) {
          keyIndexArr3.push(d);
        }
        setMakeupKeyIndex(keyIndexArr3);
      } else if (i === 4) {
        for (let e = 0; e < itemCount; e++) {
          keyIndexArr4.push(e);
        }
        setHoneyMoonKeyIndex(keyIndexArr4);
      } else if (i === 5) {
        for (let f = 0; f < itemCount; f++) {
          keyIndexArr5.push(f);
        }
        setBouquetKeyIndex(keyIndexArr5);
      }
    }
  }, [countIndex, searchedKeyword]);

  console.log("previewImg");
  console.log(previewImg);
  console.log("countIndex:");
  console.log(countIndex);
  console.log("itemName:");
  console.log(itemName);
  console.log("itemLike:");
  console.log(itemLike);
  console.log("--------------------");
  console.log(keyIndex);
  console.log(studioKeyIndex);
  console.log(dressKeyIndex);
  console.log(makeupKeyIndex);
  console.log(honeyMoonKeyIndex);
  console.log(bouquetKeyIndex);

  return (
    <div className="mainlayout">
      <div className="header">
        <img className="mainlogo" src={imgLogo} alt="로고" />
        <input
          type="text"
          name="search"
          className="searchbar"
          placeholder="검색어를 입력하세요!"
          onKeyPress={handleKeyPress}
          value={searchingKeyword}
          onChange={handleChange}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-heart-fill likeiconfill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
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
            &nbsp;Wedding Hall&nbsp;
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
            {keyIndex.map((i) => (
              <SwiperSlide>
                <img
                  src={previewImg[i]}
                  class="d-block w-75 center"
                  alt="..."
                  style={{ width: "100px", height: "210px" }}
                />
                <br />
                <div className="itemName">
                  {itemName[i]} &nbsp;❤️{itemLike[i]}
                </div>
                <br />
              </SwiperSlide>
            ))}
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
            {studioKeyIndex.map((i) => (
              <SwiperSlide>
                <img
                  src={previewImg[i]}
                  class="d-block w-75 center"
                  alt="..."
                  style={{ width: "100px", height: "210px" }}
                />
                <br />
                <div className="itemName">
                  {itemName[i]}&nbsp;❤️ {itemLike[i]}
                </div>
                <br />
              </SwiperSlide>
            ))}
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
            {dressKeyIndex.map((i) => (
              <SwiperSlide>
                <img
                  src={previewImg[i]}
                  class="d-block w-75 center"
                  alt="..."
                  style={{ width: "100px", height: "220px" }}
                />
                <br />
                <div className="itemName">
                  {itemName[i]} &nbsp;❤️{itemLike[i]}
                </div>
                <br />
              </SwiperSlide>
            ))}
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
            {makeupKeyIndex.map((i) => (
              <SwiperSlide>
                <img
                  src={previewImg[i]}
                  class="d-block w-75 center"
                  alt="..."
                  style={{ width: "100px", height: "210px" }}
                />
                <br />
                <div className="itemName">
                  {itemName[i]} &nbsp;❤️{itemLike[i]}
                </div>
                <br />
              </SwiperSlide>
            ))}
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
            {honeyMoonKeyIndex.map((i) => (
              <SwiperSlide>
                <img
                  src={previewImg[i]}
                  class="d-block w-75 center"
                  alt="..."
                  style={{ width: "100px", height: "210px" }}
                />
                <br />
                <div className="itemName">
                  {itemName[i]} &nbsp;❤️{itemLike[i]}
                </div>
                <br />
              </SwiperSlide>
            ))}
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
            {bouquetKeyIndex.map((i) => (
              <SwiperSlide>
                <img
                  src={previewImg[i]}
                  class="d-block w-75 center"
                  alt="..."
                  style={{ width: "100px", height: "210px" }}
                />
                <br />
                <div className="itemName">
                  {itemName[i]} &nbsp;❤️{itemLike[i]}
                </div>
                <br />
              </SwiperSlide>
            ))}
          </Swiper>
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

export default SearchItems;
