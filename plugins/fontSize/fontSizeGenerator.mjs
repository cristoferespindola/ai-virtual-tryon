/**
 * Font Size Generator Plugin for Tailwind CSS
 * Generates custom font-size utilities with consistent spacing
 */

// Base font sizes in rem and pixels
const fontSizeScale = {
  xs: { rem: '0.75rem', px: '12px', lineHeight: '1.5' },
  sm: { rem: '0.875rem', px: '14px', lineHeight: '1.5' },
  base: { rem: '1rem', px: '16px', lineHeight: '1.5' },
  lg: { rem: '1.125rem', px: '18px', lineHeight: '1.2' },
  xl: { rem: '1.25rem', px: '20px', lineHeight: '1.2' },
  '2xl': { rem: '1.5rem', px: '24px', lineHeight: '1.2' },
  '3xl': { rem: '1.875rem', px: '30px', lineHeight: '1.2' },
  '4xl': { rem: '2.25rem', px: '36px', lineHeight: '1.2' },
  '5xl': { rem: '3rem', px: '48px', lineHeight: '1' },
  '6xl': { rem: '3.75rem', px: '60px', lineHeight: '1' },
  '7xl': { rem: '4.5rem', px: '72px', lineHeight: '1' },
  '8xl': { rem: '6rem', px: '96px', lineHeight: '1' },
  '9xl': { rem: '8rem', px: '128px', lineHeight: '1' },
};

function fontSizeGeneratorPlugin({ addUtilities }) {
  const fontSizeUtilities = {};

  // Generate font-size utilities
  Object.entries(fontSizeScale).forEach(([size, values]) => {
    fontSizeUtilities[`.text-${size}`] = {
      'font-size': values.rem,
      'line-height': values.lineHeight,
    };
  });

  // Generate responsive font-size utilities
  Object.entries(fontSizeScale).forEach(([size, values]) => {
    fontSizeUtilities[`.text-${size}-responsive`] = {
      'font-size': `clamp(${values.rem}, 4vw, ${values.rem})`,
      'line-height': values.lineHeight,
    };
  });

  // Generate fluid font-size utilities (scales between sizes)
  const fluidSizes = [
    { name: 'fluid-sm', min: fontSizeScale.xs.rem, max: fontSizeScale.sm.rem },
    {
      name: 'fluid-base',
      min: fontSizeScale.sm.rem,
      max: fontSizeScale.base.rem,
    },
    {
      name: 'fluid-lg',
      min: fontSizeScale.base.rem,
      max: fontSizeScale.lg.rem,
    },
    { name: 'fluid-xl', min: fontSizeScale.lg.rem, max: fontSizeScale.xl.rem },
    {
      name: 'fluid-2xl',
      min: fontSizeScale.xl.rem,
      max: fontSizeScale['2xl'].rem,
    },
    {
      name: 'fluid-3xl',
      min: fontSizeScale['2xl'].rem,
      max: fontSizeScale['3xl'].rem,
    },
  ];

  fluidSizes.forEach(({ name, min, max }) => {
    fontSizeUtilities[`.text-${name}`] = {
      'font-size': `clamp(${min}, 2.5vw + ${min}, ${max})`,
      'line-height': '1.5',
    };
  });

  // Generate display font-sizes (larger than standard)
  const displaySizes = {
    'display-xs': { rem: '2.5rem', px: '40px' },
    'display-sm': { rem: '3.5rem', px: '56px' },
    'display-md': { rem: '4.5rem', px: '72px' },
    'display-lg': { rem: '6rem', px: '96px' },
    'display-xl': { rem: '8rem', px: '128px' },
  };

  Object.entries(displaySizes).forEach(([size, values]) => {
    fontSizeUtilities[`.text-${size}`] = {
      'font-size': values.rem,
      'line-height': '1.1',
      'font-weight': '700',
    };
  });

  addUtilities(fontSizeUtilities);
}

export default fontSizeGeneratorPlugin;
