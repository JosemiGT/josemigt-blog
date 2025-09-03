import type { CollectionEntry } from "astro:content";

export enum PostState {
    Seed = "Seed",
    Sprouting = "Sprouting",
    Growing = "Growing",
    Blooming = "Blooming",
    Mature = "Mature"
}

export const PublicState: PostState[] = [
  PostState.Sprouting,
  PostState.Growing,
  PostState.Blooming,
  PostState.Mature
] as const;

export const EmojiState: Record<PostState, string> = {
  [PostState.Seed]: "📝",
  [PostState.Sprouting]: "🌱",
  [PostState.Growing]: "🌿",
  [PostState.Blooming]: "🌸",
  [PostState.Mature]: "🌳"
};

export interface PostInformation {
  title: string;
  slug: string;
  tags?: string[];
  state: PostState;
}

export interface TagData {
  posts: CollectionEntry<'posts'>[];
  maxState: PostState;
}