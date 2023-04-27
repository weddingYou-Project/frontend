import "../Css/Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="Signup-wrap">
      <div className="Signup-backicon"></div>
      <div className="Signup-header"></div>
      <div className="Signup-logo"></div>
      <div className="Signup-button">
        <button
          onClick={() => {
            navigate("./user");
          }}
        >
          일반회원
        </button>
        <button
          onClick={() => {
            navigate("./planner");
          }}
        >
          플래너 회원
        </button>
      </div>
    </div>
  );
}

export default Signup;
