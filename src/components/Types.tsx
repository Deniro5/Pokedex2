import React from "react";

const typeColorMap: any = {
  Steel: "#B7B7CE",
  Fighting: "#C22E28",
  Fire: "#EE8130",
  Water: "#6390F0",
  Dark: "#705746",
  Psychic: "#F95587",
  Fairy: "#D685AD",
  Normal: "#A8A77A",
  Rock: "#B6A136",
  Ground: "#E2BF65",
  Bug: "#A6B91A",
  Poison: "#A33EA1",
  Dragon: "#6F35FC",
  Flying: "#A98FF3",
  Grass: "#7AC74C",
  Electric: "#F7D02C",
  Ice: "#96D9D6",
  Ghost: "#735797",
};

export interface ITypesProps {
  types: string[];
}

const Types: React.FC<ITypesProps> = (props) => {
  const { types } = props;
  //types are reversed because they are given in reverse order
  return (
    <div id='typeContainer'>
      <h2 className='subTitle'> Type:</h2>
      {types.length > 1 && (
        <p style={{ background: typeColorMap[types[1]] }} id='pokeType'>
          {types[1]}
        </p>
      )}
      <p id='pokeType' style={{ background: typeColorMap[types[0]] }}>
        {types[0]}
      </p>
    </div>
  );
};

export default Types;
