import React, { useEffect, useState, Fragment } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

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
        setIsLoaded(true);
      });
  }, [id, name]);

  useEffect(() => {
    //setloading to false when we change pokemon and set to true after fetch
    setIsLoaded(false);
  }, [id, name]);

  const capitalize = (text: string) => {
    return text[0].toUpperCase() + text.substring(1);
  };

  let display = isLoaded ? (
    <Fragment>
      {" "}
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
          hp={stats[0]}
          attack={stats[1]}
          defense={stats[2]}
          spatk={stats[3]}
          spdef={stats[4]}
          speed={stats[5]}
        />
      </div>
      {
        <div style={{ textAlign: "center" }}>
          <Abilities ability={abilities} />
          <Entries entry={entry} height={height} weight={weight} exp={exp} />
        </div>
      }
    </Fragment>
  ) : (
    <Fragment>
      <img alt='loading' id='loadingIcon' src='img/loading.gif' />
    </Fragment>
  );

  return <div id='displayContainer'>{display}</div>;
};

export default Display;
