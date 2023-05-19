import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/menuList.css";
import "../../Css/items.css";

const Weddingoutfit = () => {
  const { category1 } = useParams();
  const title = "의상";
  const category2 = [
    "머메이드",
    "A라인",
    "H라인",
    "벨라인",
    "엠파이어",
    "프린세스",
    "남성예복",
    "한복",
  ];
  const category2_1 = ["남성예복", "한복"];
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category2[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectLikeState, setSelectLikeState] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const [previewImg, setPreviewImg] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemContent, setItemContent] = useState([]);
  const [keyIndex, setKeyIndex] = useState([]);

  let keyIndexArr = [];
  let list = [];
  let itemDataArr = [];
  let previewImgArr = [];
  let itemNameArr = [];
  let itemContentArr = [];

  const modalImg = useRef();
  const modalImgContent = useRef();
  const modalImgTitle = useRef();
  const modalItemId = useRef();

  useEffect(() => {
    axios
      .get(`/item/itemList/${title}/${selectedCategory}`)
      .then((res) => {
        const dataList = res.data;

        if (dataList.length !== 0) {
          let index = 0;
          for (var i = 0; i < dataList.length; ) {
            let dataUrl = "data:image/jpeg;base64," + dataList[i];
            previewImgArr.push(dataUrl);
            setPreviewImg(previewImgArr);
            i++;

            let newitemId = dataList[i];
            list.push(newitemId);
            setItemId(list);
            keyIndexArr.push(index);
            index++;
            setKeyIndex(keyIndexArr);
            i++;

            axios
              .get(`/item/getItemList/${newitemId}`)
              .then((res) => {
                let newItem = res.data;
                itemDataArr.push(newItem);
                itemDataArr.sort(function (a, b) {
                  return new Date(b.itemWriteDate) - new Date(a.itemWriteDate);
                });
                setItem([...item, newItem]);
                setItem(itemDataArr);
              })
              .catch((e) => {
                console.log(e);
              });

            let newitemName = dataList[i];
            itemNameArr.push(newitemName);
            setItemName(itemNameArr);
            i++;

            let newitemContent = dataList[i];
            itemContentArr.push(newitemContent);
            setItemContent(itemContentArr);
            i++;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedCategory]);

  const showimgDetail = (e) => {
    modalImg.current.src = e.target.dataset.bsSrc;
    modalImg.current.dataset.category = e.target.dataset.bsCategory;
    modalImgContent.current.innerText = e.target.dataset.bsItemcontent;
    modalImgTitle.current.innerText = `- ${e.target.dataset.bsItemname} -`;
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const manageLikeList = () => {
    setSelectLikeState(!selectLikeState);
    const likeData = {
      likeId: selectedImage.id,
    };

    axios
      .post("/", likeData)
      .then((response) => {
        console.log("좋아요 성공:", response.data);
      })
      .catch((error) => {
        console.error("좋아요 에러:", error);
      });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setItemId(selectedImage.id);
    setNewTitle(selectedImage.title);
    setNewContent(selectedImage.content);
  };

  const editItem = () => {
    let data = new FormData();
    data.append("file", file);
    data.append("itemId", itemId);
    data.append("title", newTitle);
    data.append("content", newContent);

    axios
      .put("/updateItem", data)
      .then((res) => {
        console.log(res.data);
        const updatedImages = images.map((image) => {
          if (image.id === res.data.id) {
            return res.data;
          } else {
            return image;
          }
        });
        setImages(updatedImages);
      })
      .catch((err) => {
        console.error(err);
      });

    setEditMode(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteClick = () => {
    axios
      .post("/", { itemId: selectedImage.id })
      .then((res) => {
        console.log(res.data);
        const updatedImages = images.filter(
          (image) => image.id !== selectedImage.id
        );
        setImages(updatedImages);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 999,
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "750px",
      height: "600px",
    },
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={title} />
      <div
        className=""
        style={{ marginTop: "100px", width: "100%", marginLeft: "20px" }}
      >
        {category2.map((category) => (
          <div
            key={category}
            className={`category ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
            style={{ fontSize: "1.3em", float: "left", marginBottom: "10px" }}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="image-wrapper" style={{ clear: "both" }}>
        {keyIndex.map((i) => (
          <img
            //   key={image.id}
            src={previewImg[i]}
            alt=""
            onClick={showimgDetail}
            data-bs-toggle="modal"
            data-bs-target="#imgDetailModal"
            style={{ cursor: "pointer" }}
            data-bs-src={previewImg[i]}
            data-bs-category="의상"
            data-bs-itemName={itemName[i]}
            data-bs-itemContent={itemContent[i]}
          />
        ))}
      </div>

      {isAdmin && (
        <button
          className="submit-button"
          onClick={() => {
            window.location.href = `/writepost/${category1}`;
          }}
          style={{ fontSize: "1.3em" }}
        >
          글쓰기
        </button>
      )}
      <Footer />
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
              {isAdmin && (
                <div className="button-wrapper">
                  <button className="edit-button" onClick={handleEditClick}>
                    수정
                  </button>
                  <button className="delete-button" onClick={handleDeleteClick}>
                    삭제
                  </button>
                </div>
              )}
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                //   onClick={gotoDetailInfo}
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
    </div>
  );
};

export default Weddingoutfit;
