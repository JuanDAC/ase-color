import { ColorHSV, PatternPalette, PatternTones, TransformationProps } from './types';

export class HarmoniesColor {
  static transformation(this: any, { color, delta, weight, subtraction = false }: TransformationProps) {
    let operation = 1;
    if (typeof subtraction == 'boolean' && subtraction) operation = -1;
    if (typeof delta == 'number') delta = { h: delta, s: delta, v: delta };
    if (typeof delta == 'object' && !delta.h) delta.h = 0;
    if (typeof delta == 'object' && !delta.s) delta.s = 0;
    if (typeof delta == 'object' && !delta.v) delta.v = 0;
    if (typeof weight == 'number') weight = { h: weight, s: weight, v: weight };
    if (typeof weight == 'boolean' && weight == true) (operation = -1), (weight = undefined);
    if (!weight) weight = { h: 1, s: 1, v: 1 };
    if (typeof weight == 'object' && !weight.h) weight.h = 0;
    if (typeof weight == 'object' && !weight.s) weight.s = 0;
    if (typeof weight == 'object' && !weight.v) weight.v = 0;
    let s = color.saturation + weight.s * delta.s * operation;
    let v = color.hsvValue + weight.v * delta.v * operation;
    if (s > 1) s = 1 - (s % 1);
    if (v > 1) v = 1 - (v % 1);
    return new Color({
      h: (color.hsvHue + weight.h * delta.h * operation) % 360,
      s,
      v,
    });
  }
  static patternPalette(
    this: any,
    { color, angle, delta, premise = () => true, palette = [], initial_color = color, index = 1 }: PatternPalette
  ): Color[] {
    if (index <= Math.floor(360 / angle + 0.5)) {
      const new_color = HarmoniesColor.transformation({
        color,
        delta: { h: angle } as ColorHSV,
      });
      const current_color = HarmoniesColor.transformation({
        color,
        delta: { h: angle } as ColorHSV,
      });
      if (premise(index, current_color, initial_color)) {
        const color1 = HarmoniesColor.transformation({
          color: current_color,
          delta,
        });
        const color2 = HarmoniesColor.transformation({
          color: current_color,
          delta,
          subtraction: true,
        });
        return HarmoniesColor.patternPalette({
          color: new_color,
          angle,
          delta,
          premise,
          palette: [...palette, color1, current_color, color2],
          initial_color,
          index: index + 1,
        });
      }

      return HarmoniesColor.patternPalette({
        color: new_color,
        angle,
        delta,
        premise,
        palette,
        initial_color,
        index: index + 1,
      });
    }
    return [...palette];
  }

  static paletteTones(this: any, { color, delta, deep, palette = [], index }: PatternTones): Color[] {
    if (!index) index = deep > 0 ? (index = deep * -1) : deep;

    if (index <= deep) {
      const new_color = HarmoniesColor.transformation({
        color,
        delta,
        weight: index,
      });
      return HarmoniesColor.paletteTones({ color, delta, deep, palette: [...palette, new_color], index: index + 1 });
    }
    return [...palette];
  }
  static analogs(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 15,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
      premise: (index: number) => index == 1 || index == 2 || index == 24 || index == 23 || index == 22,
    });
  }
  static complementary(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 180,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
    });
  }
  static split_complementary(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 30,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
      premise: (index) => index == 5 || index == 7 || index == 12,
    });
  }
  static compounds(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 5,
      delta: { s: 0.24, v: -0.36 } as ColorHSV,
      premise: (index, current_color) => {
        if (index == 33) {
          current_color.hsvValue = current_color.hsvValue * 0.6;
          current_color.saturation = current_color.saturation * 0.9;
        }
        return index == 4 || index == 36 || index == 32 || index == 72;
      },
    });
  }
  static squares(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 90,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
    });
  }
  static complementary_doubles(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 30,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
      premise: (index) => index == 1 || index == 5 || index == 7 || index == 11 || index == 12,
    });
  }
  static monochromaticos(color: Color) {
    return HarmoniesColor.paletteTones({
      color,
      delta: { s: 0.12 } as ColorHSV,
      deep: 5,
    });
  }
  static shades(color: Color) {
    return HarmoniesColor.paletteTones({
      color,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
      deep: 5,
    });
  }
  static tones(color: Color) {
    return HarmoniesColor.paletteTones({
      color,
      delta: { v: -0.06 } as ColorHSV,
      deep: 5,
    });
  }
  static triad(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 120,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
    });
  }
  static complementary_triad(color: Color) {
    return HarmoniesColor.patternPalette({
      color,
      angle: 15,
      delta: { s: 0.06, v: -0.09 } as ColorHSV,
      premise: (index) => index == 9 || index == 15 || index == 24,
    });
  }
}
