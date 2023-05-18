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
import EstimateList from "./Pages/EstimateList";
import EstimateDetail from "./Pages/EstimateDetail";
import EstimateModify from "./Pages/EstimateModify";

function App() {
  return (
    <Routes>
      <Route path="/estimatelist" element={<EstimateList />} />
      <Route path="/estimateform" element={<EstimateForm />} />
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signup/:category" element={<SignupForm />}></Route>
      <Route path="/passwordSearch" element={<PasswordSearch />} />
      <Route path="/estimatedetail/:id" element={<EstimateDetail />} />
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
      <Route path="/estimatemodify/:id" element={<EstimateModify />} />
    </Routes>
  );
}

export default App;
