# AseColor 🌈 - A Superset of Color Handlers for Aseprite


## Introduction

**AseColor** is a robust color-handling library designed for **Aseprite** scripts. It integrates advanced color manipulation methods such as color conversions, color distance calculation, harmonies, and more. This library is written in TypeScript and Lua, providing seamless scripting capabilities for Aseprite. Whether you're working on pixel art, animations, or color palettes, AseColor gives you the power to manipulate colors with precision and ease.

## Features ✨

- **Color Conversion**: Effortlessly convert between color models such as RGB, CMYK, HSL, HSV, and LAB.
- **Color Harmonies**: Generate color harmonies like analogous, complementary, triads, and more.
- **Color Transformation**: Apply transformations like brightness, contrast, and grayscale.
- **Custom Color Blending**: Blend colors using weighted algorithms and generate gradients.
- **Pattern Generation**: Automatically create color palettes with specified harmonies.
- **Color Comparison**: Calculate color distance and contrast between colors.
  
## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Color Models](#color-models)
- [Harmonies & Transformations](#harmonies--transformations)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install **AseColor**, simply use the following command with **asepm** (Aseprite Package Manager):

```bash
asepm install dependency juandac/ase-color
```

Alternatively, you can manually include the **AseColor** library in your Aseprite script environment.

## Getting Started

Once installed, you can import and use **AseColor** in your Aseprite script:

```typescript
import { HarmoniesColor, Transforms, ColorModels } from 'juandac/ase-color';

// Example: Converting RGB to LAB
const labColor = ColorModels.RGB2LAB({ red: 255, green: 100, blue: 50 });
console.log(labColor);

// Example: Generating complementary colors
const complementaryPalette = HarmoniesColor.complementary({ red: 255, green: 100, blue: 50 });
console.log(complementaryPalette);
```

### Color Models Supported 🎨

- **RGB** (Red, Green, Blue)
- **CMYK** (Cyan, Magenta, Yellow, Black)
- **HSL** (Hue, Saturation, Lightness)
- **HSV** (Hue, Saturation, Value)
- **LAB** (CIELAB)
- **YUV**

### Harmonies & Transformations 🎶

AseColor provides multiple functions to generate color harmonies and apply transformations:

- **Analogous**: Generate colors that are adjacent on the color wheel.
- **Complementary**: Create complementary colors for stunning contrast.
- **Split Complementary**: A modern twist on complementary color schemes.
- **Triad**: Create balanced color palettes with three colors.
- **Tetrad and Squares**: For those looking to create dynamic, balanced palettes with multiple color points.

```typescript
// Example: Creating a triad color harmony
const triadColors = HarmoniesColor.triad({ red: 128, green: 0, blue: 128 });
console.log(triadColors);

// Example: Transforming a color to grayscale
const grayColor = Transforms.grayScale({ red: 200, green: 150, blue: 100 });
console.log(grayColor);
```

### Color Blending 🌈

Blend two colors smoothly by specifying a balance ratio:

```typescript
const blendedColor = Transforms.blendColors(colorOne, colorTwo, 50); // Blends 50% of each
```

## Contributing

We welcome contributions! If you'd like to contribute to AseColor, follow these steps:

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

For detailed guidelines, please refer to the [Contributing Guidelines](CONTRIBUTING.md).

## License

**AseColor** is licensed under the GNU General Public License v3.0. Please refer to the [LICENSE](LICENSE) file for more details.

---

Created with ❤️ by JuanDAC.
