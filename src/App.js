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
import RootPage from "./Components/Home/UserContent/RootPage";
import AllSponsorships from "./Components/Home/UserContent/AllSponsorships";
import Latest from "./Components/Home/UserContent/SponsorshipsCategories/Latest";
import Paid from "./Components/Home/UserContent/SponsorshipsCategories/Paid";
import Barter from "./Components/Home/UserContent/SponsorshipsCategories/Barter";
import PopularAll from "./Components/Home/UserContent/Creators/PopularAll";
import AllVideos from "./Components/Home/UserContent/AllVideos";
import Notification from "./Components/Home/UserContent/Notification";
import MostApplied from "./Components/Home/UserContent/SponsorshipsCategories/MostApplied";
import Applied from "./Components/Home/UserContent/SponsorshipsCategories/Applied";
import Courses from "./Pages/Courses";
import Index from "./Components/Courses/Index";
import Contents from "./Components/Courses/Contents";
import AllNews from "./Components/Home/UserContent/AllNews";
import Search from "./Pages/Search";
import User from "./Pages/User";
import Details from "./Components/Search/Details";
import LandingApp from "./Pages/LandingApp";

function App() {
  const { user, authLoading } = useStore();
  const { pathname } = useLocation();
  const navPaths = [
    "/",
    "brands",
    "influencers",
    "sponsorships",
    "latest",
    "paid",
    "barter",
    "popularinfluencers",
    "sponsorshipdetails",
    "allvideos",
    "notifications",
    "mostapplied",
    "applied",
    "news",
    "app",
    user?.userId && "courses",
  ];

  return (
    <>
      <ActivityCheck />
      <div
        style={{ opacity: authLoading ? "0" : "1" }}
        className={`duration-300 ${
          pathname === "/app" ? "min-h-0" : "min-h-screen"
        }`}
      >
        {!navPaths.includes(
          pathname?.length === 1 ? "/" : pathname.split("/")[1]
        ) && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<RootPage />} />
            <Route path="sponsorships" element={<AllSponsorships />} />
            <Route path="latest" element={<Latest />} />
            <Route path="paid" element={<Paid />} />
            <Route path="barter" element={<Barter />} />
            <Route path="mostapplied" element={<MostApplied />} />
            <Route path="applied" element={<Applied />} />
            <Route path="popularinfluencers" element={<PopularAll />} />
            <Route path="allvideos" element={<AllVideos />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="news" element={<AllNews />} />
            {user?.userId && (
              <Route path="courses" element={<Courses />}>
                <Route index element={<Index />} />
                <Route path="contents/:id" element={<Contents />} />
              </Route>
            )}
            <Route
              path="sponsorshipdetails/:id"
              element={<SponsorshipDetails />}
            />
          </Route>
          <Route path="/influencers" element={<Influencers />} />
          {!user?.userId && (
            <Route path="courses" element={<Courses />}>
              <Route index element={<Index />} />
              <Route
                path="contents/:id"
                element={
                  <PrivateRoute>
                    <Contents />
                  </PrivateRoute>
                }
              />
            </Route>
          )}

          <Route path="/brands" element={<Brands />} />
          <Route path="/app" element={<LandingApp />} />
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
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="/search/details/:info"
            element={
              <PrivateRoute>
                <Details />
              </PrivateRoute>
            }
          />
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
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/:id" element={<User />} />
        </Routes>
      </div>
      <div
        style={{ opacity: authLoading ? "0" : "1" }}
        className="duration-300"
      >
        <Footer />
      </div>
    </>
  );
}

export default App;
