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
      {path.indexOf("mypage") === 1 && path.indexOf("userupdate") === -1 ? (
        <MyEstimate />
      ) : (
        <div className="empty"></div>
      )}
    </div>
  );
}

export default NavigationBar;
