import Footer from "../Components/Footer";
import Loadingimg1 from "../Assets/loading img1.jpg";
import Loadingimg2 from "../Assets/loading img2.jpg";
import Loadingimg3 from "../Assets/loading img3.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../Components/Backbutton";
import "../Css/Signup.css";

function NotFound() {
  const [num, setNum] = useState(0);

  const images = [Loadingimg1, Loadingimg2, Loadingimg3];
  const [selectImg, setSelectImg] = useState();
  const navigate = useNavigate();
  let [top, setTop] = useState(20);
  let [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setTop(100);
      setOpacity(1);
    }, 200);
    setNum(Math.floor(Math.random() * 3));
    setSelectImg(images[num]);
  }, []);
  return (
    <div
      style={{ minHeight: "100vh", height: "700px", width: "100%", zIndex: 1 }}
    >
      <div
        className="mainlayout"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginLeft: "10px",
          }}
        >
          <BackButton />
        </div>
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
              marginTop: "-20px",
              top: top,
              opacity: opacity,
            }}
            className="Signup-SuccessMessage"
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
    </div>
  );
}

export default NotFound;
