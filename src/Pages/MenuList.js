import React from "react";
import "../Css/main.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import "../Css/menuList.css";
import { Link } from "react-router-dom";

const MenuList = () => {
  const title = "메뉴";
  const menuLeft = [
    { name: "웨딩홀", link: "./weddinghall" },
    { name: "스튜디오", link: "./studio" },
    { name: "드레스", link: "./dress" },
    { name: "메이크업", link: "./makeup" },
  ];

  const menuRight = [
    { name: "사진/영상", link: "./photo-video" },
    { name: "신혼여행", link: "./honeymoon" },
    { name: "남성예복", link: "./groom-wear" },
    { name: "부케", link: "./bouquet" },
  ];

  return (
    <div className="mainlayout">
      <NavigationBar title={title} />
      <div className="menu_content">
        <div className="menu_list">
          <div className="menu_list_left">
            {menuLeft.map((menu, index) => (
              <Link
                key={index}
                to={menu.link}
                className="menu_list_item"
                style={{ color: "#000" }}
              >
                <span className="menu_list_item_text">{menu.name}</span>
              </Link>
            ))}
          </div>
          <div className="menu_list_right">
            {menuRight.map((menu, index) => (
              <Link
                key={index}
                to={menu.link}
                className="menu_list_item"
                style={{ color: "#000" }}
              >
                <span className="menu_list_item_text">{menu.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuList;
