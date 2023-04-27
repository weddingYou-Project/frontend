import BackButton from "./BackButton";
import "../Css/NavigationBar.css";

function NavigationBar() {
  return (
    <div class="navigationbar">
      <BackButton />
      <p>제목</p>
    </div>
  );
}

export default NavigationBar;
