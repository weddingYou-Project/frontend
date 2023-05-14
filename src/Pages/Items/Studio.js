import React, { useState } from "react";
import Modal from "react-modal";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/menuList.css";
import "../../Css/items.css";
import { Link } from "react-router-dom";

const Studio = () => {
  const title = "스튜디오";
  const categories = ["인물중심", "배경중심", "균형적인"];
  const images = [
    {
      src: `${process.env.PUBLIC_URL}/items/wh_1.jpg`,
      alt: "이미지 1",
      category: "인물중심",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const handleEditClick = () => {
    setEditingImage(selectedImage);
    setEditedImage({ ...selectedImage });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingImage(null);
    setEditedImage(null);
  };

  const handleSaveEdit = () => {
    const index = images.findIndex((image) => image.src === selectedImage.src);
    images[index] = editedImage;
    setSelectedImage(editedImage);
    setIsEditing(false);
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        {categories.map((category) => (
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
          .filter((image) => image.category === selectedCategory)
          .map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
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
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
            {isEditing ? (
              <div className="modal-info">
                <input
                  type="text"
                  name="alt"
                  value={editedImage.alt}
                  onChange={handleImageChange}
                />
                <select
                  name="category"
                  value={editedImage.category}
                  onChange={handleImageChange}
                >
                  {categories.map((category) => (
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
                <div className="modal-title">{selectedImage.alt}</div>
                <div className="modal-category">{selectedImage.category}</div>
                <div className="modal-actions">
                  <button onClick={handleEditClick}>수정</button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      <Link to="/writepost">글쓰기</Link>
      <Footer />
    </div>
  );
};

export default Studio;
