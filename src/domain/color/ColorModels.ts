import { NumTS } from 'juandac/ase-numts/src/main';
import { RGB2LAB, RGB2XYZ } from './ColorModels.constants';
import { ColorCMYK, ColorHex, ColorHSL, ColorHSV, ColorRGB, ColorYUV } from './types';

export class ColorModels {
  static RGB2LAB(this: any, { red, green, blue }: ColorRGB) {
    const XYZ = ColorModels.RGB2XYZ({ red, green, blue });
    const [x, y, z] = NumTS.divide(XYZ, RGB2LAB.XN_YN_ZN);
    const a = 500 * (RGB2LAB.f(x) - RGB2LAB.f(y));
    const b = 200 * (RGB2LAB.f(y) - RGB2LAB.f(z));
    const l = 116 * RGB2LAB.f(y) - 16;
    return { l, a, b };
  }

  static RGB2XYZ(this: any, { red, green, blue }: ColorRGB) {
    const rgb = [red, green, blue];
    const rgbPrime = NumTS.divide(rgb, 255);
    const XYZ = NumTS.multiply(RGB2XYZ.TRANSFORMATION_2_XYZ, rgbPrime).map((vector) => NumTS.sum(vector)) as number[];
    return XYZ;
  }

  static colorDistance(this: any, colorOne: ColorRGB, colortwo: ColorRGB) {
    const lab1 = ColorModels.RGB2LAB(colorOne);
    const lab2 = ColorModels.RGB2LAB(colortwo);
    const dl = lab1.l - lab2.l;
    const C1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
    const C2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
    const dC = C1 - C2;
    const dC2 = Math.pow(dC, 2);
    const da2 = Math.pow(lab1.a - lab2.a, 2);
    const db2 = Math.pow(lab1.b - lab2.b, 2);
    const dH = Math.sqrt(Math.max(0, da2 + db2 - dC2));
    const Kl = 1.0;
    const K1 = 0.045;
    const K2 = 0.015;
    const s12 = Math.pow(dl / Kl, 2);
    const s22 = Math.pow(dC / (Kl + K1 * C1), 2);
    const s32 = Math.pow(dH / (Kl + K2 * C1), 2);
    return Math.sqrt(s12 + s22 + s32);
  }
  static get_color(col: Color) {
    if (typeof col === 'string') {
      /*       return ColorModels.parseHexColor(col) */
    }
    return col;
  }
  static HSV2RGB(this: any, { h, s, v }: ColorHSV) {
    const HsubI = Math.abs((h / 60) % 6);
    const f = ((h / 60) % 6) - HsubI;
    const p = v * (1 - s) * 255;
    const q = v * (1 - f * s) * 255;
    const t = v * (1 - (1 - f) * s) * 255;
    v = v * 255;
    if (HsubI == 0) return { red: v, green: t, blue: p };
    if (HsubI == 1) return { red: q, green: v, blue: p };
    if (HsubI == 2) return { red: p, green: v, blue: t };
    if (HsubI == 3) return { red: p, green: q, blue: v };
    if (HsubI == 4) return { red: t, green: p, blue: v };
    if (HsubI == 5) return { red: v, green: p, blue: q };
  }
  static RGB2HSV(this: any, { red, green, blue }: ColorRGB) {
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    const r = red,
      g = green,
      b = blue;
    const delta = max - min;
    const v = max;
    let h, s;
    if (delta < 0.00001) {
      s = 0;
      h = 0;
      return { h, s, v };
    }
    if (max > 0) s = delta / max;
    else {
      s = 0;
      h = 0;
      return { h, s, v };
    }
    if (r > max) h = (g - b) / delta;
    else {
      if (g >= max) h = 2 + (b - r) / delta;
      else h = 4 + (r - g) / delta;
    }
    h = h * 60;
    if (h < 0.0) h = h + 360;
    return { h, s, v };
  }

