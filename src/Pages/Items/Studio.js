import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/menuList.css";
import "../../Css/items.css";

const Studio = () => {
  const { category1 } = useParams();
  const title = "스튜디오";
  const category2 = ["인물중심", "배경중심", "균형적인"];
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category2[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectLikeState, setSelectLikeState] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [itemId, setItemId] = useState(null);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/item/itemList");
        setImages(response.data);
      } catch (error) {
        console.error("이미지를 가져오는 중 오류 발생:", error);
      }
    };

    fetchImages();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
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
        setIsModalOpen(false);
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
      <div className="category-wrapper" style={{ marginTop: "100px" }}>
        {category2.map((category) => (
          <div
            key={category}
            className={`category ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="image-wrapper">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.title}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={modalStyles}
        >
          {editMode ? (
            <>
              <img src={selectedImage.url} alt={selectedImage.title} />
              <div className="post-inputwrap">
                <input
                  className="title-input"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                  className="content-textarea"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="button-wrap">
                <button className="edit-button" onClick={() => editItem()}>
                  저장
                </button>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => setEditMode(false)}
                >
                  취소
                </button>
              </div>
            </>
          ) : (
            <>
              <img src={selectedImage.url} alt={selectedImage.title} />
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.content}</p>
              {selectLikeState === true ? (
                <button
                  style={{
                    width: "110px",
                    marginBottom: "10px",
                    fontSize: "1em",
                    background: "none",
                    border: "none",
                    padding: "5px 20px",
                  }}
                  onClick={manageLikeList}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="red"
                    class="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                  찜하기
                </button>
              ) : (
                <button
                  style={{
                    width: "110px",
                    marginBottom: "10px",
                    fontSize: "1em",
                    background: "none",
                    border: "none",
                    padding: "5px 20px",
                  }}
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
                  </svg>
                  찜하기
                </button>
              )}
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
            </>
          )}
        </Modal>
      )}
      {isAdmin && (
        <button
          className="submit-button"
          onClick={() => {
            window.location.href = `/writepost/${category1}`;
          }}
        >
          글쓰기
        </button>
      )}
      <Footer />
    </div>
  );
};

export default Studio;
