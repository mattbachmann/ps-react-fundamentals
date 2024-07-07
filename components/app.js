import Banner from "./banner";
import HouseList from "./houseList";

const App = () => {
  return (
    <>
      <Banner>
        <div>Providing houses all over the world</div>
      </Banner>
        <Banner text="Hallo Text!">
        </Banner>
      <HouseList />
    </>
  );
};

export default App;
