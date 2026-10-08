import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// "Prices last updated" comes from the last commit that touched the price data,
// so it is never typed by hand and never goes stale on its own.
// Falls back to the build date when git history is not available.
function lastChanged(): Date {
  try {
    const file = fileURLToPath(new URL('../data/products.ts', import.meta.url));
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim();
    if (out) return new Date(out);
  } catch {
    /* no git at build time */
  }
  return new Date();
}

export const pricesUpdated = lastChanged();
export const pricesUpdatedText = pricesUpdated.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Africa/Lagos',
});
/** Offers stay valid for 90 days from the last price change, per schema.org. */
export const priceValidUntil = new Date(pricesUpdated.getTime() + 90 * 864e5).toISOString().slice(0, 10);
