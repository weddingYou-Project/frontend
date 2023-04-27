import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/main.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button class="backbutton" onClick={() => navigate(-1)}>
      {" "}
      <i class="bi bi-chevron-left"></i>
    </button>
  );
}

export default BackButton;
