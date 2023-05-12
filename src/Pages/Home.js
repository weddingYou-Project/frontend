import "../Css/main.css";
import "../Css/Home.css";
import Footer from "../Components/Footer";
import imgLogo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useLayoutEffect, useEffect, useRef } from "react";

import axios from "axios";

function Home() {
  const category = [
    "웨딩홀",
    "스튜디오",
    "의상",
    "메이크업",
    "신혼여행",
    "부케",
  ];
  const navigate = useNavigate();

  const [searchItem, setSearchItem] = useState("");

  const [category1, setCategory1] = useState("웨딩홀");

  const [previewImg, setPreviewImg] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemLike, setItemLike] = useState([]);
  const [keyIndex, setKeyIndex] = useState([]);
  let keyIndexArr = [];
  let list = [];
  let itemDataArr = [];
  let itemLikeArr = [];
  let itemNameArr = [];
  let previewImgArr = [];

  const [studioImg, setStudioImg] = useState([]);
  const [studioItemId, setStudiItemId] = useState([]);
  const [studioItem, setStudioItem] = useState([]);
  const [studioItemName, setStudioItemName] = useState([]);
  const [studioItemLike, setStudioItemLike] = useState([]);
  const [studioKeyIndex, setStudioKeyIndex] = useState([]);
  let keyIndexArr1 = [];
  let list1 = [];
  let itemDataArr1 = [];
  let itemLikeArr1 = [];
  let itemNameArr1 = [];
  let previewImgArr1 = [];

  const [dressImg, setDressImg] = useState([]);
  const [dressItemId, setDressItemId] = useState([]);
  const [dressItem, setDressItem] = useState([]);
  const [dressItemName, setDressItemName] = useState([]);
  const [dressItemLike, setDressItemLike] = useState([]);
  const [dressKeyIndex, setDressKeyIndex] = useState([]);
  let keyIndexArr2 = [];
  let list2 = [];
  let itemDataArr2 = [];
  let itemLikeArr2 = [];
  let itemNameArr2 = [];
  let previewImgArr2 = [];

  const [makeupImg, setMakeupImg] = useState([]);
  const [makeupItemId, setMakeupItemId] = useState([]);
  const [makeupItem, setMakeupItem] = useState([]);
  const [makeupItemName, setMakeupItemName] = useState([]);
  const [makeupItemLike, setMakeupItemLike] = useState([]);
  const [makeupKeyIndex, setMakeupKeyIndex] = useState([]);
  let keyIndexArr3 = [];
  let list3 = [];
  let itemDataArr3 = [];
  let itemLikeArr3 = [];
  let itemNameArr3 = [];
  let previewImgArr3 = [];

  const [honeyMoonImg, setHoneyMoonImg] = useState([]);
  const [honeyMoonItemId, setHoneyMoonItemId] = useState([]);
  const [honeyMoonItem, setHoneyMoonItem] = useState([]);
  const [honeyMoonItemName, setHoneyMoonItemName] = useState([]);
  const [honeyMoonItemLike, setHoneyMoonItemLike] = useState([]);
  const [honeyMoonKeyIndex, setHoneyMoonKeyIndex] = useState([]);
  let keyIndexArr4 = [];
  let list4 = [];
  let itemDataArr4 = [];
  let itemLikeArr4 = [];
  let itemNameArr4 = [];
  let previewImgArr4 = [];

  const [bouquetImg, setBouquetImg] = useState([]);
  const [bouquetItemId, setBouquetItemId] = useState([]);
  const [bouquetItem, setBouquetItem] = useState([]);
  const [bouquetItemName, setBouquetItemName] = useState([]);
  const [bouquetItemLike, setBouquetItemLike] = useState([]);
  const [bouquetKeyIndex, setBouquetKeyIndex] = useState([]);
  let keyIndexArr5 = [];
  let list5 = [];
  let itemDataArr5 = [];
  let itemLikeArr5 = [];
  let itemNameArr5 = [];
  let previewImgArr5 = [];

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 엔터키로 이동
      navigate(`/searchItems`);
    }
  };
  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  useEffect(() => {
    //웨딩홀
    axios
      .get(`/item/itemList/${category[0]}`)
      .then((res) => {
        const dataList = res.data;
        //    console.log(dataList);
        console.log(res);
        let index = 0;
        for (var i = 0; i < dataList.length; i++) {
          if (i % 2 === 0) {
            //    console.log(dataList[i]);
            let dataUrl = "data:image/jpeg;base64," + dataList[i];
            previewImgArr.push(dataUrl);
            setPreviewImg(previewImgArr);
          } else {
            let newitemId = dataList[i];
            //  console.log(newitemId);
            list.push(newitemId);
            setItemId(list);
            keyIndexArr.push(index);
            index++;
            setKeyIndex(keyIndexArr);
            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                console.log(res.data);
                let newItem = res.data;
                itemDataArr.push(newItem);
                console.log(itemDataArr);
                itemDataArr.sort(function (a, b) {
                  return new Date(b.itemWriteDate) - new Date(a.itemWriteDate);
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
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });

    //스튜디오
    axios
      .get(`/item/itemList/${category[1]}`)
      .then((res) => {
        const dataList = res.data;
        //    console.log(dataList);
        console.log(res);
        let index = 0;
        for (var i = 0; i < dataList.length; i++) {
          if (i % 2 === 0) {
            //    console.log(dataList[i]);
            let dataUrl = "data:image/jpeg;base64," + dataList[i];
            previewImgArr1.push(dataUrl);
            setPreviewImg(previewImgArr1);
          } else {
            let newitemId = dataList[i];
            //  console.log(newitemId);
            list1.push(newitemId);
            setItemId(list1);
            keyIndexArr1.push(index);
            index++;
            setKeyIndex(keyIndexArr1);
            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                console.log(res.data);
                let newItem = res.data;
                itemDataArr1.push(newItem);
                //console.log(itemDataArr);
                setItem(itemDataArr1);
                let newItemName = res.data.itemName;
                itemNameArr1.push(newItemName);
                //console.log(itemNameArr);
                setItemName(itemNameArr1);
                let newItemLike = res.data.like.length;
                itemLikeArr1.push(newItemLike);
                //console.log(itemLikeArr);
                setItemLike(itemLikeArr1);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //의상
    axios
      .get(`/item/itemList/${category[2]}`)
      .then((res) => {
        const dataList = res.data;
        //    console.log(dataList);
        console.log(res);
        let index = 0;
        for (var i = 0; i < dataList.length; i++) {
          if (i % 2 === 0) {
            //    console.log(dataList[i]);
            let dataUrl = "data:image/jpeg;base64," + dataList[i];
            previewImgArr2.push(dataUrl);
            setPreviewImg(previewImgArr2);
          } else {
            let newitemId = dataList[i];
            //  console.log(newitemId);
            list.push(newitemId);
            setItemId(list2);
            keyIndexArr2.push(index);
            index++;
            setKeyIndex(keyIndexArr2);
            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                console.log(res.data);
                let newItem = res.data;
                itemDataArr2.push(newItem);
                //console.log(itemDataArr);
                setItem(itemDataArr2);
                let newItemName = res.data.itemName;
                itemNameArr2.push(newItemName);
                //console.log(itemNameArr);
                setItemName(itemNameArr2);
                let newItemLike = res.data.like.length;
                itemLikeArr2.push(newItemLike);
                //console.log(itemLikeArr);
                setItemLike(itemLikeArr2);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //메이크업
    axios
      .get(`/item/itemList/${category[3]}`)
      .then((res) => {
        const dataList = res.data;
        //    console.log(dataList);
        console.log(res);
        let index = 0;
        for (var i = 0; i < dataList.length; i++) {
          if (i % 2 === 0) {
            //    console.log(dataList[i]);
            let dataUrl = "data:image/jpeg;base64," + dataList[i];
            previewImgArr3.push(dataUrl);
            setPreviewImg(previewImgArr3);
          } else {
            let newitemId = dataList[i];
            //  console.log(newitemId);
            list.push(newitemId);
            setItemId(list3);
            keyIndexArr3.push(index);
            index++;
            setKeyIndex(keyIndexArr3);
            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                console.log(res.data);
                let newItem = res.data;
                itemDataArr3.push(newItem);
                //console.log(itemDataArr);
                setItem(itemDataArr3);
                let newItemName = res.data.itemName;
                itemNameArr3.push(newItemName);
                //console.log(itemNameArr);
                setItemName(itemNameArr3);
                let newItemLike = res.data.like.length;
                itemLikeArr3.push(newItemLike);
                //console.log(itemLikeArr);
                setItemLike(itemLikeArr3);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //신혼여행
    axios
      .get(`/item/itemList/${category[4]}`)
      .then((res) => {
        const dataList = res.data;
        //    console.log(dataList);
        console.log(res);
        let index = 0;
        for (var i = 0; i < dataList.length; i++) {
          if (i % 2 === 0) {
            //    console.log(dataList[i]);
            let dataUrl = "data:image/jpeg;base64," + dataList[i];
            previewImgArr4.push(dataUrl);
            setPreviewImg(previewImgArr4);
          } else {
            let newitemId = dataList[i];
            //  console.log(newitemId);
            list.push(newitemId);
            setItemId(list4);
            keyIndexArr4.push(index);
            index++;
            setKeyIndex(keyIndexArr4);
            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                console.log(res.data);
                let newItem = res.data;
                itemDataArr4.push(newItem);
                //console.log(itemDataArr);
                setItem(itemDataArr4);
                let newItemName = res.data.itemName;
                itemNameArr4.push(newItemName);
                //console.log(itemNameArr);
                setItemName(itemNameArr4);
                let newItemLike = res.data.like.length;
                itemLikeArr.push(newItemLike);
                //console.log(itemLikeArr);
                setItemLike(itemLikeArr4);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //부케
    axios
      .get(`/item/itemList/${category[5]}`)
      .then((res) => {
        const dataList = res.data;
        //    console.log(dataList);
        console.log(res);
        let index = 0;
        for (var i = 0; i < dataList.length; i++) {
          if (i % 2 === 0) {
            //    console.log(dataList[i]);
            let dataUrl = "data:image/jpeg;base64," + dataList[i];
            previewImgArr5.push(dataUrl);
            setPreviewImg(previewImgArr5);
          } else {
            let newitemId = dataList[i];
            //  console.log(newitemId);
            list.push(newitemId);
            setItemId(list5);
            keyIndexArr5.push(index);
            index++;
            setKeyIndex(keyIndexArr5);
            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                console.log(res.data);
                let newItem = res.data;
                itemDataArr5.push(newItem);
                //console.log(itemDataArr);
                setItem(itemDataArr5);
                let newItemName = res.data.itemName;
                itemNameArr5.push(newItemName);
                //console.log(itemNameArr);
                setItemName(itemNameArr5);
                let newItemLike = res.data.like.length;
                itemLikeArr5.push(newItemLike);
                //console.log(itemLikeArr);
                setItemLike(itemLikeArr5);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    for (var r = 0; r < itemDataArr.legnth; r++) {
      itemNameArr.push(itemDataArr[r].itemName);
      console.log(itemNameArr);
      setItemName(itemNameArr);

      itemLikeArr.push(itemDataArr[r].itemLike);
      //console.log(itemLikeArr);
      setItemLike(itemLikeArr);
    }
  }, []);
  console.log("itemId:" + itemId);
  //console.log("item:" + item[0].itemName);
  console.log("itemNmae:" + itemName);
  // console.log("itemNameArr:" + itemNameArr);
  console.log("itemLike:" + itemLike);
  console.log("keyindex:" + keyIndex);
  console.log("itemDateArr" + itemDataArr);
  // console.log("previewImg" + previewImg);

  return (
    <div className="mainlayout">
      <div className="header">
        <img className="mainlogo" src={imgLogo} alt="로고" />
        <input
          type="text"
          name="search"
          className="searchbar"
          placeholder="검색어를 입력하세요"
          value={searchItem}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
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
          <div
            id="weddingHoleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                class="carousel-item active"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "500px",
                  height: "300px",
                }}
              >
                <img
                  id="targetImg"
                  style={{
                    width: "400px",
                    height: "260px",
                    marginLeft: "25px",
                  }}
                  src={previewImg[0]} //previewImg배열 하나하나요소가 src에 들어가야 함.
                  alt="..."
                />
                <br />
                <div className="itemName" style={{ marginTop: "-10px" }}>
                  {itemName[0]}&nbsp;&nbsp; ❤️{itemLike[0]}
                </div>
              </div>

              {keyIndex.map((i) =>
                i === 0 ? null : (
                  <div
                    class="carousel-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "500px",
                      height: "300px",
                    }}
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "250px",
                        marginLeft: "25px",
                      }}
                      src={previewImg[i]}
                      alt="..."
                    />
                    <br />
                    <div className="itemName" style={{ marginTop: "-10px" }}>
                      {itemName[i]} &nbsp;&nbsp;❤️{itemLike[i]}
                    </div>
                  </div>
                )
              )}
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#weddingHoleFade"
              data-bs-slide="prev"
              style={{ marginLeft: "-10px" }}
            >
              <span
                class="carousel-control-prev-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#weddingHoleFade"
              data-bs-slide="next"
              style={{ marginRight: "-10px" }}
            >
              <span
                class="carousel-control-next-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
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
          <div
            id="studioFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://www.iwedding.co.kr/center/website/brandplus/1663828102.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/website/brandplus/1663828179.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="http://ifamily.co.kr/image/icard/242516/icard_sm_242516"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#studioFade"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#studioFade"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <br />
          <div className="itemName">(이름) (좋아요수)</div>
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
          <div
            id="clothesFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17950_1681285801_41548700_3232256098.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_2146_1674021540_85005600_3232256098.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_4796_1679476532_21876000_3232256099.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#clothesFade"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#clothesFade"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <br />
          <div className="itemName">(이름) (좋아요수)</div>
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
          <div
            id="makeUpFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17899_1680240930_80728900_3232256100.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17887_1680057964_58033100_3232256098.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_10585_1666061021_36682900_3232256100.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#makeUpFade"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#makeUpFade"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <br />
          <div className="itemName">(이름) (좋아요수)</div>
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
          <div
            id="honeyMoonFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17466_1669598578_99049200_3232256099.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17444_1669461045_65305200_3232256099.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17127_1668576642_85590400_3232256098.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#honeyMoonFade"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#honeyMoonFade"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <br />
          <div className="itemName">(이름) (좋아요수)</div>
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
          <div
            id="bouquetFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17986_1682324127_28953000_3232256099.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17910_1680587270_66029500_3232256099.png"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.iwedding.co.kr/center/iweddingb/product/500_17907_1680587156_29324700_3232256099.jpg"
                  class="d-block w-50 center"
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#bouquetFade"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#bouquetFade"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon fadeBtnColor"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <br />
          <div className="itemName">(이름) (좋아요수)</div>
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

export default Home;

const CarouselItem = ({ category1, previewImg, index }) => {
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemLike, setItemLike] = useState([]);

  useLayoutEffect(() => {
    axios
      .get(`/item/itemList/${category1}`)
      .then((res) => {
        const dataList = res.data;

        var list = [];
        var itemData = [];
        var itemLike = [];
        var itemName = [];
        for (var i = 0; i < dataList.length; i++) {
          if (i % 2 === 1) {
            let newitemId = dataList[i];

            list.push(newitemId);
            setItemId(list);
            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                itemData.push(res.data);
                setItem(itemData);
                itemName.push(res.data.itemName);
                setItemName(itemName);
                itemLike.push(res.data.like.length);
                setItemLike(itemLike);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div class="carousel-item">
      <img src={previewImg} class="d-block w-50 center" alt="..." />
      <br />
      <div className="itemName">
        {itemName[index]} {itemLike[index]}
      </div>
    </div>
  );
};
