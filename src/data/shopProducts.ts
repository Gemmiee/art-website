export interface ShopProduct {
  id: string;
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
    summary: '⋆.˚ Wanna make your own? Contact me with your request!',
    bullets: [],
    note: {
      heading: 'PLEASE NOTE THE FOLLOWING',
      bullets: [
        "🧼┆ Let me know where to ship the canvas first. It's important that I am sure I can ship to your country.",
        "🪼┆ I use posca markers and paint.",
        "🍀┆ For accurate shipping prices, 1 canvas per cart. Orders will be separate, therefore shipping will be separate.",
        "🐠┆ Canvas will arrive with stickers and a 'thank you' card.",
      ],
    },
  },
  {
    id: 'sunkissed_cat',
    title: '☀️ Sunkissed Cat',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a kitty in the field, being kissed by the sun.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', '🐱┆ Want a different variation? Let me know!', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
  {
    id: 'kanagawa_cat',
    title: '🌊 Kitten Surfing the Kanagawa Wave',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting an orange kitty surfing the Great Wave of Kanagawa. Of course its an orange cat...',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', '🐱┆ Want a different variation? Let me know!', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
  {
    id: 'cat_family',
    title: '🎀 Cat Family',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a cat family.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card','🐱┆ Want a different variation? Let me know!', 'Note: All packages will be sent as A priority and registered to prevent losses.',],
  },
  {
    id: 'cat_goldfish',
    title: '🐠 Cat with Goldfish',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a cat gazing at goldfish.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', '🐱┆ Want a different variation? Let me know!', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
  {
    id: 'cat_sunset',
    title: '🌄 Cat with Sunset',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a sunset and a silly black cat with 1 braincell.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', '🐱┆ Want a different variation? Let me know!', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
  {
    id: 'yellow_clouds',
    title: '⭐ Balcony with Clouds',
    price: '25€',
    summary: '⋆.˚ Mini 10x10cm canvas, depicting a balcony with a street lamp, yellow clouds and a ghost kitty.',
    bullets: ['🍋‍🟩┆ Perfect for decoration and aesthetic', '🍋┆ Comes with stickers and a thank you card', '🐱┆ Want a different variation? Let me know!', 'Note: All packages will be sent as A priority and registered to prevent losses.'],
  },
];
