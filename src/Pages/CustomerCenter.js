import "../Css/main.css";
import "../Css/CustomerCenter.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";

function CustomerCenter() {
  useEffect(() => {
    axios
      .get(`/notice/list`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`/qna/list`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="mainlayout">
      <NavigationBar title={"고객센터"} />
      <div style={{ height: 80 }}></div>
      <div className="noticeSection">
        <table>
          <thead>
            <tr>
              <td>
                <Link
                  to="/noticepage"
                  className="LinkTxt"
                  style={{ fontSize: "1.8em" }}
                >
                  공지사항
                </Link>
              </td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "30px" }}>
              <td style={{ width: 140 }}>
                <p className="customCenterTxt" style={{ fontSize: "1.5em" }}>
                  006
                </p>
              </td>
              <td style={{ width: 350 }}>
                <a
                  href="http://localhost:3000/notice/detail"
                  className="customCenterTxt"
                  style={{ fontSize: "1.5em" }}
                >
                  공지사항 SampleTitle
                </a>
              </td>
              <td>
                <p className="customCenterTxt" style={{ fontSize: "1.5em" }}>
                  124
                </p>
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
                <Link
                  to="/qnapage"
                  className="LinkTxt"
                  style={{ fontSize: "1.8em" }}
                >
                  Q&A
                </Link>
              </td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: 140 }}>
                <p className="customCenterTxt" style={{ fontSize: "1.5em" }}>
                  006
                </p>
              </td>
              <td style={{ width: 350 }}>
                <a
                  href="http://localhost:3000/qna/detail"
                  className="customCenterTxt"
                  style={{ fontSize: "1.5em" }}
                >
                  Q&A SampleTitle
                </a>
              </td>
              <td>
                <p className="customCenterTxt" style={{ fontSize: "1.5em" }}>
                  43
                </p>
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
