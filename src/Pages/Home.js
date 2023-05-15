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
  const [checkLike, setCheckLike] = useState(false);

  const [previewImg, setPreviewImg] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemLike, setItemLike] = useState([]);
  const [keyIndex, setKeyIndex] = useState([]);
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

  const [likseSelect, setLikeSelect] = useState(false);
  const [modalBackgroundColor, setChangeModalBackgroundColor] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectLikeState, setSelectLikeState] = useState(undefined);

  const modalImg = useRef();
  const modalImgContent = useRef();
  const modalImgTitle = useRef();
  const modalItemId = useRef();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 엔터키로 이동
      navigate(`/searchItems`, { state: { keyword: searchItem } });
    }
  };
  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  const gotoDetailInfo = (e) => {
    navigate("/imgDetail");
  };

  useEffect(() => {
    //웨딩홀
    axios
      .get(`/item/itemList/${category[0]}`)
      .then((res) => {
        const dataList = res.data;

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
                .post(`/like/findlist`, {
                  itemId: newitemId,
                  email: sessionStorage.getItem("email"),
                })
                .then((res) => {
                  if (res.data === 1) {
                    likeIndexArr.push(true);
                    setWeddingHallLikeState(likeIndexArr);
                  } else if (res.data === 0) {
                    likeIndexArr.push(undefined);
                    setWeddingHallLikeState(likeIndexArr);
                  } else {
                    //로그인하지 않았을 때
                    likeIndexArr.push(-1);
                    setWeddingHallLikeState(likeIndexArr);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });

              axios
                .get(`/item/getItemList/${newitemId}`)
                .then((res) => {
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
    //스튜디오
    axios
      .get(`/item/itemList/${category[1]}`)
      .then((res) => {
        const dataList = res.data;

        if (dataList.length !== 0) {
          let index = 0;
          for (var i = 0; i < dataList.length; i++) {
            if (i % 2 === 0) {
              let dataUrl = "data:image/jpeg;base64," + dataList[i];
              previewImgArr1.push(dataUrl);
              setStudioImg(previewImgArr1);
            } else {
              let newitemId = dataList[i];
              list1.push(newitemId);
              setStudiItemId(list1);
              keyIndexArr1.push(index);
              index++;
              setStudioKeyIndex(keyIndexArr1);
              axios
                .post(`/like/findlist`, {
                  itemId: newitemId,
                  email: sessionStorage.getItem("email"),
                })
                .then((res) => {
                  if (res.data === 1) {
                    likeIndexArr1.push(true);
                    setStudioLikeState(likeIndexArr1);
                  } else if (res.data === 0) {
                    likeIndexArr1.push(undefined);
                    setStudioLikeState(likeIndexArr1);
                  } else {
                    //로그인하지 않았을 때
                    likeIndexArr1.push(-1);
                    setStudioLikeState(likeIndexArr1);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });

              axios
                .get(`/item/getItemList/${newitemId}`)
                .then((res) => {
                  let newItem = res.data;
                  itemDataArr1.push(newItem);
                  itemDataArr1.sort(function (a, b) {
                    return (
                      new Date(b.itemWriteDate) - new Date(a.itemWriteDate)
                    );
                  });
                  setStudioItem([...studioItem, newItem]);
                  setStudioItem(itemDataArr1);

                  let itemNameList = [];
                  let itemLikeList = [];
                  for (var j = 0; j < itemDataArr1.length; j++) {
                    const newItemName = itemDataArr1[j].itemName;
                    const newItemLike = itemDataArr1[j].like.length;
                    itemNameList.push(newItemName);
                    itemLikeList.push(newItemLike);
                    setStudioItemName(itemNameList);
                    setStudioItemLike(itemLikeList);
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
    //의상
    axios
      .get(`/item/itemList/${category[2]}`)
      .then((res) => {
        const dataList = res.data;

        if (dataList.length !== 0) {
          let index = 0;
          for (var i = 0; i < dataList.length; i++) {
            if (i % 2 === 0) {
              let dataUrl = "data:image/jpeg;base64," + dataList[i];
              previewImgArr2.push(dataUrl);
              setDressImg(previewImgArr2);
            } else {
              let newitemId = dataList[i];
              list2.push(newitemId);
              setDressItemId(list2);
              keyIndexArr2.push(index);
              index++;
              setDressKeyIndex(keyIndexArr2);
              axios
                .post(`/like/findlist`, {
                  itemId: newitemId,
                  email: sessionStorage.getItem("email"),
                })
                .then((res) => {
                  if (res.data === 1) {
                    likeIndexArr2.push(true);
                    setDressLikeState(likeIndexArr2);
                  } else if (res.data === 0) {
                    likeIndexArr2.push(undefined);
                    setDressLikeState(likeIndexArr2);
                  } else {
                    //로그인하지 않았을 때
                    likeIndexArr2.push(-1);
                    setDressLikeState(likeIndexArr2);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });

              axios
                .get(`/item/getItemList/${newitemId}`)
                .then((res) => {
                  let newItem = res.data;
                  itemDataArr2.push(newItem);
                  itemDataArr2.sort(function (a, b) {
                    return (
                      new Date(b.itemWriteDate) - new Date(a.itemWriteDate)
                    );
                  });
                  setDressItem([...dressItem, newItem]);
                  setDressItem(itemDataArr2);
                  let itemNameList = [];
                  let itemLikeList = [];
                  for (var j = 0; j < itemDataArr2.length; j++) {
                    const newItemName = itemDataArr2[j].itemName;
                    const newItemLike = itemDataArr2[j].like.length;
                    itemNameList.push(newItemName);
                    itemLikeList.push(newItemLike);
                    setDressItemName(itemNameList);
                    setDressItemLike(itemLikeList);
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
    //메이크업
    axios
      .get(`/item/itemList/${category[3]}`)
      .then((res) => {
        const dataList = res.data;

        if (dataList.length !== 0) {
          let index = 0;
          for (var i = 0; i < dataList.length; i++) {
            if (i % 2 === 0) {
              let dataUrl = "data:image/jpeg;base64," + dataList[i];
              previewImgArr3.push(dataUrl);
              setMakeupImg(previewImgArr3);
            } else {
              let newitemId = dataList[i];
              list3.push(newitemId);
              setMakeupItemId(list3);
              keyIndexArr3.push(index);
              index++;
              setMakeupKeyIndex(keyIndexArr3);
              axios
                .post(`/like/findlist`, {
                  itemId: newitemId,
                  email: sessionStorage.getItem("email"),
                })
                .then((res) => {
                  if (res.data === 1) {
                    likeIndexArr3.push(true);
                    setMakeupLikeState(likeIndexArr3);
                  } else if (res.data === 0) {
                    likeIndexArr3.push(undefined);
                    setMakeupLikeState(likeIndexArr3);
                  } else {
                    //로그인하지 않았을 때
                    likeIndexArr3.push(-1);
                    setMakeupLikeState(likeIndexArr3);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });

              axios
                .get(`/item/getItemList/${newitemId}`)
                .then((res) => {
                  let newItem = res.data;
                  itemDataArr3.push(newItem);
                  itemDataArr3.sort(function (a, b) {
                    return (
                      new Date(b.itemWriteDate) - new Date(a.itemWriteDate)
                    );
                  });
                  setMakeupItem([...makeupItem, newItem]);
                  setMakeupItem(itemDataArr3);
                  let itemNameList = [];
                  let itemLikeList = [];
                  for (var j = 0; j < itemDataArr3.length; j++) {
                    const newItemName = itemDataArr3[j].itemName;
                    const newItemLike = itemDataArr3[j].like.length;
                    itemNameList.push(newItemName);
                    itemLikeList.push(newItemLike);
                    setMakeupItemName(itemNameList);
                    setMakeupItemLike(itemLikeList);
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
    //신혼여행
    axios
      .get(`/item/itemList/${category[4]}`)
      .then((res) => {
        const dataList = res.data;

        if (dataList.length !== 0) {
          let index = 0;
          for (var i = 0; i < dataList.length; i++) {
            if (i % 2 === 0) {
              let dataUrl = "data:image/jpeg;base64," + dataList[i];
              previewImgArr4.push(dataUrl);
              setHoneyMoonImg(previewImgArr4);
            } else {
              let newitemId = dataList[i];
              list4.push(newitemId);
              setHoneyMoonItemId(list4);
              keyIndexArr4.push(index);
              index++;
              setHoneyMoonKeyIndex(keyIndexArr4);
              axios
                .post(`/like/findlist`, {
                  itemId: newitemId,
                  email: sessionStorage.getItem("email"),
                })
                .then((res) => {
                  if (res.data === 1) {
                    likeIndexArr4.push(true);
                    setHoneyMoonLikeState(likeIndexArr4);
                  } else if (res.data === 0) {
                    likeIndexArr4.push(undefined);
                    setHoneyMoonLikeState(likeIndexArr4);
                  } else {
                    //로그인하지 않았을 때
                    likeIndexArr4.push(-1);
                    setHoneyMoonLikeState(likeIndexArr4);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });

              axios
                .get(`/item/getItemList/${newitemId}`)
                .then((res) => {
                  let newItem = res.data;
                  itemDataArr4.push(newItem);
                  itemDataArr4.sort(function (a, b) {
                    return (
                      new Date(b.itemWriteDate) - new Date(a.itemWriteDate)
                    );
                  });
                  setHoneyMoonItem([...honeyMoonItem, newItem]);
                  setHoneyMoonItem(itemDataArr4);
                  let itemNameList = [];
                  let itemLikeList = [];
                  for (var j = 0; j < itemDataArr4.length; j++) {
                    const newItemName = itemDataArr4[j].itemName;
                    const newItemLike = itemDataArr4[j].like.length;
                    itemNameList.push(newItemName);
                    itemLikeList.push(newItemLike);
                    setHoneyMoonItemName(itemNameList);
                    setHoneyMoonItemLike(itemLikeList);
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
    //부케
    axios
      .get(`/item/itemList/${category[5]}`)
      .then((res) => {
        const dataList = res.data;

        if (dataList.length !== 0) {
          let index = 0;
          for (var i = 0; i < dataList.length; i++) {
            if (i % 2 === 0) {
              let dataUrl = "data:image/jpeg;base64," + dataList[i];
              previewImgArr5.push(dataUrl);
              setBouquetImg(previewImgArr5);
            } else {
              let newitemId = dataList[i];
              list5.push(newitemId);
              setBouquetItemId(list5);
              keyIndexArr5.push(index);
              index++;
              setBouquetKeyIndex(keyIndexArr5);
              axios
                .post(`/like/findlist`, {
                  itemId: newitemId,
                  email: sessionStorage.getItem("email"),
                })
                .then((res) => {
                  if (res.data === 1) {
                    likeIndexArr5.push(true);
                    setBouquetLikeState(likeIndexArr5);
                  } else if (res.data === 0) {
                    likeIndexArr5.push(undefined);
                    setBouquetLikeState(likeIndexArr5);
                  } else {
                    //로그인하지 않았을 때
                    likeIndexArr5.push(-1);
                    setBouquetLikeState(likeIndexArr5);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });

              axios
                .get(`/item/getItemList/${newitemId}`)
                .then((res) => {
                  let newItem = res.data;
                  itemDataArr5.push(newItem);
                  itemDataArr5.sort(function (a, b) {
                    return (
                      new Date(b.itemWriteDate) - new Date(a.itemWriteDate)
                    );
                  });
                  setBouquetItem([...bouquetItem, newItem]);
                  setBouquetItem(itemDataArr5);
                  let itemNameList = [];
                  let itemLikeList = [];
                  for (var j = 0; j < itemDataArr5.length; j++) {
                    const newItemName = itemDataArr5[j].itemName;
                    const newItemLike = itemDataArr5[j].like.length;
                    itemNameList.push(newItemName);
                    itemLikeList.push(newItemLike);
                    setBouquetItemName(itemNameList);
                    setBouquetItemLike(itemLikeList);
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

  const showimgDetail = (e) => {
    modalImg.current.src = e.target.dataset.bsSrc;
    const index = e.target.dataset.bsKeyindex;
    modalItemId.current.id = e.target.dataset.bsItemid;
    modalItemId.current.dataset.index = index;
    setSelectedCategory(e.target.dataset.bsCategory);

    if (e.target.dataset.bsCategory === category[0]) {
      modalItemId.current.dataset.category = category[0];
      modalImgContent.current.innerText = item[index].imgContent;
      modalImgTitle.current.innerText = `- ${item[index].itemName} -`;
      setSelectLikeState(weddingHallLikeState[index]);
      if (weddingHallLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === category[1]) {
      modalItemId.current.dataset.category = category[1];
      modalImgContent.current.innerText = studioItem[index].imgContent;
      modalImgTitle.current.innerText = `- ${studioItem[index].itemName} -`;
      setSelectLikeState(studioLikeState[index]);
      if (studioLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === category[2]) {
      modalItemId.current.dataset.category = category[2];
      modalImgContent.current.innerText = dressItem[index].imgContent;
      modalImgTitle.current.innerText = `- ${dressItem[index].itemName} -`;
      setSelectLikeState(dressLikeState[index]);
      if (dressLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === category[3]) {
      modalItemId.current.dataset.category = category[3];
      modalImgContent.current.innerText = makeupItem[index].imgContent;
      modalImgTitle.current.innerText = `- ${makeupItem[index].itemName} -`;
      setSelectLikeState(makeupLikeState[index]);
      if (makeupLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === category[4]) {
      modalItemId.current.dataset.category = category[4];
      modalImgContent.current.innerText = honeyMoonItem[index].imgContent;
      modalImgTitle.current.innerText = `- ${honeyMoonItem[index].itemName} -`;
      setSelectLikeState(honeyMoonLikeState[index]);
      if (honeyMoonLikeState[index] === true) {
        modalItemId.current.style.backgroundColor = "#fce1e4";
        setChangeModalBackgroundColor(true);
      } else {
        modalItemId.current.style.backgroundColor = "#ebebeb";
        setChangeModalBackgroundColor(false);
      }
    } else if (e.target.dataset.bsCategory === category[5]) {
      modalItemId.current.dataset.category = category[5];
      modalImgContent.current.innerText = bouquetItem[index].imgContent;
      modalImgTitle.current.innerText = `- ${bouquetItem[index].itemName} -`;

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

  const manageLikeLikst = (e) => {
    let newlikeState = undefined;
    const index = modalItemId.current.dataset.index;

    setCheckLike(!checkLike);
    if (modalItemId.current.dataset.category === category[0]) {
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
    } else if (modalItemId.current.dataset.category === category[1]) {
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
    } else if (modalItemId.current.dataset.category === category[2]) {
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
    } else if (modalItemId.current.dataset.category === category[3]) {
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
    } else if (modalItemId.current.dataset.category === category[4]) {
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
    } else if (modalItemId.current.dataset.category === category[5]) {
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
  // console.log("weddinghall : ");
  // console.log(weddingHallLikeState);
  // console.log("studio:");
  // console.log(studioLikeState);
  // console.log("dress:");
  // console.log(dressLikeState);
  // console.log("makeup:");
  // console.log(makeupLikeState);
  // console.log("honeymoon:");
  // console.log(honeyMoonLikeState);
  // console.log("bouquet:");
  // console.log(bouquetLikeState);

  useEffect(() => {
    if (selectedCategory === category[0]) {
      keyIndex.forEach((index) => {
        if (weddingHallLikeState[index] === false) {
          // console.log("deleteitem:" + itemId[index]);
          setChangeModalBackgroundColor(false);
          axios
            .post(`/like/delete`, {
              itemId: itemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              // console.log("delete");
              // console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (weddingHallLikeState[index] === true) {
          setChangeModalBackgroundColor(true);
          axios
            .post(`/like/create`, {
              itemId: itemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              // console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    } else if (selectedCategory === category[1]) {
      studioKeyIndex.forEach((index) => {
        if (studioLikeState[index] === false) {
          setChangeModalBackgroundColor(false);
          // console.log("deleteitem:" + studioItemId[index]);
          axios
            .post(`/like/delete`, {
              itemId: studioItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              // console.log("delete");
              // console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (studioLikeState[index] === true) {
          setChangeModalBackgroundColor(true);
          axios
            .post(`/like/create`, {
              itemId: studioItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              // console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    } else if (selectedCategory === category[2]) {
      dressKeyIndex.forEach((index) => {
        if (dressLikeState[index] === false) {
          setChangeModalBackgroundColor(false);
          //   console.log("deleteitem:" + dressItemId[index]);
          axios
            .post(`/like/delete`, {
              itemId: dressItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //   console.log("delete");
              //   console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (dressLikeState[index] === true) {
          setChangeModalBackgroundColor(true);
          axios
            .post(`/like/create`, {
              itemId: dressItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //   console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    } else if (selectedCategory === category[3]) {
      makeupKeyIndex.forEach((index) => {
        if (makeupLikeState[index] === false) {
          setChangeModalBackgroundColor(false);
          // console.log("deleteitem:" + makeupItemId[index]);
          axios
            .post(`/like/delete`, {
              itemId: makeupItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //  console.log("delete");
              //  console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (makeupLikeState[index] === true) {
          setChangeModalBackgroundColor(true);
          axios
            .post(`/like/create`, {
              itemId: makeupItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //    console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    } else if (selectedCategory === category[4]) {
      honeyMoonKeyIndex.forEach((index) => {
        if (honeyMoonLikeState[index] === false) {
          setChangeModalBackgroundColor(false);
          //  console.log("deleteitem:" + honeyMoonItemId[index]);
          axios
            .post(`/like/delete`, {
              itemId: honeyMoonItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //   console.log("delete");
              //   console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (honeyMoonLikeState[index] === true) {
          setChangeModalBackgroundColor(true);
          axios
            .post(`/like/create`, {
              itemId: honeyMoonItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //     console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    } else if (selectedCategory === category[5]) {
      bouquetKeyIndex.forEach((index) => {
        if (bouquetLikeState[index] === false) {
          setChangeModalBackgroundColor(false);
          //  console.log("deleteitem:" + bouquetItemId[index]);
          axios
            .post(`/like/delete`, {
              itemId: bouquetItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //  console.log("delete");
              //  console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (bouquetLikeState[index] === true) {
          setChangeModalBackgroundColor(true);
          axios
            .post(`/like/create`, {
              itemId: bouquetItemId[index],
              email: sessionStorage.getItem("email"),
            })
            .then((res) => {
              //   console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    }
  }, [checkLike]);

  return (
    <div className="mainlayout">
      <div className="header">
        <img
          className="mainlogo"
          src={imgLogo}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/login");
          }}
          alt="로고"
        />
        <input
          type="text"
          name="search"
          className="searchbar"
          placeholder="검색어를 입력하세요!"
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
                  height: "400px",
                }}
              >
                <img
                  id={0}
                  style={{
                    width: "400px",
                    height: "340px",
                    marginLeft: "25px",
                    cursor: "pointer",
                  }}
                  src={previewImg[0]} //previewImg배열 하나하나요소가 src에 들어가야 함.
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={previewImg[0]}
                  data-bs-category={category[0]}
                  data-bs-keyIndex={0}
                  data-bs-itemId={itemId[0]}
                  onClick={showimgDetail}
                  alt="..."
                />
                <br />
                <div className="itemName" style={{ marginTop: "-10px" }}>
                  {itemName[0]}&nbsp;&nbsp; ❤️
                  {itemLike[0]}
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
                      height: "400px",
                    }}
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "340px",
                        marginLeft: "25px",
                        cursor: "pointer",
                      }}
                      onClick={showimgDetail}
                      data-bs-toggle="modal"
                      data-bs-target="#imgDetailModal"
                      data-bs-src={previewImg[i]}
                      data-bs-category={category[0]}
                      data-bs-keyIndex={i}
                      data-bs-itemid={itemId[i]}
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
                          onClick={manageLikeLikst}
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
                          onClick={manageLikeLikst}
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
              <div
                class="carousel-item active"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "500px",
                  height: "450px",
                }}
              >
                <img
                  id="targetImg"
                  style={{
                    width: "400px",
                    height: "400px",
                    marginLeft: "25px",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={studioImg[0]}
                  data-bs-category={category[1]}
                  data-bs-keyIndex={0}
                  data-bs-itemId={studioItemId[0]}
                  onClick={showimgDetail}
                  src={studioImg[0]}
                  alt="..."
                />
                <br />
                <div className="itemName" style={{ marginTop: "-10px" }}>
                  {studioItemName[0]}&nbsp;&nbsp; ❤️{studioItemLike[0]}
                </div>
              </div>

              {studioKeyIndex.map((i) =>
                i === 0 ? null : (
                  <div
                    class="carousel-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "500px",
                      height: "450px",
                    }}
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "400px",
                        marginLeft: "25px",
                        cursor: "pointer",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#imgDetailModal"
                      data-bs-src={studioImg[i]}
                      data-bs-category={category[1]}
                      data-bs-keyIndex={i}
                      data-bs-itemid={studioItemId[i]}
                      onClick={showimgDetail}
                      src={studioImg[i]}
                      alt="..."
                    />
                    <br />
                    <div className="itemName" style={{ marginTop: "-10px" }}>
                      {studioItemName[i]} &nbsp;&nbsp;❤️{studioItemLike[i]}
                    </div>
                  </div>
                )
              )}
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
              <div
                class="carousel-item active"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "500px",
                  height: "530px",
                }}
              >
                <img
                  id="targetImg"
                  style={{
                    width: "400px",
                    height: "480px",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={dressImg[0]}
                  data-bs-category={category[2]}
                  data-bs-keyIndex={0}
                  data-bs-itemId={dressItemId[0]}
                  onClick={showimgDetail}
                  src={dressImg[0]} //previewImg배열 하나하나요소가 src에 들어가야 함.
                  alt="..."
                />
                <br />
                <div className="itemName" style={{ marginTop: "-10px" }}>
                  {dressItemName[0]}&nbsp;&nbsp; ❤️{dressItemLike[0]}
                </div>
              </div>

              {dressKeyIndex.map((i) =>
                i === 0 ? null : (
                  <div
                    class="carousel-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "500px",
                      height: "530px",
                    }}
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "480px",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#imgDetailModal"
                      data-bs-src={dressImg[i]}
                      data-bs-category={category[2]}
                      data-bs-keyIndex={i}
                      data-bs-itemid={dressItemId[i]}
                      onClick={showimgDetail}
                      src={dressImg[i]}
                      alt="..."
                    />
                    <br />
                    <div className="itemName" style={{ marginTop: "-10px" }}>
                      {dressItemName[i]} &nbsp;&nbsp;❤️{dressItemLike[i]}
                    </div>
                  </div>
                )
              )}
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
              <div
                class="carousel-item active"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "500px",
                  height: "530px",
                }}
              >
                <img
                  id="targetImg"
                  style={{
                    width: "400px",
                    height: "460px",
                    marginLeft: "25px",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={makeupImg[0]}
                  data-bs-category={category[3]}
                  data-bs-keyIndex={0}
                  data-bs-itemId={makeupItemId[0]}
                  onClick={showimgDetail}
                  src={makeupImg[0]} //previewImg배열 하나하나요소가 src에 들어가야 함.
                  alt="..."
                />
                <br />
                <div className="itemName" style={{ marginTop: "-10px" }}>
                  {makeupItemName[0]}&nbsp;&nbsp; ❤️{makeupItemLike[0]}
                </div>
              </div>

              {makeupKeyIndex.map((i) =>
                i === 0 ? null : (
                  <div
                    class="carousel-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "500px",
                      height: "530px",
                    }}
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "460px",
                        marginLeft: "25px",
                        cursor: "pointer",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#imgDetailModal"
                      data-bs-src={makeupImg[i]}
                      data-bs-category={category[3]}
                      data-bs-keyIndex={i}
                      data-bs-itemid={makeupItemId[i]}
                      onClick={showimgDetail}
                      src={makeupImg[i]}
                      alt="..."
                    />
                    <br />
                    <div className="itemName" style={{ marginTop: "-10px" }}>
                      {makeupItemName[i]} &nbsp;&nbsp;❤️{makeupItemLike[i]}
                    </div>
                  </div>
                )
              )}
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
              <div
                class="carousel-item active"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "500px",
                  height: "430px",
                }}
              >
                <img
                  id="targetImg"
                  style={{
                    width: "400px",
                    height: "380px",
                    marginLeft: "25px",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={honeyMoonImg[0]}
                  data-bs-category={category[4]}
                  data-bs-keyIndex={0}
                  data-bs-itemId={honeyMoonItemId[0]}
                  onClick={showimgDetail}
                  src={honeyMoonImg[0]} //previewImg배열 하나하나요소가 src에 들어가야 함.
                  alt="..."
                />
                <br />
                <div className="itemName" style={{ marginTop: "-10px" }}>
                  {honeyMoonItemName[0]}&nbsp;&nbsp; ❤️{honeyMoonItemLike[0]}
                </div>
              </div>

              {honeyMoonKeyIndex.map((i) =>
                i === 0 ? null : (
                  <div
                    class="carousel-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "500px",
                      height: "430px",
                    }}
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "380px",
                        marginLeft: "25px",
                        cursor: "pointer",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#imgDetailModal"
                      data-bs-src={honeyMoonImg[i]}
                      data-bs-category={category[4]}
                      data-bs-keyIndex={i}
                      data-bs-itemid={honeyMoonItemId[i]}
                      onClick={showimgDetail}
                      src={honeyMoonImg[i]}
                      alt="..."
                    />
                    <br />
                    <div className="itemName" style={{ marginTop: "-10px" }}>
                      {honeyMoonItemName[i]} &nbsp;&nbsp;❤️
                      {honeyMoonItemLike[i]}
                    </div>
                  </div>
                )
              )}
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
              <div
                class="carousel-item active"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "500px",
                  height: "450px",
                }}
              >
                <img
                  id="targetImg"
                  style={{
                    width: "400px",
                    height: "400px",
                    marginLeft: "25px",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#imgDetailModal"
                  data-bs-src={bouquetImg[0]}
                  data-bs-category={category[5]}
                  data-bs-keyIndex={0}
                  data-bs-itemId={bouquetItemId[0]}
                  onClick={showimgDetail}
                  src={bouquetImg[0]} //previewImg배열 하나하나요소가 src에 들어가야 함.
                  alt="..."
                />
                <br />
                <div className="itemName" style={{ marginTop: "-10px" }}>
                  {bouquetItemName[0]}&nbsp;&nbsp; ❤️{bouquetItemLike[0]}
                </div>
              </div>

              {bouquetKeyIndex.map((i) =>
                i === 0 ? null : (
                  <div
                    class="carousel-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "500px",
                      height: "450px",
                    }}
                  >
                    <img
                      style={{
                        width: "400px",
                        height: "400px",
                        marginLeft: "25px",
                        cursor: "pointer",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#imgDetailModal"
                      data-bs-src={bouquetImg[i]}
                      data-bs-category={category[5]}
                      data-bs-keyIndex={i}
                      data-bs-itemid={bouquetItemId[i]}
                      onClick={showimgDetail}
                      src={bouquetImg[i]}
                      alt="..."
                    />
                    <br />
                    <div className="itemName" style={{ marginTop: "-10px" }}>
                      {bouquetItemName[i]} &nbsp;&nbsp;❤️{bouquetItemLike[i]}
                    </div>
                  </div>
                )
              )}
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
