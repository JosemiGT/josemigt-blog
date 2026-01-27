import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'JosemiGT | Blog | Jardín digital',
    description: 'Programación, tecnología y curiosidades',
    site: context.site,
    items: posts
    	.sort(
		    (a, b) => { return b.data.pubDate.getTime() - a.data.pubDate.getTime()})
      .map(
        (post => 
          ({
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link: `/posts/${post.slug}`
        }))
      )
  });
}