import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import "../Css/menuList.css";

const menuItems = [
  { name: "웨딩홀", link: "./weddinghall" },
  { name: "스튜디오", link: "./studio" },
  { name: "의상", link: "./weddingoutfit" },
  { name: "메이크업", link: "./makeup" },
  { name: "신혼여행", link: "./honeymoon" },
  { name: "부케", link: "./bouquet" },
];

const MenuItem = ({ name, link }) => {
  return (
    <Link to={link} className="menu-list-item">
      <div className="menu-list-item-text">{name}</div>
    </Link>
  );
};

const MenuList = () => {
  const title = "메뉴";

  return (
    <div className="mainlayout">
      <NavigationBar title={title} />
      <div className="menu-content">
        <div className="menu-list">
          <div className="menu-list-left">
            {menuItems.slice(0, 3).map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
          <div className="menu-list-right">
            {menuItems.slice(3).map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuList;
