import tinycolor from "tinycolor2";

const generateShade = (baseColor: string) => {
  const color = tinycolor(baseColor);

  return {
    "50": color.clone().lighten(52).spin(-5).desaturate(25).toHexString(),
    "100": color.clone().lighten(40).desaturate(20).toHexString(),
    "200": color.clone().lighten(30).desaturate(15).toHexString(),
    "300": color.clone().lighten(20).desaturate(10).toHexString(),
    "400": color.clone().lighten(10).desaturate(5).toHexString(),
    "500": color.clone().toHexString(),
    "600": color.clone().darken(10).saturate(5).toHexString(),
    "700": color.clone().darken(20).saturate(10).toHexString(),
    "800": color.clone().darken(30).saturate(15).toHexString(),
    "900": color.clone().darken(40).saturate(20).toHexString(),
    "950": color.clone().darken(52).spin(5).saturate(25).toHexString(),
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
const prClr = "#385cfa"; // Primary Color

export { generateShade, isDark, prClr };
