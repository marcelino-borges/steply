export const BASE_RADIUS = 4;

export const RADIUS = {
  /** 0.5 pt */
  "1/8": BASE_RADIUS / 8,
  /** 1 pt */
  "1/4": BASE_RADIUS / 4,
  /** 1 pt */
  "0.25": BASE_RADIUS / 4,
  /** 2 pt */
  "1/2": BASE_RADIUS / 2,
  /** 2 pt */
  "0.5": BASE_RADIUS / 2,
  /** 4 pt */
  1: BASE_RADIUS,
  /** 4 pt */
  xs: BASE_RADIUS,
  /** 8 pt */
  2: BASE_RADIUS * 2,
  /** 8 pt */
  sm: BASE_RADIUS * 2,
  /** 12 pt */
  3: BASE_RADIUS * 3,
  /** 16 pt */
  4: BASE_RADIUS * 4,
  /** 16 pt */
  md: BASE_RADIUS * 4,
  /** 20 pt */
  5: BASE_RADIUS * 5,
  /** 24 pt */
  6: BASE_RADIUS * 6,
  /** 28 pt */
  7: BASE_RADIUS * 7,
  /** 32 pt */
  8: BASE_RADIUS * 8,
  /** 32 pt */
  lg: BASE_RADIUS * 8,
  /** 36 pt */
  9: BASE_RADIUS * 9,
  /** 40 pt */
  10: BASE_RADIUS * 10,
  /** 44 pt */
  11: BASE_RADIUS * 11,
  /** 48 pt */
  12: BASE_RADIUS * 12,
  /** 52 pt */
  13: BASE_RADIUS * 13,
  /** 56 pt */
  14: BASE_RADIUS * 14,
  /** 64 pt */
  16: BASE_RADIUS * 16,
  /** 64 pt */
  xl: BASE_RADIUS * 16,
  /** 128 pt */
  32: BASE_RADIUS * 32,
  /** 128 pt */
  "2xl": BASE_RADIUS * 32,
  /** 256 pt */
  64: BASE_RADIUS * 64,
  /** 256 pt */
  "3xl": BASE_RADIUS * 64,
  /** 512 pt */
  128: BASE_RADIUS * 128,
  /** 512 pt */
  "4xl": BASE_RADIUS * 128,
} as const;
