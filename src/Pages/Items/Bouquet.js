import React, { useState } from "react";
import Modal from "react-modal";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/menuList.css";
import "../../Css/items.css";

const Bouquet = () => {
  const title = "부케";
  const categories = ["라운드", "드롭", "케스케이드", "핸드타이드"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = () => {
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
      <div className="image-wrapper">{/* 이미지 */}</div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={modalStyles}
      >
        <div className="modal-content">
          {/* 해당 이미지 */}
          <div className="modal-info">
            {/* 이미지 제목 */}
            {/* 좋아요 */}
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default Bouquet;
