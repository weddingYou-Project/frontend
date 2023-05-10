import React, { useState } from "react";
import Modal from "react-modal";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/menuList.css";
import "../../Css/items.css";
import { Link } from "react-router-dom";

const Weddinghall = () => {
  const title = "웨딩홀";
  const categories = ["일반", "호텔", "채플", "스몰", "야외", "전통혼례"];
  const images = [
    {
      src: `${process.env.PUBLIC_URL}/items/wh_1.jpg`,
      alt: "웨딩홀 이미지 1",
      category: "일반",
    },
    {
      src: `${process.env.PUBLIC_URL}/items/wh_2.jpg`,
      alt: "웨딩홀 이미지 2",
      category: "일반",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
            <div className="modal-info"></div>
          </div>
        </Modal>
      )}

      <Link to="/writepost">글쓰기</Link>
      <Footer />
    </div>
  );
};

export default Weddinghall;
