import React from "react";

export interface IEntriesProps {
  entry: string;
  height: number;
  weight: number;
  exp: number;
}

const Types: React.FC<IEntriesProps> = (props) => {
  const { entry, height, weight, exp } = props;
  return (
    <div id='entriesContainer'>
      <h2 className='subTitle' style={{ textAlign: "center" }}>
        Pokedex Entry:
      </h2>
      <p id='entryBody'> {entry} </p>
      <div id='miscContainer'>
        <h2 className='subTitle' style={{ textAlign: "center" }}>
          Misc:
        </h2>
        <p id='miscBody'>
          <b>Base Experience</b>: {exp}
        </p>
        <p id='miscBody'>
          <b>Height</b>: {height}m
        </p>
        <p id='miscBody'>
          <b>Weight</b>: {weight}kg
        </p>
      </div>
    </div>
  );
};

export default Types;
