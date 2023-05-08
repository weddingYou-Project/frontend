import "../Css/footer.css";
import "../Css/main.css";
import Footer from "../Components/Footer.js";
import SearchBar from "../Components/SearchBar";

function Home() {
  return (
    <div>
      <div class="mainlayout">
        <SearchBar />
        <div class="content"></div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
