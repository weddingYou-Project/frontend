import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import "../Css/menuList.css";

const Category1 = [
  "웨딩홀",
  "의상",
  "스튜디오",
  "메이크업",
  "신혼여행",
  "부케",
];

const MenuList = () => {
  const title = "메뉴";

  return (
    <div className="mainlayout">
      <NavigationBar title={title} />
      <div className="menu-list">
        {Category1.map((category1, index) => (
          <div key={index} className="menu-list-item-container">
            <h2>
              <Link className="menu-list-item" to={`/menu/${category1}`}>
                {category1}
              </Link>
            </h2>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MenuList;
