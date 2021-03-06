import React from "react";
import { useScrollTrigger } from "@mui/material";

const ScrollHandler = (props: any) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    // @ts-ignore
    target: props.window ? window() : undefined
  });

  return React.cloneElement(props.children, {
    style: {
      backgroundColor: trigger ? props.nonTransparentBackgroundColor : props.transparentBackgroundColor,
      color: trigger ? props.nonTransparentColor : props.transparentColor,
      transition: trigger ? props.nonTransparentTransition : props.transparentTransition,
      boxShadow: trigger ? props.nonTransparentBoxShadow : props.transparentBoxShadow ,
      padding: props.padding
    }
  });
};

ScrollHandler.defaultProps = {
  nonTransparentBackgroundColor: "white",
  transparentBackgroundColor: "white",
  nonTransparentColor: "black",
  transparentColor: "black",
  nonTransparentTransition: "0.3s",
  transparentTransition: "0.5s",
  nonTransparentBoxShadow: "none",
  transparentBoxShadow: "none",
  padding: "10px 0px",
}

type Props = {
  nonTransparentBackgroundColor: string,
  transparentBackgroundColor: string,
  nonTransparentColor: string,
  transparentColor: string,
  nonTransparentTransition: string,
  transparentTransition: string,
  nonTransparentBoxShadow: string,
  transparentBoxShadow: string,
  padding: string,
  children: any,
}

const ScrollToColor = (props: Props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;
