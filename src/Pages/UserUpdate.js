import "../Css/main.css";
import "../Css/mypage.css";
import "../Css/userupdate.css";
import profileimage from "../Assets/defaultprofileimage.jpg";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UserUpdate() {
  const { state: passwordCheck } = useLocation();
  const { category } = useParams();

  let userOrPlanner = "";
  if (category === "user") {
    userOrPlanner = "회원";
  } else if (category === "planner") {
    userOrPlanner = "플래너";
  }
  const title = `${userOrPlanner}정보 수정`;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [email, setEmail] = useState(sessionStorage.getItem(""));
  const [defaultEmail, setDefaultEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [defaultPhone, setDefaultPhone] = useState("");
  const [gender, setGender] = useState("");
  const [defaultGender, setDefaultGender] = useState("");
  const [career, setCareer] = useState(0);
  const [defaultCareer, setDefaultCareer] = useState(0);
  const [profileImg, setProfileImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [defaultViewUrl, setDefaultViewUrl] = useState(null);

  const nameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const maleInput = useRef();
  const femaleInput = useRef();
  const careerInput = useRef();

  const nameFeedback = useRef();
  const passwordFeedback = useRef();
  const emailFeedback = useRef();
  const phoneFeedback = useRef();
  const careerFeedback = useRef();
  const profileUpdateModal = useRef();

  const [nameMessage, setNameMessage] = useState("looks good!");
  const [passwordMessage, setPasswordMessage] = useState("looks good!");
  const [emailMessage, setEmailMessage] = useState("looks good!");
  const [phoneMessage, setPhoneMessage] = useState("looks good!");
  const [careerMessage, setCareerMessage] = useState("looks good!");
  const [genderMessage, setGenderMessage] = useState("looks good!");

  const [allcheck, setAllCheck] = useState(true);
  const [anyChange, setAnyChange] = useState(false);
  const [emailDuplicate, setEmailDuplicate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    viewDefaultInfo();
    if (category !== "user" && category !== "planner") {
      navigate("/*");
    }
    if (
      sessionStorage.getItem("category") !== "user" &&
      sessionStorage.getItem("category") !== "planner"
    ) {
      navigate("/*");
    }
    if (
      sessionStorage.getItem("category") === "user" &&
      path.indexOf("planner") !== -1
    ) {
      navigate("/*");
    } else if (
      sessionStorage.getItem("category") === "planner" &&
      path.indexOf("user/userupdate") !== -1
    ) {
      navigate("/*");
    }
    //console.log("check:" + passwordCheck);
    if (passwordCheck !== true) {
      //userupdate에 url로 접근할 경우 mypage로 navigate
      navigate(`/mypage/${category}`);
      alert("정보수정을 하려면 비밀번호를 입력하세요!");
    }
  }, []);
  const viewDefaultInfo = () => {
    if (category === "user") {
      axios
        .post("/user/userSearch", { email: sessionStorage.getItem("email") })
        .then((res) => {
          console.log("성공");
          console.log(res);
          setName(res.data.name);
          setEmail(res.data.email);
          setDefaultEmail(res.data.email);
          setPassword(res.data.password);
          setDefaultPassword(res.data.password);
          setPhone(res.data.phoneNum);
          setDefaultPhone(res.data.phoneNum);
          setGender(res.data.gender);
          setDefaultGender(res.data.gender);
        })
        .catch((e) => {
          console.log(e);
        });
      axios
        .post("/user/getprofileImg", { email: sessionStorage.getItem("email") })
        .then((res) => {
          const byteCharacters = atob(res.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/jpeg" });
          setProfileImg(blob);
          const reader = new FileReader();
          reader.onload = () => {
            setDefaultViewUrl(reader.result);
            setPreviewUrl(reader.result);
            console.log("reader.result : ", reader.result);
          };
          reader.readAsDataURL(blob);
        })
        .catch((e) => {
          setDefaultViewUrl(profileimage);
          setPreviewUrl(profileimage);
        });
    }
    if (category === "planner") {
      axios
        .post("/planner/plannerSearch", {
          email: sessionStorage.getItem("email"),
        })
        .then((res) => {
          console.log("성공");
          console.log(res);
          setName(res.data.name);
          setEmail(res.data.email);
          setDefaultEmail(res.data.email);
          setPassword(res.data.password);
          setDefaultPassword(res.data.password);
          setPhone(res.data.phoneNum);
          setDefaultPhone(res.data.phoneNum);
          setGender(res.data.gender);
          setDefaultGender(res.data.gender);
          setCareer(res.data.plannerCareerYears);
          setDefaultCareer(res.data.plannerCareerYears);
        })
        .catch((e) => {
          console.log(e);
        });
      axios
        .post("/planner/getprofileImg", {
          email: sessionStorage.getItem("email"),
        })
        .then((res) => {
          const byteCharacters = atob(res.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/jpeg" });
          setProfileImg(blob);
          const reader = new FileReader();
          reader.onload = () => {
            setDefaultViewUrl(reader.result);
            setPreviewUrl(reader.result);
            console.log("reader.result : ", reader.result);
          };
          reader.readAsDataURL(blob);
        })
        .catch((e) => {
          setDefaultViewUrl(profileimage);
          setPreviewUrl(profileimage);
        });
    }
  };

  const emailDuplicateCheck = (e) => {
    console.log("emailchange" + e.target.value);
    if (category === "user") {
      if (e.target.value !== defaultEmail) {
        axios
          .post("/user/userSearch", {
            email: e.target.value,
          })
          .then((res) => {
            console.log("성공");
            console.log(res);
            if (res.data === "") {
              setEmailDuplicate(false);
              setEmailMessage("올바른 이메일 형식입니다.");
              emailInput.current.classList.remove("is-invalid");
              emailInput.current.classList.add("is-valid");
              emailFeedback.current.classList.remove("invisible");
              emailFeedback.current.classList.remove("invalid-feedback");
              emailFeedback.current.classList.add("valid-feedback");
              setAllCheck(true);
              setAnyChange(true);
            } else {
              setEmailDuplicate(true);
              setEmailMessage("이메일이 중복됩니다.");
              emailFeedback.current.classList.remove("invisible");
              emailFeedback.current.classList.remove("valid-feedback");
              emailFeedback.current.classList.add("invalid-feedback");
              emailInput.current.classList.remove("is-valid");
              emailInput.current.classList.add("is-invalid");
              setAllCheck(false);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
    if (category === "planner") {
      if (e.target.value !== defaultEmail) {
        axios
          .post("/planner/plannerSearch", {
            email: e.target.value,
          })
          .then((res) => {
            console.log("성공");
            console.log(res);
            setEmailDuplicate(true);
            setEmailMessage("이메일이 중복됩니다.");
            emailFeedback.current.classList.remove("invisible");
            emailFeedback.current.classList.remove("valid-feedback");
            emailFeedback.current.classList.add("invalid-feedback");
            emailInput.current.classList.remove("is-valid");
            emailInput.current.classList.add("is-invalid");
            setAllCheck(false);
          })
          .catch((e) => {
            console.log(e);
            setEmailDuplicate(false);
            setEmailMessage("올바른 이메일 형식입니다.");
            emailInput.current.classList.remove("is-invalid");
            emailInput.current.classList.add("is-valid");
            emailFeedback.current.classList.remove("invisible");
            emailFeedback.current.classList.remove("invalid-feedback");
            emailFeedback.current.classList.add("valid-feedback");
            setAllCheck(true);
            setAnyChange(true);
          });
      }
    }
  };

  useEffect(() => {
    checkInputs();
  });

  const setDefaultValue = () => {
    setPassword(defaultPassword);
    setEmail(defaultEmail);
    setPhone(defaultPhone);
    setGender(defaultGender);
    setCareer(defaultCareer);
    passwordFeedback.current.classList.add("invisible");
    passwordFeedback.current.classList.remove("valid-feedback");
    passwordFeedback.current.classList.remove("invalid-feedback");
    passwordInput.current.classList.remove("is-valid");
    passwordInput.current.classList.remove("is-invalid");
    setPasswordMessage("returning to default");

    emailFeedback.current.classList.add("invisible");
    emailFeedback.current.classList.remove("valid-feedback");
    emailFeedback.current.classList.remove("invalid-feedback");
    emailInput.current.classList.remove("is-valid");
    emailInput.current.classList.remove("is-invalid");
    setEmailMessage("returning to default");

    phoneFeedback.current.classList.add("invisible");
    phoneFeedback.current.classList.remove("valid-feedback");
    phoneFeedback.current.classList.remove("invalid-feedback");
    phoneInput.current.classList.remove("is-valid");
    phoneInput.current.classList.remove("is-invalid");
    setPhoneMessage("returning to default");

    if (category === "planner") {
      careerFeedback.current.classList.add("invisible");
      careerFeedback.current.classList.remove("valid-feedback");
      careerFeedback.current.classList.remove("invalid-feedback");
      careerInput.current.classList.remove("is-valid");
      careerInput.current.classList.remove("is-invalid");
      setCareerMessage("returning to default");
    }
    setAllCheck(true);
    setAnyChange(false);
  };

  const removeValidation = () => {
    passwordFeedback.current.classList.add("invisible");
    passwordFeedback.current.classList.remove("valid-feedback");
    passwordFeedback.current.classList.remove("invalid-feedback");
    passwordInput.current.classList.remove("is-valid");
    passwordInput.current.classList.remove("is-invalid");
    setPasswordMessage("returning to default");

    emailFeedback.current.classList.add("invisible");
    emailFeedback.current.classList.remove("valid-feedback");
    emailFeedback.current.classList.remove("invalid-feedback");
    emailInput.current.classList.remove("is-valid");
    emailInput.current.classList.remove("is-invalid");

    phoneFeedback.current.classList.add("invisible");
    phoneFeedback.current.classList.remove("valid-feedback");
    phoneFeedback.current.classList.remove("invalid-feedback");
    phoneInput.current.classList.remove("is-valid");
    phoneInput.current.classList.remove("is-invalid");

    if (category === "planner") {
      careerFeedback.current.classList.add("invisible");
      careerFeedback.current.classList.remove("valid-feedback");
      careerFeedback.current.classList.remove("invalid-feedback");
      careerInput.current.classList.remove("is-valid");
      careerInput.current.classList.remove("is-invalid");
    }

    setAllCheck(true);
    setAnyChange(false);
  };

  const onChange = (e) => {
    //초기화 설정
    setAllCheck(true);
    setAnyChange(false);
    if (e.target.id === "password") {
      setPassword(e.target.value);
      const passwordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/;
      if (passwordRegExp.test(e.target.value)) {
        if (e.target.value === defaultPassword) {
          setPasswordMessage("same password");
          passwordFeedback.current.classList.add("invisible");
          passwordFeedback.current.classList.remove("valid-feedback");
          passwordFeedback.current.classList.remove("invalid-feedback");
          passwordInput.current.classList.remove("is-valid");
          passwordInput.current.classList.remove("is-invalid");
        } else {
          setPasswordMessage("올바른 비밀번호 형식입니다");
          passwordInput.current.classList.remove("is-invalid");
          passwordInput.current.classList.add("is-valid");
          passwordFeedback.current.classList.remove("invisible");
          passwordFeedback.current.classList.remove("invalid-feedback");
          passwordFeedback.current.classList.add("valid-feedback");
          setAnyChange(true);
        }
      } else {
        if (e.target.value === "") {
          setPasswordMessage("비밀번호를 작성해주세요.");
        } else {
          setPasswordMessage(
            "최소8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함"
          );
        }
        passwordFeedback.current.classList.remove("invisible");
        passwordFeedback.current.classList.remove("valid-feedback");
        passwordFeedback.current.classList.add("invalid-feedback");
        passwordInput.current.classList.remove("is-valid");
        passwordInput.current.classList.add("is-invalid");
        setAllCheck(false);
      }
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
      const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegExp.test(e.target.value)) {
        if (e.target.value === defaultEmail) {
          emailFeedback.current.classList.add("invisible");
          emailFeedback.current.classList.remove("valid-feedback");
          emailFeedback.current.classList.remove("invalid-feedback");
          emailInput.current.classList.remove("is-valid");
          emailInput.current.classList.remove("is-invalid");
        } else {
          emailDuplicateCheck(e);
        }
      } else {
        if (e.target.value === "") {
          setEmailMessage("이메일을 작성해주세요.");
        } else {
          setEmailMessage("올바른 이메일 형식으로 작성해주세요.");
        }

        emailFeedback.current.classList.remove("invisible");
        emailFeedback.current.classList.remove("valid-feedback");
        emailFeedback.current.classList.add("invalid-feedback");
        emailInput.current.classList.remove("is-valid");
        emailInput.current.classList.add("is-invalid");
        setAllCheck(false);
      }
    } else if (e.target.id === "phone") {
      setPhone(
        e.target.value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})(\d{0,1})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, "")
          .slice(0, 13)
      );
      const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      if (phoneRegExp.test(e.target.value.slice(0, 13))) {
        if (e.target.value === defaultPhone) {
          phoneFeedback.current.classList.add("invisible");
          phoneFeedback.current.classList.remove("valid-feedback");
          phoneFeedback.current.classList.remove("invalid-feedback");
          phoneInput.current.classList.remove("is-valid");
          phoneInput.current.classList.remove("is-invalid");
        } else {
          setPhoneMessage("올바른 핸드폰 번호입니다.");
          phoneInput.current.classList.remove("is-invalid");
          phoneInput.current.classList.add("is-valid");
          phoneFeedback.current.classList.remove("invisible");
          phoneFeedback.current.classList.remove("invalid-feedback");
          phoneFeedback.current.classList.add("valid-feedback");
          setAnyChange(true);
        }
      } else {
        if (e.target.value === "") {
          setPhoneMessage("핸드폰 번호를 입력해주세요");
        } else {
          setPhoneMessage("올바른 핸드폰 번호가 아닙니다.");
        }
        phoneFeedback.current.classList.remove("invisible");
        phoneFeedback.current.classList.remove("valid-feedback");
        phoneFeedback.current.classList.add("invalid-feedback");
        phoneInput.current.classList.remove("is-valid");
        phoneInput.current.classList.add("is-invalid");
        setAllCheck(false);
      }
    } else if (e.target.name === "gender") {
      setGender(e.target.value);
      console.log(e.target.value);
      if (e.target.checked === true) {
        //선택된 값이

        if (e.target.value === defaultGender) {
          //기본 값이면
          setGenderMessage("invalid");
        } else if (e.target.value !== defaultGender) {
          //기본 값이 아니면
          console.log("바뀜");
          setAnyChange(true);
          setGenderMessage("valid");
          //변경사항 생김
        }
      }
    } else if (e.target.id === "career") {
      setCareer(e.target.value);
      const CareerRegExp = /^(?!0[0-9])[0-9]+$/;
      if (
        CareerRegExp.test(e.target.value) &&
        parseInt(e.target.value) >= 0 &&
        parseInt(e.target.value) <= 30
      ) {
        if (parseInt(e.target.value) === defaultCareer) {
          careerFeedback.current.classList.add("invisible");
          careerFeedback.current.classList.remove("valid-feedback");
          careerFeedback.current.classList.remove("invalid-feedback");
          careerInput.current.classList.remove("is-valid");
          careerInput.current.classList.remove("is-invalid");
        } else {
          setCareerMessage("looks good!");
          careerInput.current.classList.remove("is-invalid");
          careerInput.current.classList.add("is-valid");
          careerFeedback.current.classList.remove("invisible");
          careerFeedback.current.classList.remove("invalid-feedback");
          careerFeedback.current.classList.add("valid-feedback");
          setAnyChange(true);
        }
      } else {
        if (parseInt(e.target.value) > 30) {
          setCareerMessage("경력은 30년까지 입력 가능합니다.");
        } else if (e.target.value === "") {
          setCareerMessage("경력을 입력하세요.");
        } else {
          setCareerMessage("올바른 경력을 입력하세요.");
        }
        careerFeedback.current.classList.remove("invisible");
        careerFeedback.current.classList.remove("valid-feedback");
        careerFeedback.current.classList.add("invalid-feedback");
        careerInput.current.classList.remove("is-valid");
        careerInput.current.classList.add("is-invalid");
        setAllCheck(false);
      }
    }
  };

  const checkInputs = () => {
    console.log("current gender : ", gender);
    console.log("defaultGender : ", defaultGender);
    if (category === "user") {
      if (
        passwordInput.current.value === defaultPassword &&
        emailInput.current.value === defaultEmail &&
        phoneInput.current.value === defaultPhone &&
        gender === defaultGender
      ) {
        setAnyChange(false);
      }

      if (
        passwordFeedback.current.classList.contains("invalid-feedback") ||
        emailFeedback.current.classList.contains("invalid-feedback") ||
        phoneFeedback.current.classList.contains("invalid-feedback")
      ) {
        setAllCheck(false);
      }

      if (
        passwordFeedback.current.classList.contains("valid-feedback") ||
        emailFeedback.current.classList.contains("valid-feedback") ||
        phoneFeedback.current.classList.contains("valid-feedback") ||
        gender !== defaultGender
      ) {
        setAnyChange(true);
      }
    } else if (category === "planner") {
      if (
        passwordInput.current.value === defaultPassword &&
        emailInput.current.value === defaultEmail &&
        phoneInput.current.value === defaultPhone &&
        gender === defaultGender &&
        careerInput.current.value === defaultCareer
      ) {
        setAnyChange(false);
      }
      if (
        passwordFeedback.current.classList.contains("invalid-feedback") ||
        emailFeedback.current.classList.contains("invalid-feedback") ||
        phoneFeedback.current.classList.contains("invalid-feedback") ||
        careerFeedback.current.classList.contains("invalid-feedback")
      ) {
        setAllCheck(false);
      }
      if (
        passwordFeedback.current.classList.contains("valid-feedback") ||
        emailFeedback.current.classList.contains("valid-feedback") ||
        phoneFeedback.current.classList.contains("valid-feedback") ||
        careerFeedback.current.classList.contains("valid-feedback") ||
        gender !== defaultGender
      ) {
        setAnyChange(true);
      }
    }
  };
  console.log("allcheck : ", allcheck);
  console.log("anychange : ", anyChange);

  const updateInfo = () => {
    if (category === "user") {
      axios
        .post("/user/userSearch", { email: sessionStorage.getItem("email") })
        .then((res) => {
          console.log("조회 성공");
          console.log(res);
          axios
            .post("/user/userUpdate", {
              preemail: sessionStorage.getItem("email"),
              password: password,
              email: email,
              phoneNum: phone,
              gender: gender,
            })
            .then((res) => {
              console.log("업데이트 성공");
              console.log(res);
              setEmail(res.data.email);
              setDefaultEmail(res.data.email);
              setPassword(res.data.password);
              setDefaultPassword(res.data.password);
              setPhone(res.data.phoneNum);
              setDefaultPhone(res.data.phoneNum);
              setGender(res.data.gender);
              setDefaultGender(res.data.gender);
              window.sessionStorage.setItem("email", email);
              alert("수정 완료!");
            })
            .catch((e) => {
              console.log(e);
              alert(e.response.data.message);
            });
        })
        .catch((e) => {
          console.log("조회실패");
        });
    }
    if (category === "planner") {
      axios
        .post("/planner/plannerSearch", {
          email: sessionStorage.getItem("email"),
        })
        .then((res) => {
          console.log("조회 성공");
          console.log(res);
          axios
            .post("/planner/userUpdate", {
              preemail: sessionStorage.getItem("email"),
              password: password,
              email: email,
              phoneNum: phone,
              gender: gender,
              career: career,
            })
            .then((res) => {
              console.log("업데이트 성공");
              console.log(res);
              setEmail(res.data.email);
              setDefaultEmail(res.data.email);
              setPassword(res.data.password);
              setDefaultPassword(res.data.password);
              setPhone(res.data.phoneNum);
              setDefaultPhone(res.data.phoneNum);
              setGender(res.data.gender);
              setDefaultGender(res.data.gender);
              setCareer(res.data.plannerCareerYears);
              setDefaultCareer(res.data.plannerCareerYears);
              window.sessionStorage.setItem("email", email);
              alert("수정 완료!");
            })
            .catch((e) => {
              console.log(e);
              alert(e.response.data.message);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const onChangeProfile = (e) => {
    const selectedFile = e.target.files[0];
    setProfileImg(selectedFile);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      console.log("filereader.result : ", fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const updateProfile = (e) => {
    const formData = new FormData();
    formData.append("file", profileImg);
    formData.append("useremail", sessionStorage.getItem("email"));
    if (category === "user") {
      axios
        .post("/user/updateprofileImg", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          setDefaultViewUrl(previewUrl);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (category === "planner") {
      axios
        .post("/planner/updateprofileImg", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          setDefaultViewUrl(previewUrl);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateCheck = (e) => {
    e.preventDefault();

    console.log("updatecheck : ", allcheck);
    console.log("updatecheck : ", anyChange);
    if (allcheck === true && anyChange === true) {
      {
        /* 수정가능 */
        updateInfo();
        removeValidation();
      }
    } else {
      if (allcheck === false) {
        //형식 틀릴 때
        alert("수정 불가능합니다.");
      } else if (anyChange === false) {
        //변경 내용 없을 때
        alert("변경 내용이 없습니다.");
      }
      setDefaultValue();
    }
  };

  return (
    <div class="mainlayout" style={{ minHeight: "100vh", height: "100%" }}>
      <NavigationBar title={title} />
      <div
        class="userupdatecontainer text-center"
        style={{
          minHeight: "100vh",
          height: "800px",
          width: "100%",
          marginTop: "30px",
          zIndex: 1,
        }}
      >
        <form style={{ width: "560px", height: "600px", zIndex: 3 }}>
          <div
            style={{
              display: "flex",
              alginItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            {defaultViewUrl === null ? (
              <div style={{ width: "200px", height: "100px" }}></div>
            ) : (
              <img
                src={defaultViewUrl}
                style={
                  category === "user"
                    ? {
                        width: "200px",
                        height: "200px",
                        cursor: "pointer",
                        marginTop: "-110px",
                        marginBottom: "20px",
                      }
                    : {
                        width: "200px",
                        height: "200px",
                        cursor: "pointer",
                        marginTop: "-130px",
                        marginBottom: "10px",
                      }
                }
                data-bs-toggle="modal"
                data-bs-target="#profileUpdateModal"
              />
            )}
          </div>
          <div
            class="justify-content-md-center mb-2"
            style={{ display: "flex", flexDirection: "row", width: "100%" }}
          >
            <label
              for="name"
              class="form-label mt-2 text-center"
              style={{ marginRight: "10px", width: "200px" }}
            >
              이름
            </label>
            <div style={{ width: "250px", marginRight: "20px" }}>
              <input
                type="text"
                class="form-control "
                id="name"
                ref={nameInput}
                value={name}
                autoComplete="off"
                disabled
              />
              <div
                class="invisible text-start name-feedback"
                ref={nameFeedback}
              >
                {nameMessage}
              </div>
            </div>
          </div>
          <div
            class="justify-content-md-center mb-2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label
              for="password"
              class="form-label mt-2 text-center"
              style={{ marginRight: "10px", width: "200px" }}
            >
              비밀번호
            </label>
            <div
              class="has-validation "
              style={{ width: "250px", marginRight: "20px" }}
            >
              <input
                type="text"
                class="form-control "
                id="password"
                ref={passwordInput}
                value={password}
                placeholder={password}
                onChange={onChange}
                autoComplete="off"
                maxLength="20"
              />
              <div
                class="invisible text-start password-feedback"
                ref={passwordFeedback}
              >
                {passwordMessage}
              </div>
            </div>
          </div>
          <div
            class="justify-content-md-center mb-2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label
              for="email"
              class="form-label mt-2"
              style={{ marginRight: "10px", width: "200px" }}
            >
              이메일
            </label>
            <div
              class="has-validation "
              style={{ width: "250px", marginRight: "20px" }}
            >
              <input
                type="text"
                class="form-control "
                id="email"
                ref={emailInput}
                value={email}
                placeholder={email}
                onChange={onChange}
                autoComplete="off"
                maxLength="100"
              />
              <div
                class="invisible text-start email-feedback"
                ref={emailFeedback}
              >
                {emailMessage}
              </div>
            </div>
          </div>
          <div
            class="justify-content-md-center mb-2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label
              for="phone"
              class="form-label mt-2"
              style={{ marginRight: "10px", width: "200px" }}
            >
              휴대폰
            </label>
            <div
              class="has-validation"
              style={{ width: "250px", marginRight: "20px" }}
            >
              <input
                type="text"
                class="form-control "
                id="phone"
                ref={phoneInput}
                value={phone}
                onChange={onChange}
                placeholder={phone}
                autoComplete="off"
                maxLength="13"
              />
              <div
                class="invisible text-start phone-feedback"
                ref={phoneFeedback}
              >
                {phoneMessage}
              </div>
            </div>
          </div>
          <div
            class="justify-content-md-center mb-2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label
              htmlFor="gender"
              className="form-label  mt-2"
              style={{ marginRight: "10px", width: "200px" }}
            >
              성별
            </label>
            <div
              class="input-group"
              id="gender"
              name="gender"
              onChange={onChange}
              value={gender}
              style={{ width: "250px", marginRight: "20px" }}
            >
              <div class="input-group-text">
                <input
                  class="form-check-input mt-0"
                  type="radio"
                  value="male"
                  name="gender"
                  htmlFor="male"
                  checked={gender === "male"}
                  onChange={onChange}
                  aria-label="Radio button for following text input"
                  style={{ cursor: "pointer" }}
                  ref={maleInput}
                />
              </div>
              <input
                type="text"
                class="form-control"
                id="male"
                aria-label="male btn"
                value="남자"
                style={{ background: "white" }}
                disabled
              />
              <div class="input-group-text">
                <input
                  class="form-check-input mt-0"
                  type="radio"
                  value="female"
                  name="gender"
                  htmlFor="female"
                  onChange={onChange}
                  aria-label="Radio button for following text input"
                  style={{ cursor: "pointer" }}
                  checked={gender === "female"}
                  ref={femaleInput}
                />
              </div>
              <input
                type="text"
                class="form-control"
                id="female"
                aria-label="female btn"
                value="여자"
                style={{ background: "white" }}
                disabled
              />
            </div>
          </div>
          {userOrPlanner === "플래너" ? (
            <div
              class="justify-content-md-center mb-2 mt-4"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <label
                for="phone"
                class="form-label mt-2"
                style={{ marginRight: "10px", width: "200px" }}
              >
                경력
              </label>
              <div
                class="has-validation "
                style={{ width: "250px", marginRight: "20px" }}
              >
                <input
                  type="number"
                  class="form-control "
                  id="career"
                  ref={careerInput}
                  value={career}
                  onChange={onChange}
                  placeholder={career}
                  autoComplete="off"
                  min="0"
                  max="30"
                />
                <div
                  class="invisible text-start phone-feedback"
                  ref={careerFeedback}
                >
                  {careerMessage}
                </div>
              </div>
            </div>
          ) : null}
          <div class="col-12">
            <button
              class="btn-colour-1 updatebtn"
              type="submit"
              onClick={updateCheck}
              style={category === "user" ? null : { marginTop: "-1px" }}
            >
              회원정보 수정하기
            </button>
          </div>
        </form>
      </div>
      <Footer />
      {/* 프로필 변경 업로드 파일 올리는 모달창 */}
      <div
        class="modal fade"
        id="profileUpdateModal"
        tabindex="-1"
        aria-labelledby="profileUpdateModal"
        aria-hidden="true"
        ref={profileUpdateModal}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title justify-content-center fs-5"
                id="profileUpdateModal"
              >
                - 프로필 변경 -
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                alginItems: "center",
                displayContent: "center",
                height: "100%",
                width: "100%",
                marginTop: "50px",
              }}
            >
              <div
                class="has-validation col col-md-10"
                style={{ height: "100%", width: "100%" }}
              >
                <img
                  src={previewUrl}
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "20px",
                    marginTop: "-50px",
                    cursor: "pointer",
                    marginLeft: "140px",
                  }}
                  alt={profileimage}
                  data-bs-toggle="modal"
                  data-bs-target="#profileUpdateModal"
                />
                <input
                  type="file"
                  class="form-control"
                  id="profileInput"
                  onChange={onChangeProfile}
                  placeholder="업로드할 이미지"
                  required
                  autocomplete="off"
                  enctype="multipart/form-data"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updateProfile}
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*프로필 변경 업로드 파일 올리는 모달창 */}
    </div>
  );
}

export default UserUpdate;
