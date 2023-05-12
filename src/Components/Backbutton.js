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
          console.log(path);
          if (
            path === "/mypage/user" ||
            path === "/mypage/planner" ||
            path === "/login"
          ) {
            navigate("/");
          } else if (path === "/passwordSearch") {
            navigate("/login");
          } else if (path === "/passwordSearch/temporaryPasswordLogin") {
            navigate("/passwordSearch");
          } else if (
            path === "/passwordSearch/temporaryPasswordLogin/passwordChange"
          ) {
            navigate("/passwordSearch/temporaryPasswordLogin");
          } else if (path === "/signup") {
            navigate("/login");
          } else if (path === "/signup/user" || path === "/signup/planner") {
            navigate("/login");
          } else if (path.indexOf("/user/userupdate") !== -1) {
            navigate("/mypage/user");
          } else if (path.indexOf("/planner/userupdate") !== -1) {
            navigate("/mypage/planner");
          } else {
            navigate("/");
          }
        }}
      >
        <i class="bi bi-chevron-left"></i>
      </button>
    </div>
  );
}

export default BackButton;
