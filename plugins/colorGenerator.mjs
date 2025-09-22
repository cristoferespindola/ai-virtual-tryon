import themeColors from './colors.mjs';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB to hex
 */
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Generates a color scale from a base color
 * Creates 10 shades following Tailwind's logic:
 * 1-5: lighter than base (6)
 * 6: base color
 * 7-10: darker than base (6)
 */
function generateColorScale(baseColor) {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return {};

  const colors = {};

  // Base color is at step 6
  colors[6] = baseColor;

  // Generate lighter colors (1-5) - 1 is almost white, 5 is closest to base
  for (let i = 1; i <= 5; i++) {
    // Mix ratio: 0.02 to 0.25 (1 is 2% base color, 5 is 25% base color)
    const mixRatio = 0.02 + ((i - 1) * 0.23) / 4;

    const r = Math.round(rgb.r * mixRatio + 255 * (1 - mixRatio));
    const g = Math.round(rgb.g * mixRatio + 255 * (1 - mixRatio));
    const b = Math.round(rgb.b * mixRatio + 255 * (1 - mixRatio));

    colors[i] = rgbToHex(r, g, b);
  }

  // Generate darker colors (7-10)
  for (let i = 7; i <= 10; i++) {
    // Lightness factor: 0.45 to 0.15 (darker than base)
    const lightness = 0.45 - ((i - 7) * 0.3) / 3;

    const r = Math.round(rgb.r * lightness);
    const g = Math.round(rgb.g * lightness);
    const b = Math.round(rgb.b * lightness);

    colors[i] = rgbToHex(r, g, b);
  }

  return colors;
}

/**
 * Tailwind plugin to generate dynamic color scales
 */
function colorGeneratorPlugin({ addUtilities }) {
  const baseColors = themeColors;
  const generatedColors = {};

  // Generate color scales for each base color
  Object.entries(baseColors).forEach(([colorName, baseColor]) => {
    const scale = generateColorScale(baseColor);
    generatedColors[colorName] = scale;
  });

  // Add CSS custom properties
  const cssVariables = {};
  Object.entries(generatedColors).forEach(([colorName, scale]) => {
    Object.entries(scale).forEach(([step, color]) => {
      cssVariables[`--color-${colorName}-${step}`] = color;
    });
  });

  // Add utilities for the generated colors
  const colorUtilities = {};
  Object.entries(generatedColors).forEach(([colorName, scale]) => {
    Object.entries(scale).forEach(([step, color]) => {
      // Background colors
      colorUtilities[`.bg-${colorName}-${step}`] = {
        'background-color': color,
      };

      // Text colors
      colorUtilities[`.text-${colorName}-${step}`] = {
        color: color,
      };

      // Border colors
      colorUtilities[`.border-${colorName}-${step}`] = {
        'border-color': color,
      };

      // Ring colors
      colorUtilities[`.ring-${colorName}-${step}`] = {
        '--tw-ring-color': color,
      };
    });
  });

  // Add CSS variables to root
  addUtilities({
    ':root': cssVariables,
  });

  // Add color utilities
  addUtilities(colorUtilities);
}

export default colorGeneratorPlugin;
