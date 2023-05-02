import "../Css/Signup.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

function Signup() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="bg">
      <div className="Signup-wrap">
        <div className="Signup-backicon" onClick={handleBack}>
          <i class="bi bi-chevron-left" style={{ fontSize: 40 }}></i>
        </div>
        <div className="Signup-header">회원가입</div>

        <div className="Signup-logo"></div>

        <div className="Signup-button">
          {/*버튼 맘에 안드므로 다시 만들 예정임. */}
          <button
            onClick={() => {
              navigate("./user");
            }}
            className="btn-custom2"
          >
            일반회원
          </button>
          <button
            onClick={() => {
              navigate("./planner");
            }}
            className="btn-custom2"
          >
            플래너 회원
          </button>
        </div>
        {/*빈공간 채우는 박스입니다. */}
        <div style={{ height: 230 }}></div>
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
