import difference from "lodash/difference"

export const colors = [
  "#DC143C",
  "#C71585",
  "#8B008B",
  "#800080",
  "#9400D3",
  "#9932CC",
  "#4B0082",
  "#8A2BE2",
  "#6A5ACD",
  "#483D8B",
  "#0000FF",
  "#0000CD",
  "#00008B",
  "#000080",
  "#191970",
  "#4169E1",
  "#008080",
  "#2F4F4F",
  "#008000",
  "#006400",
  "#556B2F",
  "#8B4513",
  "#A0522D",
  "#A52A2A",
  "#B22222",
  "#8B0000",
]

export function getRandomAvailableColor(
  colors: Array<string>,
  colorsToExclude: Array<string>,
) {
  const availableColors = difference(colors, colorsToExclude)
  return availableColors[Math.floor(Math.random() * availableColors.length)]
}
