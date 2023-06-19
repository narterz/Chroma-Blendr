import { RGBToHex } from './ColorConversions';
import { kmeans } from 'ml-kmeans';

export const ExtractFreqColors = (colorData: Uint8ClampedArray) => {
  // Build RGB from colorData
  const rgbValues = [];
  for (let i = 0; i < colorData.length; i += 4) {
    const rgb = {
      r: colorData[i],
      g: colorData[i + 1],
      b: colorData[i + 2],
    };
    rgbValues.push([rgb.r, rgb.g, rgb.b]);
  }

  const colorCount = 5;
  const iterations = 100;

  const { centroids } = kmeans(rgbValues, colorCount, { maxIterations: iterations });

  const top5FrequentRGB = centroids.map((centroid: number[]) => ({
    r: Math.round(centroid[0]),
    g: Math.round(centroid[1]),
    b: Math.round(centroid[2]),
  }));

  const top5FrequentHex = top5FrequentRGB.map((rgb) => RGBToHex([rgb.r, rgb.g, rgb.b]));

  console.log(top5FrequentHex);

  return top5FrequentHex;
};
