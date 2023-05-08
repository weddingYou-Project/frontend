import BackButton from "./Backbutton";
import "../Css/NavigationBar.css";
import MyEstimate from "./MyEstimate";
import { useLocation } from "react-router-dom";
import imgLogo from "../Assets/logo.png";

function SearchBar({ title }) {
  const url = useLocation();
  const path = url.pathname;
  return (
    <div className="navigationbar">
      <img
        className="logo"
        src={imgLogo}
        alt="로고"
        style={{ width: "70px", height: "70px", margin: 0 }}
      />
      <nav class="navbar bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">Navbar</a>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default SearchBar;
