import React, { useState } from "react";
import MenuItem from "./MenuItem";
import Pokedex from "../pokedex";

export interface ImenuProps {
  setCurrPoke: React.Dispatch<React.SetStateAction<number>>;
  processNumber: (num: number) => string;
}

const Menu: React.FC<ImenuProps> = (props) => {
  const [filter, setFilter] = useState("");
  const [display, setDisplay] = useState(Math.floor(window.innerHeight / 20)); //default number to display
  const [threshhold, setThreshold] = useState(window.innerHeight); //default scroll threshold
  const pokeNames = Pokedex.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon,
  }));

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    //update amount to display after scrolling past a certain point
    if (e.currentTarget.scrollTop > threshhold) {
      setDisplay(display + Math.floor(window.innerHeight / 25));
      setThreshold(threshhold + window.innerHeight * 2 - 100);
    }
  };

  let filteredPokeNames = pokeNames.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(filter.toLowerCase());
  });

  filteredPokeNames = filteredPokeNames.slice(
    0,
    Math.min(filteredPokeNames.length, display)
  );

  return (
    <div id='menuContainer'>
      <input
        autoComplete={"false"}
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setDisplay(24);
          setThreshold(500);
        }}
        id='menuInput'
        placeholder='Search...'
      />
      <div
        onScroll={(e) => {
          handleScroll(e);
        }}
        style={{ overflow: "scroll", height: "93%" }}>
        {filteredPokeNames.map((pokemon) => (
          <MenuItem
            name={pokemon.name}
            number={props.processNumber(pokemon.id)}
            index={pokemon.id}
            img={
              "https://img.pokemondb.net/sprites/home/normal/" +
              pokemon.name.toLowerCase() +
              ".png"
            }
            setCurrPoke={props.setCurrPoke}
          />
        ))}
        {filteredPokeNames.length === 0 && (
          <p style={{ color: "white" }}> No Pokemon Found </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
