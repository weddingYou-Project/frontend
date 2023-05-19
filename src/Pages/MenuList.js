import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import "../Css/menuList.css";

const Category1 = [
  { label: "웨딩홀", value: "weddinghall" },
  { label: "의상", value: "weddingoutfit" },
  { label: "스튜디오", value: "studio" },
  { label: "메이크업", value: "makeup" },
  { label: "신혼여행", value: "honeymoon" },
  { label: "부케", value: "bouquet" },
];

const Service = [
  { label: "공지사항", value: "notice" },
  { label: "고객센터", value: "customerservice" },
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
              <Link className="menu-list-item" to={`/menu/${category1.value}`}>
                {category1.label}
              </Link>
            </h2>
          </div>
        ))}
      </div>
      <div className="service-menu-list">
        {Service.map((service, index) => (
          <div key={index} className="menu-list-item-container">
            <h2>
              <Link className="menu-list-item" to={`/${service.value}`}>
                {service.label}
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
