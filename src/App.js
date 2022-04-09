import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import TermsOfServices from "./Components/TermsOfServices/TermsOfServices";
import Footer from "./Components/Footer/Footer";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col justify-between min-h-screen">
          <div>
            <NavBar />
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
      </BrowserRouter>
    </>
  );
}

export default App;
