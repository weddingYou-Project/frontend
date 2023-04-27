import BackButton from "./BackButton";
import "../Css/NavigationBar.css";
import MyEstimate from "./MyEstimate";

function NavigationBar({ title }) {
  return (
    <div class="navigationbar">
      <BackButton />
      <p>{title}</p>
      <MyEstimate />
    </div>
  );
}

export default NavigationBar;
