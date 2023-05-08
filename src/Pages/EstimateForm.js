//
import "../Css/main.css";
import "../Css/EstimateForm.css";
import personCentered from "../Assets/logo.png";
//
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
//컴포넌트
import Footer from "../Components/Footer";
import BackButton from "../Components/Backbutton";
import NavigationBar from "../Components/NavigationBar";

const EstimateForm = () => {
  let [weddingdate, setweddingdate] = useState({
    datefirst: "",
    datesecond: "",
    datethird: "",
  });

  let [weddingregion, setweddingregion] = useState({
    regionfirst: "",
    regionsecond: "",
    regionthird: "",
  });

  let [budget, setbudget] = useState(0);
  let [studio, setstudio] = useState("");
  let [honeymoon, sethoneymoon] = useState("");
  let [requirement, setrequirement] = useState("");
  let [dress, setdress] = useState([]);
  let [makeup, setmakeup] = useState([]);
  let [images, setimages] = useState([]);

  //결혼날짜, 결혼지역, 예산
  let onChangehandler = (e) => {
    if (e.target.id === "weddingdate") {
      let copy = { ...weddingdate, [e.target.name]: e.target.value };
      setweddingdate(copy);
    }

    if (e.target.id === "weddingregion") {
      let copy = { ...weddingregion, [e.target.name]: e.target.value };
      setweddingregion(copy);
    }

    if (e.target.id === "budget") {
      setbudget(e.target.value);
    }
  };

  //스튜디오
  const studioSelect = (e) => {
    if (studio === e.target.value) {
      setstudio("");
    } else setstudio(e.target.value);
  };

  //신혼여행
  const honeymoonSelect = (e) => {
    if (honeymoon === e.target.value) {
      sethoneymoon("");
    } else sethoneymoon(e.target.value);
  };

  //드레스
  const dresscheck = (e) => {
    const checks = document.getElementsByName("dress");
    var count = 0;
    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        count++;
      }
      if (count > 3) {
        alert("드레스 스타일은 최대 3개까지 선택 가능합니다.");
        e.target.checked = false;
        return false;
      }
    }
    if (count <= 3) {
      let copy = [...dress];
      if (copy.indexOf(e.target.value) === -1) {
        copy.push(e.target.value);
        setdress(copy);
      } else {
        let index = copy.indexOf(e.target.value);
        copy.splice(index, 1);
        setdress(copy);
      }
    }
  };

  //메이크업
  const makeupcheck = (e) => {
    const checks = document.getElementsByName("makeup");
    var count = 0;
    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        count++;
      }
      if (count > 3) {
        alert("메이크업 스타일은 최대 3개까지 선택 가능합니다.");
        e.target.checked = false;
        return false;
      }
    }
    if (count <= 3) {
      let copy = [...makeup];
      if (copy.indexOf(e.target.value) === -1) {
        copy.push(e.target.value);
        setmakeup(copy);
      } else {
        let index = copy.indexOf(e.target.value);
        copy.splice(index, 1);
        setmakeup(copy);
      }
    }
  };

  const imageSelect = (e) => {
    setimages(e.target.files);
  };

  //요청사항
  const requirementChange = (e) => {
    setrequirement(e.target.value);
  };

  //JSON 변환
  let submitdate = JSON.stringify([
    weddingdate.datefirst,
    weddingdate.datesecond,
    weddingdate.datethird,
  ]);
  let submitregion = JSON.stringify([
    weddingregion.regionfirst,
    weddingregion.regionsecond,
    weddingregion.regionthird,
  ]);
  let submitdress = JSON.stringify(dress);
  let submitmakeup = JSON.stringify(makeup);
  //JSON 변환

  const onSubmit = () => {
    if (weddingdate.datefirst === "") {
      alert("1순위 날짜 입력은 필수입니다.");
      return false;
    }
    if (weddingregion.regionfirst === "") {
      alert("1순위 지역 입력은 필수입니다.");
      return false;
    }

    if (budget === 0) {
      alert("예산 입력은 필수입니다.");
      return false;
    }

    if (studio === "") {
      alert("스튜디오 입력은 필수입니다.");
      return false;
    }

    let formData = new FormData();
    formData.append("weddingdate", submitdate);
    formData.append("budget", budget);
    formData.append("region", submitregion);
    formData.append("honeymoon", honeymoon);
    formData.append("makeup", submitmakeup);
    formData.append("dress", submitdress);
    formData.append("requirement", requirement);
    formData.append("studio", studio);
    formData.append("writer", window.sessionStorage.getItem("id"));
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("uploadfiles", images[i]);
      }
    }
    axios
      .post("http://localhost:8080/insert", formData)
      .then((res) => {
        console.log("성공");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="mainlayout" style={{ height: "100%" }}>
      <NavigationBar title="내가 원하는 웨딩은?" />
      <div className="contentcontainer">
        <div className="contentbox">
          <h5
            onClick={() => {
              console.log(studio);
            }}
          >
            희망 결혼 예정일
          </h5>
          <div className="choosebox">
            <span>1순위</span>
            <input
              type="date"
              className="form-control"
              onChange={onChangehandler}
              name="datefirst"
              id="weddingdate"
            />
          </div>
          <div className="choosebox">
            <span>2순위</span>
            <input
              type="date"
              className="form-control"
              onChange={onChangehandler}
              name="datesecond"
              id="weddingdate"
            />
          </div>
          <div className="choosebox">
            <span>3순위</span>
            <input
              type="date"
              className="form-control"
              onChange={onChangehandler}
              name="datethird"
              id="weddingdate"
            />
          </div>
          {/* <hr></hr> */}
        </div>
        <div className="contentbox">
          <h5>희망 결혼 지역</h5>
          <div className="choosebox">
            <span>1순위</span>
            <input
              type="text"
              className="w-100 form-control"
              onChange={onChangehandler}
              name="regionfirst"
              id="weddingregion"
            />
          </div>
          <div className="choosebox">
            <span>2순위</span>
            <input
              type="text"
              className="w-100 form-control"
              onChange={onChangehandler}
              name="regionsecond"
              id="weddingregion"
            />
          </div>
          <div className="choosebox">
            <span>3순위</span>
            <input
              type="text"
              className="w-100 form-control"
              onChange={onChangehandler}
              name="regionthird"
              id="weddingregion"
            />
          </div>
          {/* <hr></hr> */}
        </div>
        <div className="contentbox">
          <h5>예산</h5>
          <div className="choosebox">
            <input
              type="text"
              className="w-100 form-control budget-input"
              value={budget}
              id="budget"
              onChange={onChangehandler}
            />
          </div>
          원{/* <hr></hr> */}
        </div>
        <div className="contentbox">
          <h5>스튜디오</h5>
          <div className="choosebox">
            <input
              id="person"
              name="studio"
              type="radio"
              value="인물중심"
              onClick={studioSelect}
              checked={studio === "인물중심"}
              className="displaynone"
            />
            <label htmlFor="person" className="label-design w-100 cursor">
              인물중심
            </label>
          </div>
          <div className="choosebox">
            <input
              id="background"
              name="studio"
              type="radio"
              value="배경중심"
              checked={studio === "배경중심"}
              onClick={studioSelect}
              className="displaynone"
            />
            <label htmlFor="background" className="label-design w-100 cursor">
              배경중심
            </label>
          </div>
          <div className="choosebox">
            <input
              id="balanced"
              name="studio"
              type="radio"
              value="균형적인"
              checked={studio === "균형적인"}
              onClick={studioSelect}
              className="displaynone"
            />
            <label htmlFor="balanced" className="label-design w-100 cursor">
              균형적인
            </label>
          </div>
          <div>
            <span>
              스튜디오 스타일이 궁금하다면?&nbsp;
              <span
                type="button"
                className="badge bg-primary"
                data-bs-toggle="modal"
                data-bs-target="#studioModal"
              >
                Click
              </span>
            </span>
          </div>
        </div>

        <div className="contentbox">
          <h5>신부 드레스 (3개까지 선택가능)</h5>
          <div className="choosebox">
            <input
              id="머메이드"
              type="checkbox"
              name="dress"
              value="머메이드"
              onChange={dresscheck}
              className="displaynone"
            />
            <label htmlFor="머메이드" className="label-design w-100 cursor">
              머메이드
            </label>
          </div>
          <div className="choosebox">
            <input
              id="A라인"
              type="checkbox"
              name="dress"
              value="A라인"
              onChange={dresscheck}
              className="displaynone"
            />
            <label htmlFor="A라인" className="label-design w-100 cursor">
              A라인
            </label>
          </div>
          <div className="choosebox">
            <input
              id="H라인"
              type="checkbox"
              name="dress"
              value="H라인"
              onChange={dresscheck}
              className="displaynone"
            />
            <label htmlFor="H라인" className="label-design w-100 cursor">
              H라인
            </label>
          </div>
          <div className="choosebox">
            <input
              id="벨라인"
              type="checkbox"
              name="dress"
              value="벨라인"
              onChange={dresscheck}
              className="displaynone"
            />
            <label htmlFor="벨라인" className="label-design w-100 cursor">
              벨라인
            </label>
          </div>
          <div className="choosebox">
            <input
              id="엠파이어"
              type="checkbox"
              name="dress"
              value="엠파이어"
              onChange={dresscheck}
              className="displaynone"
            />
            <label htmlFor="엠파이어" className="label-design w-100 cursor">
              엠파이어
            </label>
          </div>
          <div className="choosebox">
            <input
              id="프린세스"
              type="checkbox"
              name="dress"
              value="프린세스"
              onChange={dresscheck}
              className="displaynone"
            />
            <label htmlFor="프린세스" className="label-design w-100 cursor">
              프린세스
            </label>
          </div>
          <span>
            드레스 스타일이 궁금하다면?&nbsp;
            <span
              type="button"
              className="badge bg-primary"
              data-bs-toggle="modal"
              data-bs-target="#dressModal"
            >
              Click
            </span>
          </span>
        </div>
        <div className="contentbox">
          <h5>신부 메이크업 (3개까지 선택가능)</h5>
          <div className="choosebox">
            <input
              id="로맨틱한"
              type="checkbox"
              name="makeup"
              value="로맨틱한"
              onChange={makeupcheck}
              className="displaynone"
            />
            <label htmlFor="로맨틱한" className="label-design w-100 cursor">
              로맨틱한
            </label>
          </div>
          <div className="choosebox">
            <input
              id="우아한"
              type="checkbox"
              name="makeup"
              value="우아한"
              onChange={makeupcheck}
              className="displaynone"
            />
            <label htmlFor="우아한" className="label-design w-100 cursor">
              우아한
            </label>
          </div>
          <div className="choosebox">
            <input
              id="클래식"
              type="checkbox"
              name="makeup"
              value="클래식"
              onChange={makeupcheck}
              className="displaynone"
            />
            <label htmlFor="클래식" className="label-design w-100 cursor">
              클래식
            </label>
          </div>
          <div className="choosebox">
            <input
              id="모던한"
              type="checkbox"
              name="makeup"
              value="모던한"
              onChange={makeupcheck}
              className="displaynone"
            />
            <label htmlFor="모던한" className="label-design w-100 cursor">
              모던한
            </label>
          </div>
          <div className="choosebox">
            <input
              id="세련된"
              type="checkbox"
              name="makeup"
              value="세련된"
              onChange={makeupcheck}
              className="displaynone"
            />
            <label htmlFor="세련된" className="label-design w-100 cursor">
              세련된
            </label>
          </div>
          <div className="choosebox">
            <input
              id="사랑스런"
              type="checkbox"
              name="makeup"
              value="사랑스런"
              onChange={makeupcheck}
              className="displaynone"
            />
            <label htmlFor="사랑스런" className="label-design w-100 cursor">
              사랑스런
            </label>
          </div>
          <span>
            메이크업 스타일이 궁금하다면?&nbsp;
            <span
              type="button"
              className="badge bg-primary"
              data-bs-toggle="modal"
              data-bs-target="#makeupModal"
            >
              Click
            </span>
          </span>
        </div>
        <div className="contentbox">
          <h5>신혼여행</h5>
          <div className="choosebox">
            <input
              id="해외"
              type="radio"
              name="honeymoon"
              value="해외"
              onClick={honeymoonSelect}
              checked={honeymoon === "해외"}
              className="displaynone"
            />
            <label htmlFor="해외" className="label-design w-100 cursor">
              해외
            </label>
          </div>
          <div className="choosebox">
            <input
              id="국내"
              type="radio"
              name="honeymoon"
              value="국내"
              onClick={honeymoonSelect}
              checked={honeymoon === "국내"}
              className="displaynone"
            />
            <label htmlFor="국내" className="label-design w-100 cursor">
              국내
            </label>
          </div>
        </div>
        <div className="contentbox">
          <h5>사진첨부</h5>
          <div className="choosebox">
            <input
              type="file"
              multiple
              onChange={imageSelect}
              accept="image/*"
            />
          </div>
        </div>
        <div className="contentbox" style={{ borderBottom: "none" }}>
          <h5>추가 요청사항</h5>
          <div className="choosebox w-100">
            <textarea
              className="form-control"
              rows="7"
              value={requirement}
              onChange={requirementChange}
              placeholder="추가 요청사항을 입력해주세요"
            ></textarea>
          </div>
        </div>
        <div className="Signup-button">
          <button
            onClick={() => {
              onSubmit();
            }}
            className="btn-colour-1"
            style={{ marginRight: "15px" }}
          >
            작성하기
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="btn-colour-1"
          >
            취소
          </button>
        </div>
      </div>
      <div style={{ height: 94.19 }}></div>
      <Footer />
      <StudioModal />
      <DressModal />
      <MakeupModal />
    </div>
  );
};

