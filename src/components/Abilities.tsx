import React, { Fragment, useEffect, useState } from "react";

export interface IAbilitiesProps {
  ability: string[];
}

const Types: React.FC<IAbilitiesProps> = (props) => {
  const { ability } = props;
  const [ability1, setAbility1] = useState<string[]>([]);
  const [ability2, setAbility2] = useState<string[]>([]);

  useEffect(() => {
    fetch(ability[0])
      .then((res) => res.json())
      .then((result) => {
        setAbility1([capitalize(result.name), result.effect_entries[0].effect]);
      });
    if (ability.length > 1) {
      //There is only one ability in some cases
      fetch(ability[1])
        .then((res) => res.json())
        .then((result) => {
          setAbility2([capitalize(result.name), result.effect_entries[0].effect]);
        });
    } else {
      setAbility2([]);
    }
  }, [ability]);

  const capitalize = (text: string) => {
    return text[0].toUpperCase() + text.substring(1);
  };

  return (
    <div id='abilityContainer'>
      <h2 className='subTitle' style={{ textAlign: "center" }}>
        Abilities:
      </h2>
      <h2 id='abilityName'> {ability1[0]} </h2>
      <p id='abilityBody'> {ability1[1]} </p>
      {ability2.length > 0 && (
        <Fragment>
          <h2 id='abilityName'> {ability2[0]} </h2>
          <p id='abilityBody'> {ability2[1]} </p>
        </Fragment>
      )}
    </div>
  );
};

export default Types;
