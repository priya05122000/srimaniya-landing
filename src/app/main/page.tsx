import AlumniStories from "./components/AlumniStories";
import Banner from "./components/Banner";
import Partners from "./components/Partners";
import PlacementMap from "./components/PlacementMap";
import PlacementStats from "./components/PlacementStats";
import ShowReel from "./components/ShowReel";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PlacementStats />
      <Partners />
      <PlacementMap />
      <AlumniStories />
      <ShowReel />
    </div>
  );
};

export default HomePage;
