import "../Css/Signup.css";
import "../Css/main.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import "../Css/mypage.css";

function Signup() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="bg">
      <div className="mainlayout">
        <div className="Signup-backicon" onClick={handleBack}>
          <i class="bi bi-chevron-left" style={{ fontSize: 40 }}></i>
        </div>
        <div className="Signup-header">회원가입</div>

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
