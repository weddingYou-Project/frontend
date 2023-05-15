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
  const title = category1;
  const category2 = ["인물중심", "배경중심", "균형적인"];
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category2[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedImage, setEditedImage] = useState(null);

  useEffect(() => {
    axios
      .get("/item/itemList", {
        params: {
          category1: title,
          category2: selectedCategory,
        },
      })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [selectedCategory, title]);

  const handleEditClick = () => {
    setEditedImage(selectedImage);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedImage(null);
  };

  const handleSaveEdit = () => {
    axios
      .post(`/item/updateItem?itemId=${selectedImage.itemId}`, editedImage)
      .then((response) => {
        const updatedImage = response.data;
        const updatedImages = images.map((image) =>
          image.itemId === updatedImage.itemId ? updatedImage : image
        );
        setImages(updatedImages);
        setSelectedImage(updatedImage);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating image: ", error);
      });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (event) => {
    const { name, value } = event.target;
    setEditedImage({
      ...editedImage,
      [name]: value,
    });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 999,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "80%",
      padding: "2rem",
    },
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={title} />
      <div className="category-wrapper">
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
        {images
          .filter((image) => image.category2 === selectedCategory)
          .map((image) => (
            <img
              key={image.itemId}
              src={image.itemImg}
              alt={image.content}
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
          <div className="modal-content">
            <div className="modal-image">
              <img src={selectedImage.itemImg} alt={selectedImage.content} />
            </div>
            {isEditing ? (
              <div className="modal-info">
                <input
                  type="text"
                  name="content"
                  value={editedImage.content}
                  onChange={handleImageChange}
                />
                <select
                  name="category2"
                  value={editedImage.category2}
                  onChange={handleImageChange}
                >
                  {category2.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="modal-actions">
                  <button onClick={handleSaveEdit}>저장</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              </div>
            ) : (
              <div className="modal-info">
                <div className="modal-title">{selectedImage.content}</div>
                <div className="modal-category">{selectedImage.category2}</div>
                <div className="modal-actions">
                  <button onClick={handleEditClick}>수정</button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      <Link to={`/writepost/${category1}`}>글쓰기</Link>
      <Footer />
    </div>
  );
};
export default Studio;
