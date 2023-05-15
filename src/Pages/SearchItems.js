import "../Css/main.css";
import "../Css/Home.css";
import Footer from "../Components/Footer";
import imgLogo from "../Assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
  const [itemContent, setItemContent] = useState([]);
  const [weddingHallLikeState, setWeddingHallLikeState] = useState([]);
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

  const modalImg = useRef();
  const modalImgContent = useRef();
  const modalImgTitle = useRef();
  const modalItemId = useRef();

  const [selectLikeState, setSelectLikeState] = useState(undefined);
  const [modalBackgroundColor, setChangeModalBackgroundColor] = useState(false);
  const [checkLike, setCheckLike] = useState(false);

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
                  let itemContentList = [];
                  for (var j = 0; j < itemDataArr.length; j++) {
                    const newItemName = itemDataArr[j].itemName;
                    const newItemLike = itemDataArr[j].like.length;
                    const newItemContent = itemDataArr[j].imgContent;
                    itemNameList.push(newItemName);
                    itemLikeList.push(newItemLike);
                    itemContentList.push(newItemContent);
                    setItemName(itemNameList);
                    setItemLike(itemLikeList);
                    setItemContent(itemContentList);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
              i++;
            }
          }
        } else {
          let countArr = [0, 0, 0, 0, 0, 0];
          setCountIndex(countArr);
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
      let likeStateArr = [];
      let likeStateArr1 = [];
      let likeStateArr2 = [];
      let likeStateArr3 = [];
      let likeStateArr4 = [];
      let likeStateArr5 = [];
      if (i === 0) {
        for (let a = 0; a < itemCount; a++) {
          keyIndexArr.push(a);
          likeStateArr.push(undefined);
        }
        setKeyIndex(keyIndexArr);
        setWeddingHallLikeState(likeStateArr);
      } else if (i === 1) {
        for (let b = 0; b < itemCount; b++) {
          keyIndexArr1.push(b);
          likeStateArr1.push(undefined);
        }
        setStudioKeyIndex(keyIndexArr1);
        setStudioLikeState(likeStateArr1);
      } else if (i === 2) {
        for (let c = 0; c < itemCount; c++) {
          keyIndexArr2.push(c);
          likeStateArr2.push(undefined);
        }
        setDressKeyIndex(keyIndexArr2);
        setDressLikeState(likeStateArr2);
      } else if (i === 3) {
        for (let d = 0; d < itemCount; d++) {
          keyIndexArr3.push(d);
          likeStateArr3.push(undefined);
        }
        setMakeupKeyIndex(keyIndexArr3);
        setMakeupLikeState(likeStateArr3);
      } else if (i === 4) {
        for (let e = 0; e < itemCount; e++) {
          keyIndexArr4.push(e);
          likeStateArr4.push(undefined);
        }
        setHoneyMoonKeyIndex(keyIndexArr4);
        setHoneyMoonLikeState(likeStateArr4);
      } else if (i === 5) {
        for (let f = 0; f < itemCount; f++) {
          keyIndexArr5.push(f);
          likeStateArr5.push(undefined);
        }
        setBouquetKeyIndex(keyIndexArr5);
        setBouquetLikeState(likeStateArr5);
      }
    }
  }, [countIndex, searchedKeyword]);

  const showingDetail = (e) => {
    modalImg.current.src = e.target.dataset.bsSrc;
    const index = e.target.dataset.bsKeyindex;
    modalItemId.current.id = e.target.dataset.bsItemid;
    modalItemId.current.dataset.index = index;
    console.log(e.target.dataset);
    modalImgContent.current.innerText = e.target.dataset.bsItemcontent;
    modalImgTitle.current.innerText = `- ${e.target.dataset.bsItemname} -`;

    modalItemId.current.dataset.category = e.target.dataset.bsCategory;

    if (e.target.dataset.bsCategory === "웨딩홀") {
      modalItemId.current.dataset.category = "웨딩홀";
      setSelectLikeState(weddingHallLikeState[index]);
      if (weddingHallLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === "스튜디오") {
      modalItemId.current.dataset.category = "스튜디오";

      setSelectLikeState(studioLikeState[index]);
      if (studioLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === "의상") {
      modalItemId.current.dataset.category = "의상";

      setSelectLikeState(dressLikeState[index]);
      if (dressLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === "메이크업") {
      modalItemId.current.dataset.category = "메이크업";

      setSelectLikeState(makeupLikeState[index]);
      if (makeupLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === "신혼여행") {
      modalItemId.current.dataset.category = "신혼여행";

      setSelectLikeState(honeyMoonLikeState[index]);
      if (honeyMoonLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === "부케") {
      modalItemId.current.dataset.category = "부케";

      setSelectLikeState(bouquetLikeState[index]);
      if (bouquetLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    }
  };

  const gotoDetailInfo = (e) => {
    navigate("/imgDetail");
  };

  const manageLikeList = (e) => {
    let newlikeState = undefined;
    const index = modalItemId.current.dataset.index;
    setCheckLike(!checkLike);
    if (modalItemId.current.dataset.category === "웨딩홀") {
      newlikeState = [...weddingHallLikeState];
      let prevState = newlikeState.slice(index, index + 1);
      let changedState = undefined;
      if (prevState[0] === true) {
        setSelectLikeState(false);
        modalItemId.current.style.backgroundColor = "#ebebeb";
        changedState = false;
        itemLike[index]--;
      } else if (prevState[0] === false) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        itemLike[index]++;
      } else if (prevState[0] === undefined) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        itemLike[index]++;
      } else {
        alert("찜하기 버튼을 이용하려면 로그인하세요!");
      }
      newlikeState.splice(index, 1, changedState);
      setWeddingHallLikeState(newlikeState);
    } else if (modalItemId.current.dataset.category === "스튜디오") {
      newlikeState = [...studioLikeState];
      let prevState = newlikeState.slice(index, index + 1);
      let changedState = undefined;
      if (prevState[0] === true) {
        setSelectLikeState(false);
        modalItemId.current.style.backgroundColor = "#ebebeb";
        changedState = false;
        studioItemLike[index]--;
      } else if (prevState[0] === false) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        studioItemLike[index]++;
      } else if (prevState[0] === undefined) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        studioItemLike[index]++;
      } else {
        alert("찜하기 버튼을 이용하려면 로그인하세요!");
      }
      newlikeState.splice(index, 1, changedState);
      setStudioLikeState(newlikeState);
    } else if (modalItemId.current.dataset.category === "의상") {
      newlikeState = [...dressLikeState];
      let prevState = newlikeState.slice(index, index + 1);
      let changedState = undefined;
      if (prevState[0] === true) {
        setSelectLikeState(false);
        modalItemId.current.style.backgroundColor = "#ebebeb";
        changedState = false;
        dressItemLike[index]--;
      } else if (prevState[0] === false) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        dressItemLike[index]++;
      } else if (prevState[0] === undefined) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        dressItemLike[index]++;
      } else {
        alert("찜하기 버튼을 이용하려면 로그인하세요!");
      }
      newlikeState.splice(index, 1, changedState);
      setDressLikeState(newlikeState);
    } else if (modalItemId.current.dataset.category === "메이크업") {
      newlikeState = [...makeupLikeState];
      let prevState = newlikeState.slice(index, index + 1);
      let changedState = undefined;
      if (prevState[0] === true) {
        setSelectLikeState(false);
        modalItemId.current.style.backgroundColor = "#ebebeb";
        changedState = false;
        makeupItemLike[index]--;
      } else if (prevState[0] === false) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        makeupItemLike[index]++;
      } else if (prevState[0] === undefined) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        makeupItemLike[index]++;
      } else {
        alert("찜하기 버튼을 이용하려면 로그인하세요!");
      }
      newlikeState.splice(index, 1, changedState);
      setMakeupLikeState(newlikeState);
    } else if (modalItemId.current.dataset.category === "신혼여행") {
      newlikeState = [...honeyMoonLikeState];
      let prevState = newlikeState.slice(index, index + 1);
      let changedState = undefined;
      if (prevState[0] === true) {
        setSelectLikeState(false);
        modalItemId.current.style.backgroundColor = "#ebebeb";
        changedState = false;
        honeyMoonItemLike[index]--;
      } else if (prevState[0] === false) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        honeyMoonItemLike[index]++;
      } else if (prevState[0] === undefined) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        honeyMoonItemLike[index]++;
      } else {
        alert("찜하기 버튼을 이용하려면 로그인하세요!");
      }
      newlikeState.splice(index, 1, changedState);
      setHoneyMoonLikeState(newlikeState);
    } else if (modalItemId.current.dataset.category === "부케") {
      newlikeState = [...bouquetLikeState];
      let prevState = newlikeState.slice(index, index + 1);
      let changedState = undefined;
      if (prevState[0] === true) {
        setSelectLikeState(false);
        modalItemId.current.style.backgroundColor = "#ebebeb";
        changedState = false;
        bouquetItemLike[index]--;
      } else if (prevState[0] === false) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        bouquetItemLike[index]++;
      } else if (prevState[0] === undefined) {
        setSelectLikeState(true);
        modalItemId.current.style.backgroundColor = "#fce1e4";
        changedState = true;
        bouquetItemLike[index]++;
      } else {
        alert("찜하기 버튼을 이용하려면 로그인하세요!");
      }
      newlikeState.splice(index, 1, changedState);
      setBouquetLikeState(newlikeState);
    }
  };

  console.log("previewImg");
  console.log(previewImg);
  console.log("countIndex:");
  console.log(countIndex);
  console.log("itemName:");
  console.log(itemName);
  console.log("itemLike:");
  console.log(itemLike);
  console.log(itemContent);

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
                  style={{ width: "100px", height: "210px", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={previewImg[i]}
                  data-bs-category="웨딩홀"
                  data-bs-keyIndex={i}
                  data-bs-itemid={itemId[i]}
                  data-bs-itemContent={itemContent[i]}
                  data-bs-itemLike={itemLike[i]}
                  data-bs-itemName={itemName[i]}
                  onClick={showingDetail}
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
                  style={{ width: "100px", height: "210px", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={previewImg[i]}
                  data-bs-category="스튜디오"
                  data-bs-keyIndex={i}
                  data-bs-itemid={itemId[i]}
                  data-bs-itemContent={itemContent[i]}
                  data-bs-itemLike={itemLike[i]}
                  data-bs-itemName={itemName[i]}
                  onClick={showingDetail}
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
                  style={{ width: "100px", height: "220px", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={previewImg[i]}
                  data-bs-category="의상"
                  data-bs-keyIndex={i}
                  data-bs-itemid={itemId[i]}
                  data-bs-itemContent={itemContent[i]}
                  data-bs-itemLike={itemLike[i]}
                  data-bs-itemName={itemName[i]}
                  onClick={showingDetail}
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
                  style={{ width: "100px", height: "210px", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={previewImg[i]}
                  data-bs-category="메이크업"
                  data-bs-keyIndex={i}
                  data-bs-itemid={itemId[i]}
                  data-bs-itemContent={itemContent[i]}
                  data-bs-itemLike={itemLike[i]}
                  data-bs-itemName={itemName[i]}
                  onClick={showingDetail}
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
                  style={{ width: "100px", height: "210px", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={previewImg[i]}
                  data-bs-category="신혼여행"
                  data-bs-keyIndex={i}
                  data-bs-itemid={itemId[i]}
                  data-bs-itemContent={itemContent[i]}
                  data-bs-itemLike={itemLike[i]}
                  data-bs-itemName={itemName[i]}
                  onClick={showingDetail}
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
                  style={{ width: "100px", height: "210px", pointer: "cursor" }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={previewImg[i]}
                  data-bs-category="부케"
                  data-bs-keyIndex={i}
                  data-bs-itemid={itemId[i]}
                  data-bs-itemContent={itemContent[i]}
                  data-bs-itemLike={itemLike[i]}
                  data-bs-itemName={itemName[i]}
                  onClick={showingDetail}
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
      {/* 이미지 상세정보 모달창 */}
      <div
        class="modal fade"
        id="imgDetailModal"
        tabindex="-1"
        aria-labelledby="imgDetailModal"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          style={{ width: "510px" }}
        >
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title justify-content-center "
                id="imgDetailModal"
                style={{ fontSize: "1.9em" }}
                ref={modalImgTitle}
              >
                - -
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                alginItems: "center",
                displayContent: "center",
                height: "100%",
                width: "100%",
                marginTop: "50px",
              }}
            >
              <div
                class="has-validation"
                style={{
                  height: "100%",
                  width: "480px",
                }}
              >
                <img
                  src=""
                  style={{
                    width: "430px",
                    height: "470px",
                    marginBottom: "20px",
                    marginTop: "-50px",
                    marginLeft: "20px",
                  }}
                  alt=""
                  ref={modalImg}
                />
                <div
                  style={{
                    fontSize: "1.5em",
                    padding: "10px",
                  }}
                >
                  상세정보
                  {selectLikeState === true ? (
                    <button
                      style={{
                        marginLeft: "240px",
                        width: "130px",
                        marginBottom: "10px",
                        fontSize: "1em",
                        backgroundColor: "##fce1e4",
                        border: "grey 1px solid",
                      }}
                      ref={modalItemId}
                      onClick={manageLikeList}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="red"
                        class="bi bi-heart-fill "
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>{" "}
                      찜하기
                    </button>
                  ) : (
                    <button
                      style={{
                        marginLeft: "240px",
                        width: "130px",
                        marginBottom: "10px",
                        fontSize: "1em",
                        backgroundColor: "#ebebeb",
                        border: "grey 1px solid",
                      }}
                      ref={modalItemId}
                      onClick={manageLikeList}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-heart"
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>{" "}
                      찜하기
                    </button>
                  )}
                </div>
                <p
                  style={{
                    fontSize: "1.3em",
                    width: "460px",
                    border: "1px solid black",
                    padding: "10px",
                  }}
                  ref={modalImgContent}
                ></p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={gotoDetailInfo}
              >
                상세정보 페이지 이동
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*이미지 상세정보 모달창  */}
      <Footer />
    </div>
  );
}

export default SearchItems;
