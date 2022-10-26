import { NumTS } from 'juandac/ase-numts/src/main';

export class Transforms {
  static grayScale(color: Color) {
    return new Color({
      h: color.hsvHue,
      s: 0,
      v: color.hsvValue,
    });
  }

  static randomColor() {
    return new Color({
      h: Math.floor(Math.random() * 360 + 0.5),
      s: Math.random(),
      v: Math.random(),
    });
  }

  static blendColors(color_one: Color, color_two: Color, balance: number) {
    const porcentage = balance * 0.01;
    const colors = [
      [color_one.hsvHue, color_two.hsvHue],
      [color_one.saturation, color_two.saturation],
      [color_one.hsvValue, color_two.hsvValue],
    ];
    const percentage = [NumTS.full(3, 1 - porcentage), NumTS.full(3, porcentage)];
    const [hue, saturation, value] = NumTS.multiply(NumTS.T(percentage), colors).map((vector) => NumTS.sum(vector)) as number[];
    return new Color({ hue, saturation, value });
  }

  static gradientGenerator(color_one: Color, color_two: Color, number_colors: number) {
    if (number_colors >= 3) {
      return Array.from({ length: number_colors }, (_, index) =>
        index !== 0 ? Transforms.blendColors(color_one, color_two, index * (100 / number_colors)) : color_one
      );
    }
    return [color_one, color_two];
  }

  static contrast(color_one: Color, color_two: Color) {
    const lum1 = color_one.lightness;
    const lum2 = color_two.lightness;
    const brightest = math.max(lum1, lum2);
    const darkest = math.min(lum1, lum2);
    const contrast = math.floor(((brightest + 0.05) / (darkest + 0.05)) * 100 + 0.5) / 100;
    const contrast_text = contrast > 2.1;
    const contrast_text_best = contrast > 3;
    const contrast_text_color_blind = contrast > 4.5;
    return [contrast, { text: contrast_text, text_best: contrast_text_best, color_blind: contrast_text_color_blind }];
  }
}
