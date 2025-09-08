import type { CollectionEntry } from "astro:content";

export enum PostState {
    Seed = "Seed",
    Sprouting = "Sprouting",
    Growing = "Growing",
    Mature = "Mature",
    Flower = "Flower",
    Leaves = "Leaves",
    Wild = "Wild",
}

export const PublicState: PostState[] = [
  PostState.Sprouting,
  PostState.Growing,
  PostState.Mature,
  PostState.Flower,
  PostState.Leaves,
  PostState.Wild,
] as const;

export const EmojiState: Record<PostState, string> = {
  [PostState.Seed]: "📝",
  [PostState.Sprouting]: "🌱",
  [PostState.Growing]: "🌿",
  [PostState.Mature]: "🌳",
  [PostState.Flower]: "🌸",
  [PostState.Leaves]: "🍃",
  [PostState.Wild]: "🪻",
};

export interface PostInformation {
  title: string;
  slug: string;
  tags?: string[];
  state: PostState;
}

export interface TagData {
  posts: CollectionEntry<'posts'>[];
  allStates: PostState[];
}