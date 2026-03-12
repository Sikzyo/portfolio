import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    date: z.string().transform((str) => new Date(str)),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    role: z.array(z.string()),
    time: z.string(),
    team: z.array(z.string()),
  }),
});

export const collections = {
  projects: projectsCollection,
};
