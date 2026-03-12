import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional(),
    date: z.string().transform((str) => new Date(str)),
    github: z.url().optional(),
    live: z.url().optional(),
    role: z.array(z.string()),
    time: z.string(),
    team: z.array(z.string()),
  }),
});

export const collections = {
  projects: projectsCollection,
};
