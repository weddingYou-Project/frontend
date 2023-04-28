import BackButton from "./Backbutton";
import "../Css/NavigationBar.css";
import MyEstimate from "./MyEstimate";

function NavigationBar({ title }) {
  return (
    <div className="navigationbar">
      <BackButton />
      <p>{title}</p>
      <MyEstimate />
    </div>
  );
}

export default NavigationBar;
