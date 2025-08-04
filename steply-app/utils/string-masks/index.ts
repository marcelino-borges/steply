import { Mask } from "@react-input/mask";

export const phoneMask = new Mask({
  mask: "(__) _____-____",
  replacement: { _: /\d/ },
});
