import { Text } from "react-native";

interface TabBarLabelProps {
  children: string;
  color: string;
}

export default function TabBarLabel({ children, color }: TabBarLabelProps) {
  return <Text style={{ fontSize: 12, color }}>{children}</Text>;
}
