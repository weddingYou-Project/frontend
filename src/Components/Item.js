import React from "react";
import Weddinghall from "../Pages/Items/Weddinghall";
import Weddingoutfit from "../Pages/Items/Weddingoutfit";
import Studio from "../Pages/Items/Studio";
import Makeup from "../Pages/Items/Makeup";
import Bouquet from "../Pages/Items/Bouquet";
import Honeymoon from "../Pages/Items/Honeymoon";
import NotFound from "../Pages/NotFound";
import { useParams } from "react-router-dom";

const Item = () => {
  const { category1 } = useParams();

  switch (category1) {
    case "웨딩홀":
      return <Weddinghall />;
    case "의상":
      return <Weddingoutfit />;
    case "스튜디오":
      return <Studio />;
    case "메이크업":
      return <Makeup />;
    case "신혼여행":
      return <Honeymoon />;
    case "부케":
      return <Bouquet />;
    default:
      return <NotFound />;
  }
};

export default Item;
