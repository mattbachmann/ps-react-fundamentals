import React, {useEffect, useState} from "react";
import {HouseRowMem} from "./houseRow";

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [counter, setCounter] = useState(0);

  // Component function and useEffect are run initially AND on every state change
  useEffect(() => {
    const fetchHouses = async () => {
            setTimeout(() => setHouses( [
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
            ]), 500);
    };

    fetchHouses(); // Cannot make async calls directly in useEffect

    window.addEventListener('unhandledRejection', handler);

    return () => { // function returned is called on destruction
      window.removeEventListener('unhandledRejection', handler);
    };
  }, []); // Only fetch initially, by providing empty deps []

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
