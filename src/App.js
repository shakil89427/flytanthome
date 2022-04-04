import AdBanner from "./Components/AdBanner";
import Banner from "./Components/Banner";
import FeaturedInfluencers from "./Components/FeaturedInfluencers";
import Sponsorships from "./Components/Sponsorships";
import sponsorshipsData from "./BluePrint/SponsorshipsData";
import FeaturedData from "./BluePrint/FeaturedData";

function App() {
  return (
    <>
      <Banner />
      <FeaturedInfluencers featured={FeaturedData} />
      <AdBanner />
      <Sponsorships sponsorships={sponsorshipsData} type={"Latest"} />
      <Sponsorships sponsorships={sponsorshipsData} type={"Paid"} />
      <AdBanner />
      <Sponsorships sponsorships={sponsorshipsData} type={"Barter"} />
    </>
  );
}

export default App;
