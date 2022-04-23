import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Influencers from "./Pages/Influencers";
import Brands from "./Pages/Brands";
import OnBoard from "./Pages/OnBoard";
import About from "./Pages/About";
import Career from "./Pages/Career";
import Privacy from "./Pages/Privacy";
import Ads from "./Pages/Ads";
import Blogs from "./Pages/Blogs";
import Terms from "./Pages/Terms";
import Contact from "./Pages/Contact";
import useLoader from "./Hooks/useLoader";

function App() {
  useLoader();
  const { pathname } = useLocation();
  const paths = ["/", "/brands", "/influencers"];
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        {!paths.includes(pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/onboard" element={<OnBoard />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
