import tinycolor from "tinycolor2";

const generateShade = (baseColor: string) => {
  const color = tinycolor(baseColor);

  return {
    "50": color.clone().lighten(45).toHexString(),
    "100": color.clone().lighten(40).toHexString(),
    "200": color.clone().lighten(30).toHexString(),
    "300": color.clone().lighten(20).toHexString(),
    "400": color.clone().lighten(10).toHexString(),
    "500": color.toHexString(),
    "600": color.clone().darken(10).toHexString(),
    "700": color.clone().darken(20).toHexString(),
    "800": color.clone().darken(30).toHexString(),
    "900": color.clone().darken(40).toHexString(),
    "950": color.clone().darken(45).toHexString(),
  };
};
const isDark = (color: string): boolean => {
  const c = tinycolor(color);
  if (!c.isValid()) {
    console.warn(`Invalid color: ${color}`);
    return false;
  }
  return c.isDark();
};
const prClr = "#244bf9"; // Primary Color

export { generateShade, isDark, prClr };
