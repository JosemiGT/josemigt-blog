import { z, defineCollection } from "astro:content";
import { PostState } from "../types/garden";

const stateValues = Object.values(PostState) as [PostState, ...PostState[]];

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string()),
      state: z.enum(stateValues)
    })
});

export const collections = {
  posts: postsCollection,
};