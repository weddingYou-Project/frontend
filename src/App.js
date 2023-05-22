import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SignupForm from "./Pages/SignupForm";
import PasswordSearch from "./Pages/PasswordSearch";
import TemporaryPasswordLogin from "./Pages/TemporaryPasswordLogin";
import PasswordChange from "./Pages/PasswordChange";
import Mypage from "./Pages/Mypage";
import UserUpdate from "./Pages/UserUpdate";
import NotFound from "./Pages/NotFound";
import EstimateForm from "./Pages/EstimateForm";
import Item from "./Components/Item";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signup/:category" element={<SignupForm />}></Route>
      <Route path="/passwordSearch" element={<PasswordSearch />} />

      <Route
        path="/passwordSearch/temporaryPasswordLogin"
        element={<TemporaryPasswordLogin />}
      />
      <Route
        path="/passwordSearch/temporaryPasswordLogin/passwordChange"
        element={<PasswordChange />}
      />
      <Route path="/mypage/:category" element={<Mypage />} />
      <Route path="/mypage/:category/userupdate" element={<UserUpdate />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/estimateform" element={<EstimateForm />} />
      {/* <Route path="/estimatedetail/:id" element={<EstimateDetail />} />
      <Route path="/estimatemodify/:id" element={<EstimateModify />} />
      <Route path="/estimatelist" element={<EstimateList />} /> */}
    </Routes>
  );
}

export default App;

//견적서 리스트, 견적서상세보기, 견적서수정 컴포넌트 임포트문
// import EstimateList from "./Pages/EstimateList";
// import EstimateDetail from "./Pages/EstimateDetail";
// import EstimateModify from "./Pages/EstimateModify";
