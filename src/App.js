import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import TermsOfServices from "./Components/TermsOfServices/TermsOfServices";
import Footer from "./Components/Footer/Footer";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        {pathname !== "/" && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfServices />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
