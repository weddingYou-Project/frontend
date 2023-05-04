import Footer from "../Components/Footer";

function NotFound() {
  return (
    <div className="mainlayout">
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <p style={{ fontSize: "2em" }}>접근할 수 없는 페이지입니다!😢</p>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
