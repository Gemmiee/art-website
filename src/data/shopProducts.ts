// Physical products for /art/shop. Images auto-detected from public/images/shop
// by filename prefix (cat_family.jpg, cat_family2.jpg, ...) — just add text here.
// Order = display order.
export interface ShopProduct {
  id: string; // filename prefix in public/images/shop
  title: string;
  price: string;
  summary: string;
  bullets: string[];
  note?: {
    heading: string;
    bullets: string[];
  };
}

export const KOFI_SHOP_URL = 'https://ko-fi.com/gemmiewow/shop';

export const shopProducts: ShopProduct[] = [
  {
    id: 'order_your_own',
    title: 'Suggest your own canvas!!',
    price: '25€',
    summary: '⋆.˚ Suggest your own canvas! Contact me with your request!',
    bullets: [],
    note: {
      heading: 'PLEASE NOTE THE FOLLOWING',
      bullets: [
        "🧼┆ Let me know where to ship the canvas first. Unfortunately, I cannot ship to the US, so it's important that I am sure I can ship to your country.",
        '🪼┆ I use posca markers, meaning that I cannot put much detail to the work since my brushes are quite large. But I shall try my best.',
        '🍀┆ For accurate shipping prices, 1 canvas per cart. Orders will be separate, therefore shipping will be separate.',
        '🐠┆ Canvas will arrive with stickers and a "thank you" card.',
      ],
    },
  },
  {
    id: 'cat_family',
    title: 'Cat Family',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a cat family.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
  {
    id: 'cat_goldfish',
    title: 'Cat with Goldfish',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a cat gazing at goldfish.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
  {
    id: 'cat_sunset',
    title: 'Cat with Sunset',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a sunset and a silly black cat with 1 braincell.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
  {
    id: 'yellow_clouds',
    title: 'Balcony with Clouds',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a balcony with a street lamp, yellow clouds and a ghost kitty.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
];
