import classes from "./Theme.module.css";
import botIcon from "../assets/bot.svg";
import lightImg from "../assets/light.png";
import darkImg from "../assets/dark.png";
import tailBlueImg from "../assets/tailBlue.png";

const themes = [
  {
    value: "light",
    name: "Light",
    img: lightImg,
  },
  {
    value: "dark",
    name: "Dark",
    img: darkImg,
  },
  {
    value: "tailBlue",
    name: "Tail Blue",
    img: tailBlueImg,
  },
];

export default function Theme({ currTheme, handleSelectTheme }) {
  return (
    <div className={classes.themeContainer}>
      <div className={classes.sidebar}>
        <p className={classes.customizeText}>Customize the theme</p>
        <div className={classes.themesSelector}>
          {themes.map((theme) => (
            <div
              key={theme.value}
              className={`${classes.theme} ${
                currTheme === theme.value ? classes.selectedTheme : ""
              }`}
              onClick={() => handleSelectTheme(theme.value)}
            >
              <img
                src={theme.img}
                alt={theme.name}
                className={classes.themeImg}
              />
              <div className={classes.themeName}>{theme.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${classes.chatContainer} ${
          currTheme === "dark" ? classes.darkBg : ""
        }
        ${currTheme === "tailBlue" ? classes.tailBlueBg : ""}
        `}
      >
        <div className={classes.messageContainer}>
          <img src={botIcon} alt="Bot Image" className={classes.botImg} />
          <span
            className={`${classes.botMsg}
          ${currTheme !== "light" ? classes.lightBg : ""}
          `}
          >
            Hello
          </span>
        </div>
        <div className={classes.userMsg}>Hi</div>
      </div>
    </div>
  );
}
