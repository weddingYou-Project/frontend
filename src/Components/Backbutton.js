import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="backicon">
      <button
        class="backbutton"
        onClick={() => {
          if (path === "/mypage/user" || path === "/mypage/planner") {
            navigate("/");
          } else {
            navigate(-1);
          }
        }}
      >
        <i class="bi bi-chevron-left"></i>
      </button>
    </div>
  );
}

export default BackButton;
