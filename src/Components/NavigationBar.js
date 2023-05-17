import BackButton from "./Backbutton";
import "../Css/NavigationBar.css";
import MyEstimate from "./MyEstimate";
import { useLocation } from "react-router-dom";

function NavigationBar({ title }) {
  const url = useLocation();
  const path = url.pathname;
  return (
    <div className="navigationbar">
      <BackButton />
      <p style={{ fontSize: "1.8em" }}>{title} </p>
      {/* {path.indexOf("likeList") === 1 ? (
        <div
          className="btn btn-primary"
          style={{
            height: "40px",
            marginTop: "10px",
            marginRight: "-40px",
            marginLeft: "-30px",
          }}
        >
          update
        </div>
      ) : null} */}
      {path.indexOf("mypage") === 1 && path.indexOf("userupdate") === -1 ? (
        <MyEstimate />
      ) : (
        <div className="empty"></div>
      )}
    </div>
  );
}

export default NavigationBar;
