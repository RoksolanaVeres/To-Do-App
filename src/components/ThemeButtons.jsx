import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { PiFlower } from "react-icons/pi";
import { BiLeaf, BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButtons() {
  const { setTheme } = useContext(ThemeContext);
  return (
    <div className="themes-container">
      <button className="button theme-button" onClick={() => setTheme("light")}>
        <BiSun className="theme-icon" />
      </button>
      <button className="button theme-button" onClick={() => setTheme("dark")}>
        <BiMoon className="theme-icon" />
      </button>
      <button className="button theme-button" onClick={() => setTheme("green")}>
        <BiLeaf className="theme-icon" />
      </button>
      <button
        className="button theme-button"
        onClick={() => setTheme("floral")}
      >
        <PiFlower className="theme-icon" />
      </button>
    </div>
  );
}
