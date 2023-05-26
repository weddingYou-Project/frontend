import "../Css/main.css";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function QnA() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"Q&A"} />
      <div style={{ height: 70 }}></div>
      <div className="input-group input-group-lg searchSection">
        <span class="input-group-text" id="search">
          <i class="bi bi-search"></i>
        </span>
        <input
          className="form-control"
          placeholder="검색어를 입력해주세요"
          type="text"
          aria-describedby="search"
        />
      </div>
      <div className="noticeSection2">
        <tabel>
          <thead>
            <tr>
              <td style={{ width: 350 }}>
                <p className="noticeTxt">제목</p>
              </td>
              <td style={{ width: 120 }}>
                <p className="noticeTxtCenter">댓글</p>
              </td>
              <td style={{ width: 80 }}>
                <p className="noticeTxtCenter">조회수</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">Q&A TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">2</p>
              </td>
              <td>
                <p className="noticeTxtCenter">14</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">Q&A TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">6</p>
              </td>
              <td>
                <p className="noticeTxtCenter">23</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">Q&A TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">4</p>
              </td>
              <td>
                <p className="noticeTxtCenter">21</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">Q&A TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">3</p>
              </td>
              <td>
                <p className="noticeTxtCenter">16</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: 50 }}>
                <a className="noticeTxt">Q&A TitleSample</a>
              </td>
              <td>
                <p className="noticeTxtCenter">7</p>
              </td>
              <td>
                <p className="noticeTxtCenter">27</p>
              </td>
            </tr>
          </tbody>
        </tabel>
      </div>
      <button className="writeBtn">글쓰기</button>
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default QnA;
