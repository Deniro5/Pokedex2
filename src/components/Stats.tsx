import React, { Fragment } from "react";

export interface IStatsProps {
  hp: number;
  attack: number;
  defense: number;
  spatk: number;
  spdef: number;
  speed: number;
}

const Stats: React.FC<IStatsProps> = (props) => {
  const { hp, attack, defense, spatk, spdef, speed } = props;
  return (
    <Fragment>
      <div className='statContainer'>
        <h2 className='subTitle'> Base Stats:</h2>
        <p id='statName'> HP: </p>
        <div className='statBar' style={{ background: "red", width: hp + "px" }}>
          {hp}
        </div>
      </div>
      <div className='statContainer'>
        <p id='statName'> Attack: </p>
        <div className='statBar' style={{ background: "Orange", width: attack + "px" }}>
          {attack}
        </div>
      </div>
      <div className='statContainer'>
        <p id='statName'> Defense: </p>
        <div className='statBar' style={{ background: "Green", width: defense + "px" }}>
          {defense}
        </div>
      </div>
      <div className='statContainer'>
        <p id='statName'> Sp Atk: </p>
        <div className='statBar' style={{ background: "Purple", width: spatk + "px" }}>
          {spatk}
        </div>
      </div>
      <div className='statContainer'>
        <p id='statName'> Sp Def: </p>
        <div className='statBar' style={{ background: "Brown", width: spdef + "px" }}>
          {spdef}
        </div>
      </div>
      <div className='statContainer'>
        <p id='statName'> Speed: </p>
        <div className='statBar' style={{ background: "Blue", width: speed + "px" }}>
          {speed}
        </div>
      </div>
    </Fragment>
  );
};

export default Stats;
