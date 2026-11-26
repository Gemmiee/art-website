import rss from '@astrojs/rss';
import { withIds } from '../../data/siteUpdates';

export async function GET(context) {
  return rss({
    title: "Gemmie's corner: Site updates - gemmiewow.com",
    description: "What's new on gemmiewow.com? Some new site updates are here!",
    site: context.site,
    trailingSlash: false,
    items: withIds().map((u) => ({
      title: u.text.length > 80 ? `${u.text.slice(0, 77)}...` : u.text,
      description: u.text,
      pubDate: new Date(`${u.date}T12:00:00Z`),
      link: `/#${u.id}`,
    })),
  });
}
