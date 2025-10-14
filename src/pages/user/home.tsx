import UserLayout from "../../layouts/UserLayout";
import Banner from "../../components/mainUser/Pages_home/Banner";
import MainContent from "../../components/mainUser/Pages_home/MainContent/MainContent";
import Spotlight from "../../components/mainUser/Pages_home/Spotlight";
import Blogs from "../../components/mainUser/Pages_home/Blogs";
import AboutTeam from "../../components/mainUser/Pages_home/About_the_Team";
import FAQ from "../../components/mainUser/Pages_home/FAQ";
import TopSportsComplexes from "../../components/mainUser/Cities";
import DownloadBanner from "../../components/mainUser/Pages_home/DownloadBanner";

const Home = () => {
  return (
    <>
      <UserLayout>
        <Banner />
        <MainContent />
        <Spotlight />
        <Blogs />
        <AboutTeam />
        <FAQ />
        <TopSportsComplexes />
        <DownloadBanner />
      </UserLayout>
    </>
  );
};

export default Home;
