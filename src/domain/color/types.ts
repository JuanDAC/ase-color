export type ColorRGB = { red: number; green: number; blue: number; alfa?: number };
export type ColorHSV = { h: number; s: number; v: number };
export type ColorHSL = { h: number; s: number; l: number };
export type ColorYUV = { y: number; u: number; v: number };
export type ColorCMYK = { c: number; m: number; y: number; k: number };
export type ColorHex = string;

export type TransformationProps = {
  color: Color;
  delta: ColorHSV | number;
  weight?: ColorHSV | boolean | number;
  subtraction?: boolean;
};

export type PatternPalette = {
  color: Color;
  angle: number;
  delta: ColorHSV;
  premise?: (index: number, current: Color, initial: Color) => boolean;
  palette?: Color[];
  initial_color?: Color;
  index?: number;
};

export type PatternTones = {
  color: Color;
  delta: ColorHSV;
  deep: number;
  palette?: Color[];
  index?: number;
};
