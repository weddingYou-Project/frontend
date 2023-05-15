import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import "../Css/menuList.css";

const Category1 = [
  { label: "웨딩홀", value: "weddinghall" },
  { label: "웨딩 의상", value: "weddingoutfit" },
  { label: "스튜디오", value: "studio" },
  { label: "메이크업", value: "makeup" },
  { label: "신혼여행", value: "honeymoon" },
  { label: "꽃다발", value: "bouquet" },
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
              <Link
                className="menu-list-item"
                to={{
                  pathname: `/menu/${category1.value}`,
                  state: { label: category1.label },
                }}
              >
                {category1.label}
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
