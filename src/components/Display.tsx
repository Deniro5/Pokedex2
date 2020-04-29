import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import Types from "./Types";
import Abilities from "./Abilities";
import Entries from "./Entries";

export interface IDisplayProps {
  name: string;
  id: number;
  number: string;
}

const Display: React.FC<IDisplayProps> = (props) => {
  const { name, number, id } = props;

  const [entry, setEntry] = useState("");
  const [exp, setExp] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [stats, setStats] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`) //need this call for the entry
      .then((res) => res.json())
      .then((result) => {
        let textentry = result.flavor_text_entries;
        setEntry(
          textentry[1].language.name === "en"
            ? textentry[1].flavor_text
            : textentry[2].flavor_text
        );
      });
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`) //need this call for all other info
      .then((res) => res.json())
      .then((result) => {
        setHeight(result.height / 10);
        setWeight(result.weight / 10);
        setExp(result.base_experience);
        setAbilities(
          result.abilities.map((ability: { ability: { url: string } }) =>
            capitalize(ability.ability.url)
          )
        );
        setStats(result.stats.map((stat: { base_stat: number }) => stat.base_stat));
        setTypes(
          result.types.map((type: { type: { name: string } }) =>
            capitalize(type.type.name)
          )
        );
      });
  }, [id, name]);

  const capitalize = (text: string) => {
    return text[0].toUpperCase() + text.substring(1);
  };

  return (
    <div id='displayContainer'>
      <h2 className='title'> {`#${number} - ${name}`} </h2>
      <div id='displayImgContainer'>
        <img
          alt={name}
          src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${number}.png`}
        />
      </div>
      <div id='displayInfoContainer'>
        <Types types={types} />
        <Stats
          hp={stats[5]}
          attack={stats[4]}
          defense={stats[3]}
          spatk={stats[2]}
          spdef={stats[1]}
          speed={stats[0]}
        />
      </div>
      {
        <div style={{ textAlign: "center" }}>
          <Abilities ability={abilities} />
          <Entries entry={entry} height={height} weight={weight} exp={exp} />
        </div>
      }
    </div>
  );
};

export default Display;
