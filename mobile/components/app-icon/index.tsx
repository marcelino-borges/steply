import React from "react";
import { Image } from "react-native";

import styles from "./styles";

const AppIcon: React.FC = () => {
  return (
    <Image style={styles.icon} source={require("@/assets/images/icon.png")} />
  );
};

export default AppIcon;
