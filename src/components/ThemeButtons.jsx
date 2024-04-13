import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import CatFaceIcon from "../assets/icons/cat-face-icon.svg";
import SunIcon from "../assets/icons/sun-icon.svg";
import NightIcon from "../assets/icons/night-icon.svg";
import MotivationIcon from "../assets/icons/head-idea-icon.svg";

export default function ThemeButtons() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="themes-container">
      <button className="button theme-button" onClick={() => setTheme("light")}>
        <img src={SunIcon} alt="" className="theme-icon" />
      </button>
      <button className="button theme-button" onClick={() => setTheme("dark")}>
        <img src={NightIcon} alt="" className="theme-icon" />
      </button>
      <button
        className="button theme-button"
        onClick={() => setTheme("motivation")}
      >
        <img src={MotivationIcon} alt="" className="theme-icon" />
      </button>
      <button className="button theme-button" onClick={() => setTheme("cat")}>
        <img src={CatFaceIcon} alt="" className="theme-icon" />
      </button>
    </div>
  );
}
