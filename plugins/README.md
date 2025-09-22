# 🎨 Custom Color System(Tailwind plugin)

## 📋 **Overview**

Our color system uses a custom Tailwind CSS plugin that automatically generates
color scales from 1 to 10 based on defined primary colors, following Tailwind
CSS logic.

## 🔧 **How It Works**

### **Generation Algorithm**

1. **Base Color (6)**: The primary color defined in `colors.mjs`
2. **Light Colors (1-5)**: Mix of base color with white
   - 1: 2% base color + 98% white (almost white)
   - 2: 8% base color + 92% white
   - 3: 14% base color + 86% white
   - 4: 20% base color + 80% white
   - 5: 25% base color + 75% white
3. **Dark Colors (7-10)**: Reduction of base color lightness
   - 7: 45% of original lightness
   - 8: 30% of original lightness
   - 9: 15% of original lightness
   - 10: 15% of original lightness

## 🎯 **Available Colors**

### **Primary (Blue)**

- Base: `#2563eb`
- Classes: `bg-primary-1` to `bg-primary-10`
- CSS Variables: `--color-primary-1` to `--color-primary-10`

### **Secondary (Gray)**

- Base: `#6c757d`
- Classes: `bg-secondary-1` to `bg-secondary-10`
- CSS Variables: `--color-secondary-1` to `--color-secondary-10`

### **Accent (Purple)**

- Base: `#4f39f6`
- Classes: `bg-accent-1` to `bg-accent-10`
- CSS Variables: `--color-accent-1` to `--color-accent-10`

### **Success (Green)**

- Base: `#14532d`
- Classes: `bg-success-1` to `bg-success-10`
- CSS Variables: `--color-success-1` to `--color-success-10`

### **Warning (Orange)**

- Base: `#78350f`
- Classes: `bg-warning-1` to `bg-warning-10`
- CSS Variables: `--color-warning-1` to `--color-warning-10`

### **Error (Red)**

- Base: `#7f1d1d`
- Classes: `bg-error-1` to `bg-error-10`
- CSS Variables: `--color-error-1` to `--color-error-10`

## 🎨 **Generated Class Types**

For each color and each shade (1-10), the following are automatically generated:

### **Background Colors**

```css
.bg-primary-1    /* Almost white */
.bg-primary-6    /* Base color */
.bg-primary-10   /* Very dark */
```

### **Text Colors**

```css
.text-primary-1
.text-primary-6
.text-primary-10
```

### **Border Colors**

```css
.border-primary-1
.border-primary-6
.border-primary-10
```

### **Ring Colors**

```css
.ring-primary-1
.ring-primary-6
.ring-primary-10
```

## 🔧 **How to Customize**

### **Change Base Colors**

Edit the `plugins/colors.mjs` file:

```javascript
const themeColors = {
  primary: '#2563eb', // Change here
  secondary: '#6c757d', // Change here
  accent: '#4f39f6', // Change here
  success: '#14532d', // Change here
  warning: '#78350f', // Change here
  error: '#7f1d1d', // Change here
};

export default themeColors;
```

### **Add New Colors**

1. Add the color to `colors.mjs`
2. The plugin will automatically generate all classes
3. Use the classes: `bg-newColor-1` to `bg-newColor-10`

## 💡 **Usage Examples**

### **Buttons**

```jsx
<button className="bg-primary-6 hover:bg-primary-7 text-white">
  Primary Button
</button>

<button className="bg-secondary-6 hover:bg-secondary-7 text-white">
  Secondary Button
</button>
```

### **Cards**

```jsx
<div className='bg-primary-1 border border-primary-3 rounded-lg p-4'>
  <h3 className='text-primary-8'>Title</h3>
  <p className='text-primary-6'>Content</p>
</div>
```

### **States**

```jsx
<div className="bg-success-1 border border-success-3 text-success-8">
  ✅ Success!
</div>

<div className="bg-error-1 border border-error-3 text-error-8">
  ❌ Error!
</div>

<div className="bg-warning-1 border border-warning-3 text-warning-8">
  ⚠️ Warning!
</div>
```

### **Gradients**

```jsx
<div className="bg-gradient-to-r from-primary-1 to-primary-3">
  Soft gradient
</div>

<div className="bg-gradient-to-r from-primary-6 to-primary-8">
  Strong gradient
</div>
```

## 🚀 **Advantages**

1. **Consistency**: All colors follow the same logic
2. **Automatic**: No need to manually define each shade
3. **Flexible**: Easy to change base colors
4. **Complete**: Generates background, text, border and ring colors
5. **CSS Variables**: Also accessible via CSS variables
6. **Tailwind Compatible**: Perfectly integrates with Tailwind CSS

## 📁 **System Files**

- `plugins/colorGenerator.mjs` - Main plugin that generates colors
- `plugins/colors.mjs` - Base colors configuration
- `tailwind.config.mjs` - Tailwind configuration with the plugin

## 🔄 **Workflow**

1. **Definition**: Base colors defined in `colors.mjs`
2. **Generation**: Plugin processes each base color
3. **Scale**: Creates 10 shades (1-10) for each color
4. **CSS**: Generates CSS variables and utility classes
5. **Usage**: Classes available throughout the project

## 📝 **Important Notes**

- Shade 6 always corresponds to the defined base color
- Shades 1-5 are progressively lighter
- Shades 7-10 are progressively darker
- The algorithm generates smooth and harmonious tones
- Works with any hexadecimal color
- Compatible with all Tailwind CSS features
