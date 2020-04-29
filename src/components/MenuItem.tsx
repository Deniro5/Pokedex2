import React from "react";

export interface IhomeProps {
  name: string;
  number: string;
  index: number;
  img: string;
  setCurrPoke: React.Dispatch<React.SetStateAction<number>>;
}

const MenuItem: React.FC<IhomeProps> = (props) => {
  const { name, number, img, setCurrPoke, index } = props;
  return (
    <div>
      <div
        onClick={() => {
          setCurrPoke(index);
        }}
        id='menuItem'>
        <img src={img} alt='icon' />
        <p> {`#${number} - ${name}`} </p>
      </div>
    </div>
  );
};

export default MenuItem;
