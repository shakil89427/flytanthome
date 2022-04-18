import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import TermsOfServices from "./Components/TermsOfServices/TermsOfServices";
import Footer from "./Components/Footer/Footer";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Brands from "./Pages/Brands";
import Influencers from "./Pages/Influencers";

function App() {
  const { pathname } = useLocation();
  const paths = ["/", "/brands", "/influencers"];
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        {!paths.includes(pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/influencers" element={<Influencers />} />
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
