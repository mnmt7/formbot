import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function Root() {
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.complete();
    }
  });

  console.log("kmfskmdfaknfd");

  return (
    <>
      <>woah</>
      <LoadingBar ref={barRef} color="#1a5fff" waitingTime={100} />
      <Outlet />
    </>
  );
}
