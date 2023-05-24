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
import MenuList from "./Pages/MenuList";
import WritePost from "./Pages/Items/WritePost";
import EditPost from "./Pages/Items/EditPost";
import NotFound from "./Pages/NotFound";
import LikeList from "./Pages/LikeList";
import SearchItems from "./Pages/SearchItems";
import EstimateForm from "./Pages/EstimateForm";
import Item from "./Components/Item";
import EstimateList from "./Pages/EstimateList";
import EstimateDetail from "./Pages/EstimateDetail";
import EstimateModify from "./Pages/EstimateModify";
import PlannerProfile from "./Pages/PlannerProfile";
import PlannerProfileDetail from "./Pages/PlannerProfileDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/likeList" element={<LikeList />}></Route>
      <Route path="/searchItems" element={<SearchItems />}></Route>
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
      <Route path="/menu" element={<MenuList />} />
      <Route path="/menu/:category1" element={<Item />} />
      <Route path="/writepost/:category1" element={<WritePost />} />
      <Route path="/editpost/:itemId" element={<EditPost />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/estimateform" element={<EstimateForm />} />
      <Route path="/estimatedetail/:id" element={<EstimateDetail />} />
      <Route path="/estimatemodify/:id" element={<EstimateModify />} />
      <Route path="/estimatelist" element={<EstimateList />} />
      <Route path="/plannerprofile" element={<PlannerProfile />} />
      <Route path="/plannerprofiledetail" element={<PlannerProfileDetail />} />
    </Routes>
  );
}

export default App;

//견적서 리스트, 견적서상세보기, 견적서수정 컴포넌트 임포트문
