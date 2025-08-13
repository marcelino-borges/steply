import { FontWeight } from "@/types/app";

export const getFontFamily = (fontWeight: FontWeight, isItalic: boolean) => {
  let fontName = "WorkSans";

  const weightStrings: Record<string, string> = {
    thin: "_100Thin",
    extralight: "_200ExtraLight",
    light: "_300Light",
    normal: "_400Regular",
    medium: "_500Medium",
    semibold: "_600SemiBold",
    bold: "_700Bold",
    extrabold: "_800ExtraBold",
    black: "_900Black",
  };

  fontName += weightStrings[fontWeight] ?? "_400Regular";

  if (isItalic) {
    fontName += "_Italic";
  }

  return fontName;
};
