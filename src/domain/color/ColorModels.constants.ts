
export class RGB2XYZ {
  static TRANSFORMATION_2_XYZ = [
    [0.4124564, 0.3575761, 0.1804375],
    [0.2126729, 0.7151522, 0.072175],
    [0.0193339, 0.119192, 0.9503041],
  ];
}

export class RGB2LAB {
  static SIGMA = 6 / 29;
  static XN_YN_ZN = [0.950489, 1, 1.08884];
  static T = Math.pow(RGB2LAB.SIGMA, 3);
  static SIGMA_3_TIMES_POW = 3 * Math.pow(RGB2LAB.SIGMA, 2);
  static CONTANT_ADDING = 4 / 29;
  static f = (t: number) => (t > RGB2LAB.T ? Math.pow(t, 1 / 3) : t / RGB2LAB.SIGMA_3_TIMES_POW + RGB2LAB.CONTANT_ADDING);
}
