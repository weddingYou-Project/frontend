import "../Css/Signup.css";
import "../Css/main.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import "../Css/mypage.css";
import NavigationBar from "../Components/NavigationBar";
function Signup() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="bg">
      <div className="mainlayout">
        <NavigationBar title={"회원가입"} />

        <div className="Signup-logo"></div>

        <div className="Signup-button">
          <button
            onClick={() => {
              navigate("./user");
            }}
            className="btn-colour-1"
            style={{ marginRight: "15px" }}
          >
            일반회원
          </button>
          <button
            onClick={() => {
              navigate("./planner");
            }}
            className="btn-colour-1"
          >
            플래너 회원
          </button>
        </div>
        {/*빈공간 채우는 박스입니다. */}
        <div style={{ height: 150 }}></div>
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
