// Simple linear regression: y = slope*x + intercept
function linearRegression(xs, ys) {
  const n = xs.length;
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sumXX = xs.reduce((a, x) => a + x * x, 0);
  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n };
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

/**
 * Fits y = a * e^(b*x) to the data using log-linear regression.
 * Falls back to row index for x when the X column isn't numeric
 * (e.g. month names, categories).
 */
export function computeExponentialFit(data, xKey, yKey) {
  const points = data
    .map((row, i) => {
      const rawX = Number(row[xKey]);
      const x = Number.isFinite(rawX) ? rawX : i;
      const y = Number(row[yKey]);
      return { x, y, label: row[xKey] };
    })
    .filter((p) => Number.isFinite(p.y) && p.y > 0);

  if (points.length < 2) {
    return { fittedData: [], a: 0, b: 0 };
  }

  const xs = points.map((p) => p.x);
  const lnYs = points.map((p) => Math.log(p.y));
  const { slope, intercept } = linearRegression(xs, lnYs);
  const a = Math.exp(intercept);
  const b = slope;

  const fittedData = points.map((p) => ({
    [xKey]: p.label,
    [yKey]: p.y,
    fitted: Number((a * Math.exp(b * p.x)).toFixed(4)),
  }));

  return { fittedData, a, b };
}

/**
 * Bins the Y column into a histogram and overlays a scaled normal
 * (bell curve) distribution based on the data's mean and std dev.
 */
export function computeDistribution(data, yKey, binCount = 12) {
  const values = data
    .map((row) => Number(row[yKey]))
    .filter((v) => Number.isFinite(v));

  if (values.length < 2) {
    return { bins: [], mean: 0, std: 0 };
  }

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((a, v) => a + (v - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance) || 1;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const binWidth = range / binCount;

  const bins = Array.from({ length: binCount }, (_, i) => {
    const binStart = min + i * binWidth;
    const binEnd = binStart + binWidth;
    const count = values.filter((v) =>
      i === binCount - 1
        ? v >= binStart && v <= binEnd
        : v >= binStart && v < binEnd
    ).length;
    const midpoint = (binStart + binEnd) / 2;

    const gaussianDensity =
      (1 / (std * Math.sqrt(2 * Math.PI))) *
      Math.exp(-((midpoint - mean) ** 2) / (2 * std * std));
    const scaledGaussian = gaussianDensity * values.length * binWidth;

    return {
      binLabel: `${binStart.toFixed(1)}–${binEnd.toFixed(1)}`,
      count,
      midpoint: Number(midpoint.toFixed(2)),
      gaussian: Number(scaledGaussian.toFixed(2)),
    };
  });

  return { bins, mean, std };
}