  static RGB_2_HSV(this: any, { red: r, green: g, blue: b }: ColorRGB) {
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const v = max;
    let h, s;
    if (v == 0) {
      h = 0;
      s = 0;
      return { h, s, v };
    }
    s = (255 * (max - min)) / v;
    if (s == 0) {
      h = 0;
      return { h, s, v };
    }
    if (max == r) h = 0 + (43 * (g - b)) / (max - min);
    else if (max == g) h = 85 + (43 * (b - r)) / (max - min);
    else h = 171 + (43 * (r - g)) / (max - min);
    return { h, s, v };
  }
  static RGB2HSL(this: any, { red, green, blue }: ColorRGB) {
    const [r, g, b] = NumTS.divide([red, green, blue], 255);
    let h = 0,
      s = 0,
      l = 0;
    const v = Math.max(Math.max(r, g), b);
    const m = Math.min(Math.min(r, g), b);
    l = (m + v) / 2;
    if (l <= 0) return { h, s, l };
    const vm = v - m;
    s = vm;
    if (s > 0) {
      if (l <= 0.5) s = s / (v + m);
      else s = s / (2.0 - v - m);
    } else return { h, s, l };
    const r2 = (v - r) / vm;
    const g2 = (v - g) / vm;
    const b2 = (v - b) / vm;
    if (r == v) {
      if (g == m) h = 5 + b2;
      else h = 1 - g2;
    } else if (b == m) {
      if (g == m) h = 1 + r2;
      else h = 3 - b2;
    } else {
      if (r == m) h = 3 + g2;
      else {
        h = 5 - r2;
      }
    }
    h = h / 6.0;
    return { h, s, l };
  }
  static HSL2RGB(this: any, { h, s, l }: ColorHSL) {
    let r = l,
      g = l,
      b = l;
    const v = l <= 0.5 ? l * (1.0 + s) : l + s - l * s;
    if (v > 0) {
      const m = l + l - v;
      const sv = (v - m) / v;
      h = h * 6.0;
      const sextant = Math.floor(h);
      const fract = h - sextant;
      const vsf = v * sv * fract;
      const mid1 = m + vsf;
      const mid2 = v - vsf;
      if (sextant == 0) (r = v), (g = mid1), (b = m);
      else if (sextant == 1) (r = mid2), (g = v), (b = m);
      else if (sextant == 2) (r = m), (g = v), (b = mid1);
      else if (sextant == 3) (r = m), (g = mid2), (b = v);
      else if (sextant == 4) (r = mid1), (g = m), (b = v);
      else if (sextant == 5) (r = v), (g = m), (b = mid2);
    }
    r = r * 255;
    g = g * 255;
    b = b * 255;
    return { red: r, green: g, blue: b };
  }
  static RGB2YUV(this: any, { red, green, blue }: ColorRGB) {
    const [r, g, b] = NumTS.divide([red, green, blue], 255);
    const [y, u, v] = [
      16 + (65.738 * r) / 256 + (129.057 * g) / 256 + (25.064 * b) / 256,
      128 - (37.945 * r) / 256 - (74.494 * g) / 256 + (112.439 * b) / 256,
      128 + (112.439 * r) / 256 - (94.154 * g) / 256 - (18.285 * b) / 256,
    ];
    return { y, u, v };
  }
  static YUV2RGB(this: any, { y, u, v }: ColorYUV) {
    const [r, g, b] = [y + 1.14 * v, y - 0.396 * u - 0.581 * v, y + 2.029 * u];
    return { red: r * 255, green: g * 255, blue: b * 255 };
  }
  static RGB2CMYK(this: any, { red, green, blue }: ColorRGB) {
    let [c, m, y] = [255 - red, 255 - green, 255 - blue];
    const b = Math.min(c, m, y);
    c = Math.round((c - b) / (255 - b));
    m = Math.round((m - b) / (255 - b));
    y = Math.round((y - b) / (255 - b));
    const k = Math.round(b / 255);
    return { c, m, y, k };
  }
  static CMYK2RGB(this: any, { c, m, y, k }: ColorCMYK) {
    const [r, g, b] = [255 - Math.round(2.55 * (c + k)), 255 - Math.round(2.55 * (m + k)), 255 - Math.round(2.55 * (y + k))];
    const red = Math.max(r, 0);
    const green = Math.max(g, 0);
    const blue = Math.max(b, 0);
    return { red, green, blue };
  }
  static RGB2RGBA({ red, green, blue, alfa }: ColorRGB) {
    const min = Math.min(red, green, blue);
    const a = (255 - min) / 255;
    red = Math.round((red - min) / a);
    green = Math.round((green - min) / a);
    blue = Math.round((blue - min) / a);
    alfa = Math.round(a);
    return { red, green, blue, alfa };
  }
  static RGB2HEX(this: any, { red, green, blue }: ColorRGB) {
    return `#${red.toString(16).padEnd(2, '00')}${green.toString(16).padEnd(2, '00')}${blue.toString(16).padEnd(2, '00')}`;
  }
  static HEX2RGB(hex: ColorHex) {
    if ((hex.length !== 4 && hex.length !== 7) || !hex.startsWith('#')) return { red: 0, green: 0, blue: 0 };
    let r, g, b;
    if (hex.length == 4) {
      r = hex[2];
      r = `${r}${r}`;
      g = hex[3];
      g = `${g}${g}`;
      b = hex[4];
      b = `${b}${b}`;
    } else {
      r = `${hex[2]}${hex[3]}`;
      g = `${hex[4]}${hex[5]}`;
      b = `${hex[6]}${hex[7]}`;
    }
    return { red: parseInt(r, 16), green: parseInt(g, 16), blue: parseInt(b, 16) };
  }
  static HEX2GRAY(this: any, { red, green, blue }: ColorRGB) {
    const gray = (red + green + blue) / 3;
    return { red: gray, green: gray, blue: gray };
  }
  static RGB2CIE(this: any, { red, green, blue }: ColorRGB) {
    const [x, y, z] = [red / (red + green + blue), green / (red + green + blue), blue / (red + green + blue)];
    return { x, y, z };
  }
  static brightness(this: any, { red, green, blue }: ColorRGB): number {
    const a = NumTS.divide([red, green, blue], 255).map((value: number) =>
      value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
    );
    const proportions = [0.2126, 0.7152, 0.0722];
    const brightness = NumTS.sum(NumTS.multiply(a, proportions)) as number;
    return brightness;
  }
  static brightness_deep(this: any, { red, green, blue }: ColorRGB) {
    const proportions = [0.299, 0.587, 0.114];
    const brightness = Math.sqrt(NumTS.sum(NumTS.power(NumTS.multiply([red, green, blue], proportions), 2)) as number);
    return brightness;
  }
  static contrast(this: any, colorOne: ColorRGB, colortwo: ColorRGB) {
    const lum1 = ColorModels.brightness(colorOne);
    const lum2 = ColorModels.brightness(colortwo);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }
  static invert(this: any, { red: r, green: g, blue: b }: ColorRGB) {
    const [red, green, blue] = [Math.round(255 - r), Math.round(255 - g), Math.round(255 - b)];
    return { red, green, blue };
  }
  static hue(this: any, { red, green, blue }: ColorRGB) {
    const min = Math.min(Math.min(red, green), blue);
    const max = Math.max(Math.max(red, green), blue);
    let hue = 0;
    if (min == max) return hue;
    if (max == red) hue = (green - blue) / (max - min);
    else if (max == green) hue = 2 + (blue - red) / (max - min);
    else hue = 4 + (red - green) / (max - min);
    hue = hue * 60;
    if (hue < 0) hue = hue + 360;
    return Math.round(hue);
  }
  static gamma(this: any, { red: r, green: g, blue: b }: ColorRGB, gamma: number) {
    const [red, green, blue] = NumTS.power([r, g, b], NumTS.divide(NumTS.ones(3), gamma));
    return { red, green, blue };
  }
}
