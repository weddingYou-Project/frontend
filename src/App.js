function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signup/user" element={<SignUpUser />}></Route>
      <Route path="/signup/planner" element={<SignUpPlanner />}></Route>
      <Route path="/passwordSearch" element={<PasswordSearch />} />
      <Route
        path="/passwordSearch/temporaryPasswordLogin"
        element={<TemporaryPasswordLogin />}
      />
      <Route
        path="/passwordSearch/temporaryPasswordLogin/passwordChange"
        element={<PasswordChange />}
      />
      <Route path="/mypage/:category" element={<MyPage />} />
      <Route path="/mypage/:category/userupdate" element={<UserUpdate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
