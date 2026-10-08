import { site } from '../data/site';
import type { Product } from '../data/products';

/** ₦700,000 — always the naira sign and thousands separators. */
export const naira = (n: number) => '₦' + n.toLocaleString('en-NG', { maximumFractionDigits: 0 });

export const wh = (n: number) => n.toLocaleString('en-NG') + 'Wh';

/** A wa.me link with a pre-filled message so sales can see where the chat came from. */
export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function waProduct(p: Product, option: 'box' | 'bundle', pageUrl: string) {
  const price = option === 'box' ? p.priceBox : p.priceBundle;
  const what = option === 'box' ? 'PowerBox only' : `with ${p.panels} panels`;
  return waLink(`Hello Lumey, I'd like to order the ${p.name} (${what}, ${naira(price)}). Page: ${pageUrl}`);
}

export const absolute = (path: string) => new URL(path, site.url).toString();
