import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="backicon">
      <button class="backbutton" onClick={() => navigate(-1)}>
        <i class="bi bi-chevron-left"></i>
      </button>
    </div>
  );
}

export default BackButton;
