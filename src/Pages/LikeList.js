import "../Css/main.css";
import "../Css/Home.css";
import "../Css/LikeList.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LikeList() {
  const category = [
    "웨딩홀",
    "스튜디오",
    "의상",
    "메이크업",
    "신혼여행",
    "부케",
  ];
  const [previewImg, setPreviewImg] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemLike, setItemLike] = useState([]);
  const [keyIndex, setKeyIndex] = useState([]);
  let keyIndexArr = [];
  let list = [];
  let itemDataArr = [];
  let previewImgArr = [];
  const [selectedItem, setSelectedItem] = useState("카테고리"); // 초기 버튼명 설정
  const [selectedSort, setSelectedSort] = useState("정렬"); // 초기 버튼명 설정

  const [likeSelect, setLikeSelect] = useState(false);

  const handleHeartClick = () => {
    setLikeSelect(!likeSelect);
  };

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item); // 선택한 아이템으로 버튼명 변경
  };

  const handleSortClick = (sort) => {
    setSelectedSort(sort); // 선택한 정렬로 버튼명 변경
  };

  useEffect(() => {
    //전체 찜목록 불러오는 기능
    axios
      .post(`/like/list`, { email: sessionStorage.getItem("email") })
      .then((res) => {
        const dataList = res.data;
        console.log(dataList);
        if (dataList.length !== 0) {
          let index = 0;
          for (var i = 0; i < dataList.length; i++) {
            if (i % 2 === 0) {
              let dataUrl = "data:image/jpeg;base64," + dataList[i];
              previewImgArr.push(dataUrl);
              setPreviewImg(previewImgArr);
            } else {
              let newitemId = dataList[i];
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
                  itemDataArr.sort(function (a, b) {
                    return (
                      new Date(b.itemWriteDate) - new Date(a.itemWriteDate)
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
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(keyIndex);

  useEffect(() => {}, [selectedItem, selectedSort, likeSelect]);

  const Like = ({ likeSelect }) => {
    if (likeSelect === false) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-heart"
          viewBox="0 0 16 16"
          onClick={handleHeartClick}
          style={{ cursor: "pointer" }}
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      );
    } else if (likeSelect === true) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="red"
          class="bi bi-heart-fill "
          viewBox="0 0 16 16"
          style={{ cursor: "pointer" }}
          onClick={handleHeartClick}
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      );
    }
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
            {/* 이미지카드 */}
            {keyIndex.map((i) => (
              <div class="col">
                <div class="card margT">
                  <img
                    style={{ height: "230px" }}
                    src={previewImg[i]}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <p class="card-text">
                      인물+배경 스튜디오{" "}
                      <div className="likeListBtn1">
                        <Like likeSelect={likeSelect} />
                      </div>
                      개수
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* 이미지카드 */}
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
