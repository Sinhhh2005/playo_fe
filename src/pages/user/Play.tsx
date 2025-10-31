import UserLayout from "../../layouts/UserLayout";
import Collections from "../../components/mainUser/pages_Play/Collections";
import TopSportsComplexes from "../../components/mainUser/Cities";
import GamesList from "../../components/mainUser/pages_Play/GamesList";

const Play = () => {
  return (
    <UserLayout>
      <GamesList />
      <Collections />
      <TopSportsComplexes />
    </UserLayout>
  );
};

export default Play;
