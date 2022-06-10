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
import useStore from "./Store/useStore";
import CreateCampaign from "./Pages/CreateCampaign";
import MyCampaigns from "./Pages/MyCampaigns";
import Subscription from "./Pages/Subscription";
import AllSubscriptions from "./Components/Subscription/AllSubscriptions";
import SubscriptionDetails from "./Components/Subscription/SubscriptionDetails";
import Success from "./Components/Subscription/Success";
import FAQs from "./Components/FAQs/FAQs";
import MyCampaignDetails from "./Pages/MyCampaignDetails";
import CampaignInfluencers from "./Pages/CampaignInfluencers";
import BlogDetails from "./Pages/BlogDetails";
import AppAds from "./Pages/AppAds";
import RootPage from "./Components/Home/UserContent/RootPage";
import AllSponsorships from "./Components/Home/UserContent/AllSponsorships";
import Latest from "./Components/Home/UserContent/SponsorshipsCategories/Latest";
import Paid from "./Components/Home/UserContent/SponsorshipsCategories/Paid";
import Barter from "./Components/Home/UserContent/SponsorshipsCategories/Barter";

function App() {
  const { authLoading, user } = useStore();
  const { pathname } = useLocation();
  const navPaths = [
    "/",
    "/brands",
    "/influencers",
    "/app-ads.txt",
    "/sponsorships",
    "/latest",
    "/paid",
    "/barter",
  ];
  const footerPaths = user?.userId
    ? ["/", "/app-ads.txt", "/sponsorships", "/latest", "/paid", "/barter"]
    : ["/app-ads.txt", "/sponsorships"];
  return (
    <>
      <ActivityCheck />
      <div
        style={{ opacity: authLoading ? "0" : "1" }}
        className="min-h-screen duration-300"
      >
        {!navPaths.includes(pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<RootPage />} />
            <Route path="sponsorships" element={<AllSponsorships />} />
            <Route path="latest" element={<Latest />} />
            <Route path="paid" element={<Paid />} />
            <Route path="barter" element={<Barter />} />
          </Route>
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/onboard" element={<OnBoard />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogdetails/:id" element={<BlogDetails />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/app-ads.txt" element={<AppAds />} />
          <Route
            path="/mycampaigns"
            element={
              <PrivateRoute>
                <MyCampaigns />
              </PrivateRoute>
            }
          />
          <Route
            path="/mycampaigns/details/:id"
            element={
              <PrivateRoute>
                <MyCampaignDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/mycampaigns/details/influencers/:id"
            element={
              <PrivateRoute>
                <CampaignInfluencers />
              </PrivateRoute>
            }
          />
          <Route
            path="/paymentsuccess"
            element={
              <PrivateRoute>
                <Success />
              </PrivateRoute>
            }
          />
          <Route
            path="/createcampaign"
            element={
              <PrivateRoute>
                <CreateCampaign />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <Subscription />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <PrivateRoute>
                  <AllSubscriptions />
                </PrivateRoute>
              }
            />
            <Route
              path=":name"
              element={
                <PrivateRoute>
                  <SubscriptionDetails />
                </PrivateRoute>
              }
            />
          </Route>
          <Route />
          <Route
            path="/sponsorshipdetails/:id"
            element={
              <PrivateRoute>
                <SponsorshipDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <div
        style={{ opacity: authLoading ? "0" : "1" }}
        className="duration-300"
      >
        {!footerPaths.includes(pathname) && <Footer />}
      </div>
    </>
  );
}

export default App;
