import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Powers /blog's RSS feed, so a free email-bridge service (Blogtrottr,
// Follow.it, etc.) can watch it and notify subscribers whenever a new
// post is published — no custom backend needed for that part.
export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: "Gemmie's corner — Blog",
    description: 'Random thoughts, updates and gemmie stuff!',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
  });
}
