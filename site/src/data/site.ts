// Company facts used by the header, footer, contact blocks and LocalBusiness schema.
// One place, so the two addresses and the phone numbers can never drift apart again.

export const site = {
  name: 'Lumey Energy',
  url: 'https://www.lumeyenergy.com',
  tagline: 'Nigerian maker of solar generators and power stations. Designed and built in Nigeria, for Nigerians and Africans.',
  whatsapp: '2347062878273',
  phones: {
    sales: { label: 'Custom systems and orders', display: '07062878273', tel: '+2347062878273' },
    support: { label: 'Customer support', display: '+234 903 654 2042', tel: '+2349036542042' },
  },
  // TODO(confirm): branded address (hello@lumeyenergy.com) once set up.
  email: 'lumeyenergy@gmail.com',
  offices: [
    {
      id: 'akure',
      name: 'Akure: head office & production',
      // TODO(confirm): the flyer and the old website give two different Akure addresses.
      address: null as string | null,
      city: 'Akure',
      region: 'Ondo State',
      phone: 'sales' as const,
    },
    {
      id: 'lagos',
      name: 'Lagos: sales & distribution',
      address: null as string | null, // TODO(confirm)
      city: 'Lagos',
      region: 'Lagos State',
      phone: 'support' as const,
    },
  ],
  socials: [] as { name: string; url: string }[], // TODO(confirm): Facebook, X, Instagram, LinkedIn URLs
  warranty: {
    inverterMonths: 12,
    heavyDutyBatteryYears: 5,
    // TODO(confirm): portable-series battery cover.
  },
};

export type Office = (typeof site.offices)[number];
