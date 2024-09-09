import React from "react";
import { Link } from "react-router-dom";


const ButtonAndText = () => {
  return (
    <div>
      <h1>button is comming</h1>
    </div>
  );
};


const TextDarkest = ({ text }) => {
  return <h2 className="text-sky-800">{text}</h2>;
};


const TextWhite = ({ text }) => {
  return <h2 className="text-white">{text}</h2>;
};


const TextLight = ({ text }) => {
  return <h2 className="text-sky-400">{text}</h2>;
};


const ButtonCancel = ({ buttonInnerText }) => {
  return (
    <div className="w-full h-full bg-[#803D3B] flex justify-center items-center rounded-md text-white font-medium relative overflow-hidden group/buttonCancel">
      <div className="absolute left-0 h-full w-0 bg-gradient-to-r from-orange-500 to-orange-800 group-hover/buttonCancel:w-full duration-1000 rounded-r-md "></div>
      <h2 className="z-10">{buttonInnerText}</h2>
    </div>
  );
};


const ButtonWhite = ({ buttonInnerText }) => {
  return (
    <button className="w-full h-full bg-white flex justify-center items-center rounded-xl font-bold shadow-sm shadow-sky-800 hover:shadow-lg hover:shadow-sky-800 " type="submit">
      <h2 className="z-10">{buttonInnerText}</h2>
    </button>
  );
};

const ButtonWhiteLink = ({ buttonInnerText,navigationLink }) => {
  return (
    <Link className="w-full min-h-10 max-h-full bg-white flex justify-center items-center rounded-xl font-bold shadow-sm shadow-sky-800 hover:shadow-lg hover:shadow-sky-800 " to={`${navigationLink}`}>
      <h2 className="z-10">{buttonInnerText}</h2>
    </Link>
  );
};

const ButtonDangerWhiteLink = ({ buttonInnerText,navigationLink }) => {
  return (
    <Link className="w-full h-full bg-gradient-to-t from-orange-700 to-orange-500 flex justify-center items-center rounded-xl font-bold shadow-sm shadow-sky-800 hover:shadow-lg hover:shadow-sky-800 " to={`${navigationLink}`}>
      <h2 className="z-10">{buttonInnerText}</h2>
    </Link>
  );
};


const ButtonWhiteSubmit = ({ buttonInnerText }) => {
  return (
    <button className="w-full h-full bg-white flex justify-center items-center rounded-xl font-bold shadow-sm shadow-sky-800 hover:shadow-lg hover:shadow-sky-800 " type="submit">
      <h2 className="z-10">{buttonInnerText}</h2>
    </button>
  );
};

export { ButtonAndText, ButtonCancel, ButtonWhite , TextDarkest, TextWhite,TextLight, ButtonWhiteSubmit, ButtonWhiteLink, ButtonDangerWhiteLink};
