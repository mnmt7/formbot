import feature3 from "../../assets/feature-3.svg";
import feature4 from "../../assets/feature-4.svg";
import feature5 from "../../assets/feature-5.svg";
import feature6 from "../../assets/feature-6.svg";
import feature7 from "../../assets/feature-7.svg";
import feature8 from "../../assets/feature-8.svg";
import Feature from "../Feature/Feature";
import classes from "./Features.module.css";

const features = [
  {
    img: feature3,
    title: "Hidden fields",
    description:
      "Include data in your form URL to segment your user and use its data directly in your form.",
  },
  {
    img: feature4,
    title: "Team collaboration",
    description: "Invite your teammates to work on your typebots with you",
  },
  {
    img: feature5,
    title: "Link to sub typebots",
    description: "Reuse your typebots in different parent bots.",
  },
  {
    img: feature6,
    title: "Custom code",
    description: "Customize everything with your own Javascript & CSS code",
  },
  {
    img: feature7,
    title: "Custom domain",
    description: "Connect your typebot to the custom URL of your choice",
  },
  {
    img: feature8,
    title: "Folder management",
    description:
      "Organize your typebots in specific folders to keep it clean and work with multiple clients",
  },
];

export default function Features() {
  return (
    <ul className={classes.features}>
      {features.map((feature) => (
        <Feature key={feature.title} feature={feature} />
      ))}
    </ul>
  );
}
