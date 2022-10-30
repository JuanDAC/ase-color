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

  static blendColors(colorOne: Color, colorTwo: Color, balance: number) {
    const porcentage = balance * 0.01;
    const colors = [
      [colorOne.hsvHue, colorTwo.hsvHue],
      [colorOne.saturation, colorTwo.saturation],
      [colorOne.hsvValue, colorTwo.hsvValue],
    ];
    const percentage = [NumTS.full(3, 1 - porcentage), NumTS.full(3, porcentage)];
    const [hue, saturation, value] = NumTS.multiply(NumTS.T(percentage), colors).map((vector) => NumTS.sum(vector)) as number[];
    return new Color({ hue, saturation, value });
  }

  static gradientGenerator(colorOne: Color, colorTwo: Color, numberColors: number) {
    if (numberColors >= 3) {
      return Array.from({ length: numberColors }, (_, index) =>
        index !== 0 ? Transforms.blendColors(colorOne, colorTwo, index * (100 / numberColors)) : colorOne
      );
    }
    return [colorOne, colorTwo];
  }

  static contrast(
    colorOne: Color,
    colorTwo: Color
  ): [
    number,
    {
      text: boolean;
      textBest: boolean;
      colorBlind: boolean;
    }
  ] {
    const lum1 = colorOne.lightness;
    const lum2 = colorTwo.lightness;
    const brightest = math.max(lum1, lum2);
    const darkest = math.min(lum1, lum2);
    const contrast = math.floor(((brightest + 0.05) / (darkest + 0.05)) * 100 + 0.5) / 100;
    const contrastText = contrast > 2.1;
    const contrastTextBest = contrast > 3;
    const contrastTextColorBlind = contrast > 4.5;
    return [contrast, { text: contrastText, textBest: contrastTextBest, colorBlind: contrastTextColorBlind }];
  }
}