export default EstimateForm;

const StudioModal = () => {
  return (
    <div
      className="modal fade"
      id="studioModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              스튜디오
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="accordion" id="accordionExample">
              <AccordionComp
                heading={1}
                collapse="one"
                topic="인물중심 스튜디오"
                image1="https://www.iwedding.co.kr/_next/image?url=https%3A%2F%2Fwww.iwedding.co.kr%2Fcenter%2Fwebsite%2Fbrandplus%2F1667180129.jpg&w=1920&q=75"
                image2="https://www.iwedding.co.kr/center/iweddingb/product/800_11679_1665982500_05988600_3232256100.jpg"
                image3="https://www.iwedding.co.kr/center/iweddingb/product/800_1708_1665976697_88410900_3232256100.jpg"
              />
              <AccordionComp
                heading={2}
                collapse="two"
                topic="배경중심 스튜디오"
                image1="https://www.iwedding.co.kr/_next/image?url=https%3A%2F%2Fwww.iwedding.co.kr%2Fcenter%2Fwebsite%2Fbrandplus%2F1663831599.jpg&w=1920&q=75"
                image2="https://www.iwedding.co.kr/_next/image?url=https%3A%2F%2Fwww.iwedding.co.kr%2Fcenter%2Fwebsite%2Fbrandplus%2F1663808804.jpg&w=1920&q=75"
                image3="https://www.iwedding.co.kr/center/iweddingb/product/800_13581_1665985281_96465800_3232256098.jpg"
              />
              <AccordionComp
                heading={3}
                collapse="three"
                topic="균형적인 스튜디오"
                image1="https://www.iwedding.co.kr/center/iweddingb/product/800_12512_1666920642_83238100_3232256098.jpg"
                image2="https://www.iwedding.co.kr/center/iweddingb/product/800_12544_1666688374_16242500_3232256098.jpg"
                image3="https://www.iwedding.co.kr/center/iweddingb/product/800_13300_1668503581_00621700_3232256098.jpg"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DressModal = () => {
  return (
    <div
      className="modal fade"
      id="dressModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              스튜디오
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="accordion" id="accordionExample">
              <AccordionComp
                heading={4}
                collapse="four"
                topic="머메이드"
                image1="https://www.iwedding.co.kr/center/iweddingb/product/800_co_sl_d120_2001_1632361176_65452700_3232256100.jpg"
                image2="https://ygdress.com/web/product/big/DNW102_1.jpg"
                image3="https://www.iwedding.co.kr/center/iweddingb/product/800___1665453271_05641100_3232256098.jpg"
              />
              <AccordionComp heading={5} collapse="five" topic="A라인" />
              <AccordionComp heading={6} collapse="six" topic="H라인" />
              <AccordionComp heading={7} collapse="seven" topic="벨라인" />
              <AccordionComp heading={8} collapse="eight" topic="엠파이어" />
              <AccordionComp heading={9} collapse="nine" topic="프린세스" />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MakeupModal = () => {
  return (
    <div
      className="modal fade"
      id="makeupModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              스튜디오
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="accordion" id="accordionExample">
              <AccordionComp heading={10} collapse="ten" topic="로맨틱한" />
              <AccordionComp heading={11} collapse="eleven" topic="우아한" />
              <AccordionComp heading={12} collapse="twelve" topic="클래식" />
              <AccordionComp heading={13} collapse="thirteen" topic="모던한" />
              <AccordionComp heading={14} collapse="fourteen" topic="세련된" />
              <AccordionComp heading={15} collapse="fifteen" topic="사랑스런" />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccordionComp = ({
  heading,
  collapse,
  topic,
  image1,
  image2,
  image3,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={heading}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapse}`}
          aria-expanded="false"
          aria-controls={heading}
        >
          {topic}
        </button>
      </h2>
      <div
        id={collapse}
        className="accordion-collapse collapse"
        aria-labelledby={heading}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body p-0">
          <div className="exampleimagebox">
            <div className="exampleimage">
              <캐러셀
                image1={image1}
                image2={image2}
                image3={image3}
                heading={heading}
              />
            </div>
          </div>
          <br></br>

          <h5>설명</h5>
          <p>인물 중심의 스튜디오입니다. </p>
        </div>
      </div>
    </div>
  );
};

const 캐러셀 = ({ image1, image2, image3, collapse, heading }) => {
  return (
    <div
      id={`carouselExampleDark${heading}`}
      className="carousel carousel-dark slide w-100 height100"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target={`#carouselExampleDark${heading}`}
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target={`#carouselExampleDark${heading}`}
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target={`#carouselExampleDark${heading}`}
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img
            src={image1}
            className="d-block w-100"
            style={{ height: 450 }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src={image2}
            className="d-block w-100"
            style={{ height: 450 }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
        <div className="carousel-item">
          <img
            src={image3}
            className="d-block w-100"
            style={{ height: 450 }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#carouselExampleDark${heading}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#carouselExampleDark${heading}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
