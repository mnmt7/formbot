import classes from "./Feature.module.css";

export default function Feature({ feature }) {
  const { img, title, description } = feature;

  return (
    <li className={classes.feature}>
      <img src={img} alt="" className={classes.logo} />
      <h4 className={classes.heading}>{title}</h4>
      <p className={classes.description}>{description}</p>
    </li>
  );
}
