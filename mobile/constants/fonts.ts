export const FONT_WEIGHT = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

const BASE_SIZE = 16;

export const FONT_SIZE = {
  /** 12 */
  xs: BASE_SIZE * 0.75,
  /** 14 */
  sm: BASE_SIZE * 0.875,
  /** 16 */
  base: BASE_SIZE,
  /** 18 */
  lg: BASE_SIZE * 1.125,
  /** 20 */
  xl: BASE_SIZE * 1.25,
  /** 24 */
  "2xl": BASE_SIZE * 1.5,
  /** 30 */
  "3xl": BASE_SIZE * 1.875,
  /** 36 */
  "4xl": BASE_SIZE * 2.25,
  /** 48 */
  "5xl": BASE_SIZE * 3,
  /** 60 */
  "6xl": BASE_SIZE * 3.75,
  /** 72 */
  "7xl": BASE_SIZE * 4.5,
  /** 96 */
  "8xl": BASE_SIZE * 6,
  /** 128 */
  "9xl": BASE_SIZE * 8,
};
