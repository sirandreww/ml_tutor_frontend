import React from "react";
import { useScrollTrigger } from "@mui/material";

const ScrollHandler = props => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: props.window ? window() : undefined
  });

  const transparent = props.transparent;
  console.log(transparent);

  return React.cloneElement(props.children, {
    style: {
      backgroundColor: trigger ? props.nonTransparentBackgroundColor : props.transparentBackgroundColor,
      color: trigger ? props.nonTransparentColor : props.transparentColor,
      transition: trigger ? props.nonTransparentTransition : props.transparentTransition,
      boxShadow: props.boxShadow,
      padding: props.padding
    }
  });
};

ScrollHandler.defaultProps = {
  nonTransparentBackgroundColor: "#3c4e76",
  transparentBackgroundColor: "#3c4e76",
  nonTransparentColor: "white",
  transparentColor: "white",
  nonTransparentTransition: "0.3s",
  transparentTransition: "0.5s",
  boxShadow: "none",
  padding: "10px 0px",
}

const ScrollToColor = props => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;
