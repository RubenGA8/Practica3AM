// icon:rocket | Entypo http://entypo.com/ | Daniel Bruce
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconRocket(props) {
  return (
    <Svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <Path d="M4 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm7.5-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
      <Path d="M0 1.5A.5.5 0 01.5 1h1a.5.5 0 01.5.5V4h13.5a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H2v2.5a.5.5 0 01-1 0V2H.5a.5.5 0 01-.5-.5zm5.5 4a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM9 8a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z" />
      <Path d="M3 12.5h3.5v1a.5.5 0 01-.5.5H3.5a.5.5 0 01-.5-.5v-1zm4 1v-1h4v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5z" />
    </Svg>
  );
}

export default IconRocket;

  