import "../Css/footer.css";
import "../Css/main.css";
import Footer from "../Components/Footer.js";
import NavigationBar from "../Components/NavigationBar";

function Home() {
  return (
    <div>
      <div class="mainlayout">
        <NavigationBar />
        <div class="content"></div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
