import CaptchaWrapper from "@/components/CaptchaWrapper";
import Banner from "./components/Banner";
import CommitmentBanner from "./components/CommitmentBanner";
import FullTimePlacement from "./components/FullTimePlacement";
import GroupOfCompanies from "./components/GroupOfCompanies";
import Partners from "./components/Partners";
import PartTimePlacement from "./components/PartTimePlacement";
import PlacementMap from "./components/PlacementMap";
import PlacementStats from "./components/PlacementStats";
import Table from "./components/Table";

const HomePage = () => {
  return (
    <div>
      <CaptchaWrapper>
        <Banner />
      </CaptchaWrapper>
      <PlacementStats />
      <Partners />
      <Table />
      <PlacementMap />
      <CommitmentBanner />
      <FullTimePlacement />
      <PartTimePlacement />
      <GroupOfCompanies />
    </div>
  );
};

export default HomePage;
