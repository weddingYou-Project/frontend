import BackButton from "./Backbutton";
import "../Css/NavigationBar.css";
import MyEstimate from "./MyEstimate";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function NavigationBar({ title, goUpdate }) {
  const url = useLocation();
  const path = url.pathname;

  const [navigationBorder, setNavigationBorder] = useState(false);
  console.log(window.scrollY);
  window.addEventListener("scroll", () => {
    console.log(document.body.clientHeight);
    console.log("top:" + window.scrollY);
    if (0 <= window.scrollY && window.scrollY < 1) {
      setNavigationBorder(true);
    } else {
      setNavigationBorder(false);
    }
  });

  const navigate = useNavigate();
  return (
    <div>
      {navigationBorder === true ? (
        <div
          className="navigationbar"
          style={{
            position: "fixed",
            backgroundColor: "white",
            borderTop: "1px solid rgb(173, 166, 166)",
            width: "556px",
            borderRadius: "10px 10px 0  0",
            boxSizing: "border-box",
            top: 0,
            paddingTop: "10px",
          }}
        >
          <BackButton />
          <p style={{ fontSize: "1.8em", marginTop: "10px" }}>{title} </p>
          {path.indexOf("likeList") === 1 ? (
            <button
              className="btn btn-primary"
              style={{
                height: "40px",
                marginTop: "10px",
                marginRight: "-40px",
                marginLeft: "-30px",
              }}
              onClick={(e) => {
                goUpdate();
              }}
            >
              update
            </button>
          ) : null}
          {path.indexOf("mypage") === 1 && path.indexOf("userupdate") === -1 ? (
            <MyEstimate />
          ) : (
            <div className="empty"></div>
          )}
        </div>
      ) : (
        <div
          className="navigationbar"
          style={{
            position: "fixed",
            backgroundColor: "white",
            width: "556px",
            boxSizing: "border-box",
            top: 0,
            paddingTop: "10px",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <BackButton />
          <p style={{ fontSize: "1.8em" }}>{title} </p>
          {path.indexOf("likeList") === 1 ? (
            <button
              className="btn btn-primary"
              style={{
                height: "40px",
                marginTop: "10px",
                marginRight: "-40px",
                marginLeft: "-30px",
              }}
              onClick={(e) => {
                goUpdate();
              }}
            >
              update
            </button>
          ) : null}
          {path.indexOf("mypage") === 1 && path.indexOf("userupdate") === -1 ? (
            <MyEstimate />
          ) : (
            <div className="empty"></div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
