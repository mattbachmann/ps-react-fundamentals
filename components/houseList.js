import React, { useState } from "react";
import HouseRow from "./houseRow";

const houseArray = [
  {
    id: 1,
    address: "12 Valley of Kings, Geneva",
    country: "Switzerland",
    price: 900000,
  },
  {
    id: 2,
    address: "89 Road of Forks, Bern",
    country: "Switzerland",
    price: 500000,
  },
];

const HouseList = () => {
  const [houses, setHouses] = useState(houseArray);
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);

  const addHouse = () => {
    setHouses([
      ...houses,
      {
        id: 3,
        address: "32 Valley Way, New York",
        country: "USA",
        price: 1000000,
      },
    ]);
  };

  return (
    <> {/* empty container */}
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
      <div>Counter: {counter}</div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((h) => (
              /* key property for tracking - needed for components in map fn */
              // {...h} destructuring house as different props
            <HouseRowMem key={h.id} {...h} />
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={addHouse}>
        Add
      </button>
      <button className="btn" onClick={increment}>
        Increment
      </button>
    </>
  );
};

export default HouseList;
