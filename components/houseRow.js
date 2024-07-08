import React from "react";
import currencyFormatter from "../helpers/currencyFormatter";

const HouseRow = ({address, country, price }) => {
  return (
    <tr>
      <td>{address}</td>
      <td>{country}</td>
      <td>{currencyFormatter.format(price)}</td>
    </tr>
  );
};

// Only pure component functions may be cached - meaning same props and state will render same output
const HouseRowMem = React.memo(HouseRow);

export default HouseRow;
export { HouseRowMem };
