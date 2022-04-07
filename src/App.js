import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import TermsOfServices from "./Components/TermsOfServices/TermsOfServices";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfServices />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
