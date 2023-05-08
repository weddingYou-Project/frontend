import Footer from "../Components/Footer";
import Loadingimg1 from "../Assets/loading img1.jpg";
import Loadingimg2 from "../Assets/loading img2.jpg";
import Loadingimg3 from "../Assets/loading img3.jpg";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const num = Math.floor(Math.random() * 3);

  const images = [Loadingimg1, Loadingimg2, Loadingimg3];
  const navigate = useNavigate();
  return (
    <div
      className="mainlayout"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <p
          style={{
            fontSize: "1.5em",
            zIndex: 1,
            marginBottom: "30px",
            marginTop: "-30px",
          }}
        >
          Access Denied!😢
        </p>
        <img
          src={images[num]}
          alt=""
          style={{ width: "100%", height: "400px", marginBottom: "30px" }}
        />
        <button
          type="button"
          className="btn-colour-1 "
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
