import { site } from '../data/site';
import type { Product } from '../data/products';
import { absolute } from './format';
import { priceValidUntil } from './prices';

export const organization = () => ({
  '@type': 'Organization',
  '@id': absolute('/#org'),
  name: site.name,
  url: site.url,
  description: site.tagline,
  sameAs: site.socials.map((s) => s.url),
  contactPoint: Object.values(site.phones).map((p) => ({
    '@type': 'ContactPoint',
    telephone: p.tel,
    contactType: p.label,
    areaServed: 'NG',
  })),
});

export const productSchema = (p: Product) => ({
  '@type': 'Product',
  name: `Lumey ${p.name}`,
  url: absolute(`/products/${p.slug}`),
  brand: { '@type': 'Brand', name: site.name },
  description: p.whoFor,
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Inverter rating', value: p.inverter },
    { '@type': 'PropertyValue', name: 'Battery capacity', value: `${p.batteryWh}Wh` },
    { '@type': 'PropertyValue', name: 'Battery type', value: p.chemistry },
    { '@type': 'PropertyValue', name: 'Recommended panels', value: p.panels },
  ],
  offers: [
    { name: 'PowerBox only', price: p.priceBox },
    { name: `PowerBox with ${p.panels} solar panels`, price: p.priceBundle },
  ].map((o) => ({
    '@type': 'Offer',
    name: o.name,
    price: o.price,
    priceCurrency: 'NGN',
    priceValidUntil,
    availability: 'https://schema.org/InStock',
    seller: { '@id': absolute('/#org') },
  })),
});

export const itemList = (items: Product[]) => ({
  '@type': 'ItemList',
  itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: productSchema(p) })),
});

export const breadcrumbs = (trail: { name: string; href: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: absolute(t.href) })),
});

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
