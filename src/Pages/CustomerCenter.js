import "../Css/main.css";
import "../Css/CustomerCenter.css";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";

function CustomerCenter() {
  return (
    <div className="mainlayout">
      <NavigationBar title={"고객센터"} />
      <div style={{ height: 74 }}></div>
      <div className="noticeSection">
        <table>
          <thead>
            <tr>
              <td>
                <Link to="/noticepage" className="LinkTxt">
                  공지사항
                </Link>
              </td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: 140 }}>
                <p className="customCenterTxt">006</p>
              </td>
              <td style={{ width: 350 }}>
                <a className="customCenterTxt">공지사항 SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">124</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">005</p>
              </td>
              <td>
                <a className="customCenterTxt">공지사항 SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">234</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">004</p>
              </td>
              <td>
                <a className="customCenterTxt">공지사항 SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">147</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">003</p>
              </td>
              <td>
                <a className="customCenterTxt">공지사항 SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">183</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">002</p>
              </td>
              <td>
                <a className="customCenterTxt">공지사항 SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">246</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="QnAsection">
        <table>
          <thead>
            <tr>
              <td style={{ width: 140 }}>
                <Link to="/qnapage" className="LinkTxt">
                  QnA
                </Link>
              </td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: 140 }}>
                <p className="customCenterTxt">006</p>
              </td>
              <td style={{ width: 350 }}>
                <a className="customCenterTxt">QnA SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">43</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">005</p>
              </td>
              <td>
                <a className="customCenterTxt">QnA SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">48</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">004</p>
              </td>
              <td>
                <a className="customCenterTxt">QnA SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">62</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">003</p>
              </td>
              <td>
                <a className="customCenterTxt">QnA SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">73</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="customCenterTxt">002</p>
              </td>
              <td>
                <a className="customCenterTxt">QnA SampleTitle</a>
              </td>
              <td>
                <p className="customCenterTxt">48</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ height: 90 }}></div>
      <Footer />
    </div>
  );
}

export default CustomerCenter;
