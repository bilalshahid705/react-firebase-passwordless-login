import React from "react";
import "./small-loader.styles.scss";

const SmallLoader = ({ size, borderSize }) => {
  return (
    <div
      className="small-loader-component"
      style={{ width: size, height: size, borderWidth: borderSize }}
    ></div>
  );
};

export default SmallLoader;
