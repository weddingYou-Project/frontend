import BackButton from "./BackButton";
import "../Css/NavigationBar.css";
import MyEstimate from "./MyEstimate";

function NavigationBar() {
  return (
    <div class="navigationbar">
      <BackButton />
      <p>제목</p>
      <MyEstimate />
    </div>
  );
}

export default NavigationBar;
