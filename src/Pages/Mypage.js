import "../Css/main.css";
import NavigationBar from "../Components/NavigationBar";

function Mypage() {
  const title = "마이페이지";
  return (
    <div class="mypage">
      <NavigationBar title={title} />
    </div>
  );
}

export default Mypage;
