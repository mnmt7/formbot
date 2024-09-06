import classes from "./Skeleton.module.css";

export default function Skeleton({ height, width, count }) {
  return Array(count).fill(
    <div
      className={classes.skeleton}
      style={{
        height,
        width,
      }}
    />
  );
}
