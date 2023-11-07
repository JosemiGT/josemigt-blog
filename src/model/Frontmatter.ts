export default interface Frontmatter {
    layout?: string;
    title: string;
    pubDate: Date;
    description?: string;
    author?: string;
    tags: Array<string>;
    image: {
        url?: string;
        alt?: string;
    }
}