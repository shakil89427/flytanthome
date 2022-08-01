import { useLayoutEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ActivityCheck from "./Components/ActivityCheck/ActivityCheck";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import useStore from "./Store/useStore";
const SocialCard = lazy(() => import("./Pages/SocialCard"));
const User = lazy(() => import("./Pages/User"));
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/Profile"));
const Influencers = lazy(() => import("./Pages/Influencers"));
const Brands = lazy(() => import("./Pages/Brands"));
const OnBoard = lazy(() => import("./Pages/OnBoard"));
const About = lazy(() => import("./Pages/About"));
const Career = lazy(() => import("./Pages/Career"));
const Privacy = lazy(() => import("./Pages/Privacy"));
const Ads = lazy(() => import("./Pages/Ads"));
const Blogs = lazy(() => import("./Pages/Blogs"));
const Terms = lazy(() => import("./Pages/Terms"));
const Contact = lazy(() => import("./Pages/Contact"));
const SponsorshipDetails = lazy(() => import("./Pages/SponsorshipDetails"));
const CreateCampaign = lazy(() => import("./Pages/CreateCampaign"));
const MyCampaigns = lazy(() => import("./Pages/MyCampaigns"));
const Subscription = lazy(() => import("./Pages/Subscription"));
const AllSubscriptions = lazy(() =>
  import("./Components/Subscription/AllSubscriptions")
);
const SubscriptionDetails = lazy(() =>
  import("./Components/Subscription/SubscriptionDetails")
);
const Success = lazy(() => import("./Components/Subscription/Success"));
const FAQs = lazy(() => import("./Components/FAQs/FAQs"));
const MyCampaignDetails = lazy(() => import("./Pages/MyCampaignDetails"));
const CampaignInfluencers = lazy(() => import("./Pages/CampaignInfluencers"));
const BlogDetails = lazy(() => import("./Pages/BlogDetails"));
const RootPage = lazy(() => import("./Components/Home/UserContent/RootPage"));
const AllSponsorships = lazy(() =>
  import("./Components/Home/UserContent/AllSponsorships")
);
const Latest = lazy(() =>
  import("./Components/Home/UserContent/SponsorshipsCategories/Latest")
);
const Paid = lazy(() =>
  import("./Components/Home/UserContent/SponsorshipsCategories/Paid")
);
const Barter = lazy(() =>
  import("./Components/Home/UserContent/SponsorshipsCategories/Barter")
);
const PopularAll = lazy(() =>
  import("./Components/Home/UserContent/Creators/PopularAll")
);
const AllVideos = lazy(() => import("./Components/Home/UserContent/AllVideos"));
const Notification = lazy(() =>
  import("./Components/Home/UserContent/Notification")
);
const MostApplied = lazy(() =>
  import("./Components/Home/UserContent/SponsorshipsCategories/MostApplied")
);
const Applied = lazy(() =>
  import("./Components/Home/UserContent/SponsorshipsCategories/Applied")
);
const Courses = lazy(() => import("./Pages/Courses"));
const Index = lazy(() => import("./Components/Courses/Index"));
const Contents = lazy(() => import("./Components/Courses/Contents"));
const AllNews = lazy(() => import("./Components/Home/UserContent/AllNews"));
// const Search = lazy(() => import("./Pages/Search"));
// const Details = lazy(() => import("./Components/Search/Details"));
const LandingApp = lazy(() => import("./Pages/LandingApp"));
const Products = lazy(() => import("./Pages/Products"));
const Main = lazy(() => import("./Components/Products/Main"));
const ProductDetails = lazy(() =>
  import("./Components/Products/ProductDetails")
);
const PaymentDetails = lazy(() =>
  import("./Components/Products/PaymentDetails")
);
const CreateInfluencersList = lazy(() =>
  import("./Pages/CreateInfluencersList")
);
const InfluencersListDetails = lazy(() =>
  import("./Pages/InfluencersListDetails")
);
const InfluencersList = lazy(() => import("./Pages/InfluencersList"));
const MyOrders = lazy(() => import("./Pages/MyOrders"));

const FallBackComponent = () => {
  return (
    <div className="barwrapper">
      <div className="barmain">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
      </div>
      <p className="bartext">
        <i>Please Wait...</i>
      </p>
    </div>
  );
};

function App() {
  const { user } = useStore();
  const location = useLocation();
  const { pathname } = location;
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
    "createinfluencerslist",
    "influencerslist",
    "socialcard",
    "products",
    user?.userId && "courses",
  ];

  const footerPaths = ["createinfluencerslist", "influencerslist"];

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  return (
    <>
      <ActivityCheck />
      <div className="min-h-screen">
        {!navPaths.includes(
          pathname?.length === 1 ? "/" : pathname.split("/")[1].toLowerCase()
        ) && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Home />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <RootPage />
                </Suspense>
              }
            />
            <Route
              path="sponsorships"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <AllSponsorships />
                </Suspense>
              }
            />
            <Route
              path="latest"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <Latest />
                </Suspense>
              }
            />
            <Route
              path="paid"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <Paid />
                </Suspense>
              }
            />
            <Route
              path="barter"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <Barter />
                </Suspense>
              }
            />
            <Route
              path="mostapplied"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <MostApplied />
                </Suspense>
              }
            />
            <Route
              path="applied"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <Applied />
                </Suspense>
              }
            />
            <Route
              path="popularinfluencers"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <PopularAll />
                </Suspense>
              }
            />
            <Route
              path="allvideos"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <AllVideos />
                </Suspense>
              }
            />
            <Route
              path="notifications"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <Notification />
                </Suspense>
              }
            />
            <Route
              path="news"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <AllNews />
                </Suspense>
              }
            />
            {user?.userId && (
              <Route
                path="courses"
                element={
                  <Suspense fallback={<FallBackComponent />}>
                    <Courses />
                  </Suspense>
                }
              >
                <Route
                  index
                  element={
                    <Suspense fallback={<FallBackComponent />}>
                      <Index />
                    </Suspense>
                  }
                />
                <Route
                  path="contents"
                  element={
                    <Suspense fallback={<FallBackComponent />}>
                      <Contents />
                    </Suspense>
                  }
                />
              </Route>
            )}
            <Route
              path="sponsorshipdetails/:id"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <SponsorshipDetails />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/influencers"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Influencers />
              </Suspense>
            }
          />
          {!user?.userId && (
            <Route
              path="courses"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <Courses />
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<FallBackComponent />}>
                    <Index />
                  </Suspense>
                }
              />
              <Route
                path="contents"
                element={
                  <Suspense fallback={<FallBackComponent />}>
                    <Contents />
                  </Suspense>
                }
              />
            </Route>
          )}

          <Route
            path="/brands"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Brands />
              </Suspense>
            }
          />
          <Route
            path="/app"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <LandingApp />
              </Suspense>
            }
          />
          <Route
            path="/onboard"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <OnBoard />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/career"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Career />
              </Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Privacy />
              </Suspense>
            }
          />
          <Route
            path="/ads"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Ads />
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path="/blogdetails/:id"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <BlogDetails />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Terms />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/faqs"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <FAQs />
              </Suspense>
            }
          />
          <Route
            path="/socialcard"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <SocialCard />
              </Suspense>
            }
          />
          <Route
            path="/products"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <Products />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <Main />
                </Suspense>
              }
            />
            <Route
              path="payment"
              element={
                <PrivateRoute>
                  <Suspense fallback={<FallBackComponent />}>
                    <PaymentDetails />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<FallBackComponent />}>
                  <ProductDetails />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/createinfluencerslist"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <CreateInfluencersList />
              </Suspense>
            }
          />
          <Route
            path="/influencerslist/:id"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <InfluencersListDetails />
              </Suspense>
            }
          />
          <Route
            path="/influencerslist"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <InfluencersList />
              </Suspense>
            }
          />
          {/* <Route
            path="/search"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <Search />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/search/details/:info"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <Details />
                </Suspense>
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/mycampaigns"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <MyCampaigns />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <MyOrders />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/mycampaigns/details/:id"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <MyCampaignDetails />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/mycampaigns/details/influencers/:id"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <CampaignInfluencers />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/paymentsuccess"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <Success />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/createcampaign"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <CreateCampaign />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <Subscription />
                </Suspense>
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <PrivateRoute>
                  <Suspense fallback={<FallBackComponent />}>
                    <AllSubscriptions />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path=":name"
              element={
                <PrivateRoute>
                  <Suspense fallback={<FallBackComponent />}>
                    <SubscriptionDetails />
                  </Suspense>
                </PrivateRoute>
              }
            />
          </Route>
          <Route />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Suspense fallback={<FallBackComponent />}>
                  <Profile />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <Suspense fallback={<FallBackComponent />}>
                <User />
              </Suspense>
            }
          />
        </Routes>
      </div>
      {!footerPaths.includes(pathname.split("/")[1].toLowerCase()) && (
        <Footer />
      )}
    </>
  );
}

export default App;
