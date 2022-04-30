import { Routes, Route, useLocation } from "react-router-dom";
import ActivityCheck from "./Components/ActivityCheck/ActivityCheck";
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
import SponsorshipDetails from "./Pages/SponsorshipDetails";
import Influencer from "./Pages/Influencer";

function App() {
  const { pathname } = useLocation();
  const paths = ["/", "/brands", "/influencers"];
  return (
    <>
      <ActivityCheck />
      <div className="min-h-screen">
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
            path="/sponsorshipdetails/:id"
            element={
              <PrivateRoute>
                <SponsorshipDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/influencer/:id"
            element={
              <PrivateRoute>
                <Influencer />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
