import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import NavigationBar from "../../Components/NavigationBar";
import Footer from "../../Components/Footer";
import "../../Css/menuList.css";
import "../../Css/items.css";

const Weddinghall = ({ postSubmitted }) => {
  const { category1 } = useParams();
  const title = category1;
  const category2 = ["일반", "호텔", "채플", "스몰", "야외", "전통혼례"];
  const [selectedCategory, setSelectedCategory] = useState(category2[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        {/* 이미지 나열 */}
        {/* 눌렀을 때 모달창 열림 */}
      </div>
      {selectedImage && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={modalStyles}
        >
          {/* 해당 이미지 보여주고 제목, 내용 */}
          {/* 좋아요? 찜? 버튼 */}
          {/* 수정, 삭제버튼 */}
        </Modal>
      )}

      <Link to={`/writepost/${category1}`}>글쓰기</Link>
      <Footer />
    </div>
  );
};

export default Weddinghall;
