import React, { useState } from "react";
import Menu from "./Menu";
import Pokedex from "../pokedex";
import Display from "./Display";

export interface IhomeProps {}

const Home: React.FC<IhomeProps> = () => {
  const [currPoke, setCurrPoke] = useState(1);

  const processNumber = (num: number) => {
    //returns 3 digit form of number
    let stringNum = num.toString();
    while (stringNum.length < 3) {
      stringNum = "0" + stringNum;
    }
    return stringNum;
  };

  return (
    <div>
      <Menu setCurrPoke={setCurrPoke} processNumber={processNumber} />
      <div id='mainContainer'>
        <Display
          name={Pokedex[currPoke - 1]}
          number={processNumber(currPoke)}
          id={currPoke}
        />
      </div>
    </div>
  );
};

export default Home;
