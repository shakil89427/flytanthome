import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import Profile from "./Components/Profile/Profile";
import TermsOfServices from "./Components/TermsOfServices/TermsOfServices";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfServices />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
