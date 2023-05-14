import React, { useState } from "react";
import Modal from "react-modal";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/menuList.css";
import "../../Css/items.css";
import { Link } from "react-router-dom";

const Makeup = () => {
  const title = "메이크업";
  const categories = ["헤어", "메이크업"];
  const images = [
    {
      src: `${process.env.PUBLIC_URL}/items/wh_1.jpg`,
      alt: "웨딩홀 이미지 1",
      category: "헤어",
    },
    {
      src: `${process.env.PUBLIC_URL}/items/wh_2.jpg`,
      alt: "웨딩홀 이미지 2",
      category: "피부",
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
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
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

export default Makeup;
